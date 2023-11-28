package com.fullstack.backend.Controller;

import com.fullstack.backend.Model.History;
import com.fullstack.backend.Services.HistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
@Slf4j
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public Page<History> findHistoryByEmail(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "5") int size,
                                            @RequestParam(required = false) String userEmail){
        Pageable pageable = PageRequest.of(page, size);
        return historyService.findByEmail(userEmail, pageable);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteHistoryById(@RequestParam(required = false)  Long id, @RequestParam(required = false)  String userEmail){
        try {
            historyService.deleteHistoryUser(id, userEmail);
            log.info("email : {}",userEmail);
            log.info("id : {}", id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}