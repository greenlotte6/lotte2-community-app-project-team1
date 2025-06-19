package kr.co.J2SM.service.board;

import kr.co.J2SM.dto.board.BoardDTO;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.mapper.drive.BoardMapper;
import kr.co.J2SM.repository.board.BoardRepository;
import kr.co.J2SM.repository.board.CategoryRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BoardMapper boardMapper;

    public BoardDTO createBoard(BoardDTO dto, User user) {
        Category category = categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("카테고리 없음"));

        User userInfo = userRepository.findById(user.getUid())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        Board board = modelMapper.map(dto, Board.class);
        board.setCreatedBy(userInfo.getName()); // ✅ 수정된 부분: UID 저장
        board.setWriter(userInfo);
        board.setCategory(category);

        Board saved = boardRepository.save(board);
        return boardMapper.toDTO(saved);
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

        boardRepository.delete(existingBoard);
    }
}
