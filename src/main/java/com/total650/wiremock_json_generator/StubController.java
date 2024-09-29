package com.total650.wiremock_json_generator;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/stubs")
public class StubController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Phương thức để xuất stub từ form submission thành file JSON
    @PostMapping("/export")
    public ResponseEntity<byte[]> exportStub(@RequestBody Stub stub) throws IOException {
        // Sử dụng Jackson ObjectMapper để chuyển đổi stub thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonOutput = objectMapper.writeValueAsString(stub);

        byte[] output = jsonOutput.getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=stub.json");

        return new ResponseEntity<>(output, headers, HttpStatus.OK);
    }
}
