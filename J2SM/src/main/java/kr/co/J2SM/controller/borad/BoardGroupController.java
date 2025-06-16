package kr.co.J2SM.controller.borad;

import kr.co.J2SM.dto.board.BoardGroupDTO;
import kr.co.J2SM.service.board.BoardGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board-group")
@RequiredArgsConstructor
public class BoardGroupController {

    private final BoardGroupService boardGroupService;

    @GetMapping
    public List<BoardGroupDTO> getAllGroups() {
        return boardGroupService.getAllGroups();
    }

    @PostMapping
    public BoardGroupDTO createGroup(@RequestBody BoardGroupDTO dto) {
        return boardGroupService.createGroup(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        boardGroupService.deleteGroup(id);
    }
}
