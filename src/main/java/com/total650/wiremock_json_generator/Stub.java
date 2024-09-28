package com.total650.wiremock_json_generator;



public class Stub {
    private String url;
    private String method;
    private String body;

    public Stub() {}

    public Stub(String url, String method, String body) {
        this.url = url;
        this.method = method;
        this.body = body;
    }
//meow
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
