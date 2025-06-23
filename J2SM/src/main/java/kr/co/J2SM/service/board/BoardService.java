package kr.co.J2SM.service.board;

import kr.co.J2SM.dto.board.BoardDTO;
import kr.co.J2SM.entity.board.Attachment;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.mapper.drive.BoardMapper;
import kr.co.J2SM.repository.board.AttachmentRepository;
import kr.co.J2SM.repository.board.BoardRepository;
import kr.co.J2SM.repository.board.CategoryRepository;
import kr.co.J2SM.repository.board.CommentRepository;
import kr.co.J2SM.repository.user.UserRepository;
import kr.co.J2SM.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files; // Files 유틸리티 클래스 추가
import java.nio.file.Path;  // Path 인터페이스 추가
import java.nio.file.Paths; // Paths 유틸리티 클래스 추가
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final AttachmentRepository attachmentRepository;
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private final BoardMapper boardMapper;

    // ${upload.dir} 속성값을 주입받습니다. 기본값은 /home/ec2-user/uploads 입니다.
    // 운영 환경에 따라 이 경로는 application.properties 또는 application.yml에서 오버라이드될 수 있습니다.
    private final CustomFileUtil customFileUtil;

    @Transactional
    public BoardDTO createBoard(BoardDTO dto, MultipartFile file, User user) {
        Category category = categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("카테고리 없음"));

        User userInfo = userRepository.findById(user.getUid())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        Board board = modelMapper.map(dto, Board.class);
        board.setFixed(dto.isFixed());
        board.setCreatedBy(userInfo.getName());
        board.setWriter(userInfo);
        board.setCategory(category);

        Board savedBoard = boardRepository.save(board);

        // 파일이 존재할 경우만 처리
        if (file != null && !file.isEmpty()) {
            try {
                Map<String, String> uploadedFiles = customFileUtil.saveFiles(List.of(file));
                String savedFileName = uploadedFiles.get(file.getName()); // 필드명 기준 저장

                if (savedFileName != null) {
                    Attachment attachment = Attachment.builder()
                            .board(savedBoard)
                            .fileName(file.getOriginalFilename())
                            .savedPath(savedFileName)
                            .fileSize(file.getSize())
                            .fileType(file.getContentType())
                            .build();

                    attachmentRepository.save(attachment);
                }

            } catch (Exception e) {
                log.error("파일 저장 실패: {}", e.getMessage());
                throw new RuntimeException("파일 저장 중 오류 발생", e);
            }
        }

        return boardMapper.toDTO(savedBoard);
    }

    @Transactional(readOnly = true)
    public List<BoardDTO> getBoardsByCategory(Long categoryId, Long companyId) {
        Optional<Category> categoryOpt = categoryRepository.findById(categoryId);

        if (categoryOpt.isPresent()) {
            Category category = categoryOpt.get();
            if (category.getCompany().getCno() == companyId) {
                return boardRepository.findByCategoryIdOrderByLatest(categoryId)
                        .stream()
                        .map(boardMapper::toDTO)
                        .collect(Collectors.toList());
            }
        }

        return null;
    }

    @Transactional
    public BoardDTO getBoardDetail(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        board.setHit(board.getHit() + 1);
        boardRepository.save(board);

        log.info("게시물 조회수 올리기" + board.toString());
        return boardMapper.toDTO(board);
    }

    @Transactional
    public BoardDTO updateBoard(Long boardId, BoardDTO updatedDto, User currentUser) {
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다: " + boardId));

        if (existingBoard.getWriter() == null || !existingBoard.getWriter().getUid().equals(currentUser.getUid())) {
            throw new IllegalArgumentException("이 게시물을 수정할 권한이 없습니다.");
        }

        existingBoard.setTitle(updatedDto.getTitle());
        existingBoard.setContent(updatedDto.getContent());

        Board savedBoard = boardRepository.save(existingBoard);
        return boardMapper.toDTO(savedBoard);
    }

    @Transactional
    public void deleteBoard(Long boardId, User currentUser) {
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다: " + boardId));

        if (existingBoard.getWriter() == null || !existingBoard.getWriter().getUid().equals(currentUser.getUid())) {
            throw new IllegalArgumentException("이 게시물을 삭제할 권한이 없습니다.");
        }

        commentRepository.deleteByBoard_Id(boardId);
        boardRepository.delete(existingBoard);
    }
}