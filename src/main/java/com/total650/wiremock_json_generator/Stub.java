package com.total650.wiremock_json_generator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Stub {
    private String url;
    private String method;
    private String body;
}
