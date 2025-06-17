package kr.co.J2SM.mapper.drive;

import kr.co.J2SM.dto.board.BoardDTO;
import kr.co.J2SM.dto.board.CategoryDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.user.User;
import org.springframework.stereotype.Component;

@Component
public class BoardMapper {

    public BoardDTO toDTO(Board board) {
        return BoardDTO.builder()
                .id(board.getId())
                .category(new CategoryDTO(board.getCategory().getId(), board.getCategory().getName()))
                .fixed(board.isFixed())
                .createdBy(board.getCreatedBy())
                .createdAt(board.getCreatedAt())
                .hit(board.getHit())
                .title(board.getTitle())
                .content(board.getContent())
                .writer(UserDTO.from(board.getWriter()))
                .build();
    }

    public Board toEntity(BoardDTO dto, Category category, User writer) {
        return Board.builder()
                .id(dto.getId())
                .category(category)
                .fixed(dto.isFixed())
                .createdBy(dto.getCreatedBy())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(writer)
                .build();
    }
}
