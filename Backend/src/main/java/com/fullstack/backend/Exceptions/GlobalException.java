package com.fullstack.backend.Exceptions;


import com.fullstack.backend.Services.Error.ErrorRepository;
import com.fullstack.backend.Services.Error.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.UUID;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalException {

    private final ErrorRepository errorRepository;

    @ExceptionHandler(value = {NoDataFoundException.class})
    public ResponseEntity<Object> handleDefaultInternalException(NoDataFoundException e) {

        String addons = "Please Contact the ADMIN.";

        log.error(e.getLocalizedMessage());

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setCode("500-Internal Server Error.");
        errorResponse.setMessage(e.getMessage() + addons);
        errorResponse.setEid(UUID.randomUUID().toString()
                .replaceAll("[^a-zA-Z0-9]", "")
                .substring(0, 16));
        errorRepository.save(errorResponse);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


}
