package com.total650.wiremock_json_generator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
    @RequestMapping("/api/stubs")
    public class StubController {
    private final List<Stub> stubs = new ArrayList<>();

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping
    public List<Stub> getAllStubs() {
        return stubs; // Trả về tất cả các stub đã tạo
    }

    @PostMapping
    public Stub createStub(@RequestBody Stub stub) {
        stubs.add(stub); // Thêm stub vào danh sách
        return stub;
    }

    @DeleteMapping("/{url}")
    public String deleteStub(@PathVariable String url) {
        stubs.removeIf(stub -> stub.getUrl().equals(url)); // Xóa stub theo URL
        return "Stub with URL " + url + " has been deleted";
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportStubs() throws IOException {
        StringBuilder jsonOutput = new StringBuilder();
        jsonOutput.append("{ \"mappings\": [");

        for (int i = 0; i < stubs.size(); i++) {
            Stub stub = stubs.get(i);
            jsonOutput.append("{")
                    .append("\"request\": {")
                    .append("\"url\": \"").append(stub.getUrl()).append("\",")
                    .append("\"method\": \"").append(stub.getMethod()).append("\"")
                    .append("},")
                    .append("\"response\": {")
                    .append("\"body\": \"").append(stub.getBody()).append("\"")
                    .append("}")
                    .append("}");

            if (i < stubs.size() - 1) {
                jsonOutput.append(",");
            }
        }

        jsonOutput.append("]}");

        byte[] output = jsonOutput.toString().getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=stubs.json");
        return new ResponseEntity<>(output, headers, HttpStatus.OK);
    }
    }

