package com.fullstack.backend.Utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class JwtExtraction {


    /**
     * Extracts the subject from the given JSON Web Token (JWT).
     *
     * @param jwtToken the JWT from which to extract the subject
     * @return the subject extracted from the JWT
     * @throws RuntimeException if an error occurs during JWT processing
     */
    public String extractSubject(String jwtToken) {

        String token = jwtToken.substring(7);
        String[] chunks = token.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));

        ObjectMapper mapper = new ObjectMapper();
        JsonNode parent;
        try {
            parent = mapper.readTree(payload);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return parent.path("sub").asText();
    }


}
