package kr.co.J2SM.service.board;

import kr.co.J2SM.dto.board.BoardGroupDTO;
import kr.co.J2SM.entity.board.BoardGroup;
import kr.co.J2SM.repository.board.BoardGroupRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardGroupService {

    private final BoardGroupRepository boardGroupRepository;
    private final ModelMapper modelMapper;

    public List<BoardGroupDTO> getAllGroups() {
        return boardGroupRepository.findAll().stream()
                .map(group -> modelMapper.map(group, BoardGroupDTO.class))
                .collect(Collectors.toList());
    }

    public BoardGroupDTO createGroup(BoardGroupDTO dto) {
        BoardGroup group = BoardGroup.builder()
                .name(dto.getName())
                .fixed(false) // 생성 시 고정 아님
                .createdBy(dto.getCreatedBy())
                .build();

        return modelMapper.map(boardGroupRepository.save(group), BoardGroupDTO.class);
    }

    public void deleteGroup(Long id) {
        BoardGroup group = boardGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 그룹입니다."));

        if (group.isFixed()) {
            throw new UnsupportedOperationException("고정 게시판 그룹은 삭제할 수 없습니다.");
        }

        boardGroupRepository.delete(group);
    }
}
