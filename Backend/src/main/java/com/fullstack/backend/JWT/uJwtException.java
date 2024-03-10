package com.fullstack.backend.JWT;

import java.security.GeneralSecurityException;

public class uJwtException extends GeneralSecurityException {
    public uJwtException(String msg) {
        super(msg);
    }
}
