package com.fullstack.backend.Model.Users;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class Users {

    @Id
    private String uId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "familyName")
    private String lastName;

    @Column(name = "phoneNumber")
    private Long phoneNumber;

    @Column(name = "Address")
    private String address;

    private Boolean isEnabled;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "auth_id", referencedColumnName = "uId")
    private AuthDetails authDetails;
}