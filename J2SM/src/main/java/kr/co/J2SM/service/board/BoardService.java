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
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

        
        // Board board = boardMapper.toEntity(dto, category, writer);
        // board.setHit(0); // 초기 조회수 설정
      
        User userInfo = userRepository.findById(user.getUid()).orElseThrow(() -> new RuntimeException("유저 없음"));;
        
        Board board = modelMapper.map(dto, Board.class);
        board.setCreatedBy(userInfo.getName());
        board.setWriter(userInfo);
        board.setCategory(category);

        Board saved = boardRepository.save(board);
        return boardMapper.toDTO(saved);
    }



    public List<BoardDTO> getBoardsByCategory(Long categoryId) {
        return boardRepository.findByCategory_Id(categoryId)
                .stream()
                .map(boardMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BoardDTO getBoardDetail(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));
        board.setHit(board.getHit() + 1); // 조회수 증가
        boardRepository.save(board);

        return boardMapper.toDTO(board);
    }
}