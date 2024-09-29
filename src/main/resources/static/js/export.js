import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

// Hàm để kiểm tra và parse JSON nếu hợp lệ
function tryParseJSON(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        if (typeof parsed === 'object' && parsed !== null) {
            return parsed;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

// Hàm để xuất JSON
export function exportJson() {
    const method = document.getElementById('method').value;
    const urlOption = document.getElementById('urlOption').value;
    const urlValue = document.getElementById('urlValue').value;
    const status = parseInt(document.getElementById('status').value);
    const bodyType = document.getElementById('bodyType').value;
    const responseBody = document.getElementById('responseBody').value;

    // Xử lý lỗi nhập liệu
    if (!urlValue || !method) {
        alert('URL và Method là bắt buộc!');
        return;
    }

    // Lấy request matchers và response headers
    const requestMatchers = getRequestMatchers();
    const responseHeaders = getResponseHeaders();

    // Xử lý phần Response Body tùy thuộc vào loại Body Type
    let responseBodyField = {};
    let contentType = '';

    if (bodyType === 'json') {
        const parsedResponseBody = tryParseJSON(responseBody);
        if (parsedResponseBody) {
            responseBodyField = { "jsonBody": parsedResponseBody };
            contentType = 'application/json';
        } else {
            alert("Invalid JSON format in response body.");
            return;
        }
    } else if (bodyType === 'xml') {
        responseBodyField = { "equalToXml": responseBody };
        contentType = 'application/xml';
    } else if (bodyType === 'html') {
        responseBodyField = { "htmlBody": responseBody };
        contentType = 'text/html';
    } else if (bodyType === 'base64') {
        responseBodyField = { "binaryEqualTo": responseBody };
        contentType = 'application/base64';
    } else if (bodyType === 'text') {
        responseBodyField = { "body": responseBody };
        contentType = 'text/plain';
    }

    // Kiểm tra và xử lý Request Body nếu có
    let requestBodyField = {};
    const requestBody = document.getElementById('bodyValue'); // Đảm bảo lấy đúng id của request body field
    const requestBodyMatcher = document.getElementById('bodyMatcher');  // Sử dụng matcher cho request body

    if (requestBody && requestBody.value && requestBodyMatcher) {
        // Nếu matcher là 'equalToJson', kiểm tra xem Request Body có phải là JSON hợp lệ không
        if (requestBodyMatcher.value === 'equalToJson') {
            const parsedRequestBody = tryParseJSON(requestBody.value);
            if (parsedRequestBody) {
                requestBodyField = {
                    bodyPatterns: [
                        { [requestBodyMatcher.value]: parsedRequestBody }
                    ]
                };
            } else {
                alert("Invalid JSON format in request body.");
                return;
            }
        } else {
            // Nếu không phải matcher JSON, chỉ cần lấy chuỗi body bình thường
            requestBodyField = {
                bodyPatterns: [
                    { [requestBodyMatcher.value]: requestBody.value }
                ]
            };
        }
    }

    // Tạo object JSON theo định dạng bạn yêu cầu
    const jsonStub = {
        mappings: [
            {
                request: {
                    [urlOption]: urlValue,
                    method: method,
                    ...requestMatchers,
                    ...requestBodyField  // Thêm body matcher cho Request nếu có
                },
                response: {
                    status: status,
                    headers: {
                        "Content-Type": contentType,
                        ...responseHeaders
                    },
                    ...responseBodyField  // Chèn bodyField dựa trên Response Body Type
                }
            }
        ]
    };

    // Hiển thị JSON ra textarea
    const prettyJson = JSON.stringify(jsonStub, null, 4);
    document.getElementById('jsonOutput').value = prettyJson;
}
