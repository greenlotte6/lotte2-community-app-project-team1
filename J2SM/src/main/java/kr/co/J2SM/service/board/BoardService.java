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

    @Transactional(readOnly = true)
    public List<BoardDTO> getBoardsByCategory(Long categoryId, Long companyId) {

        Optional<Category> categoryopt = categoryRepository.findById(categoryId);

        // 토큰의 회사값과 카테고리 번호의 회사값이 같으면 출력
        // 카테고리값으로만 데이터를 출력하는 것을 방지

        if(categoryopt.isPresent()) {
            Category category = categoryopt.get();
            if(category.getCompany().getCno() == companyId){
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
        board.setHit(board.getHit() + 1); // 조회수 증가
        boardRepository.save(board);

        log.info(board.toString());

        return boardMapper.toDTO(board);
    }



}