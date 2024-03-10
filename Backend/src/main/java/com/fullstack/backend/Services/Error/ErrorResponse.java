package com.fullstack.backend.Services.Error;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "error")
public class ErrorResponse {

    @Id
    private String eid;

    private String message;

    private String code;

}
