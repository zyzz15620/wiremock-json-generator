import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

// Hàm để xuất JSON
export function exportJson() {
    const method = document.getElementById('method').value;
    const urlOption = document.getElementById('urlOption').value;  // Lấy URL Option (url, urlPath,...)
    const urlValue = document.getElementById('urlValue').value;    // Lấy giá trị URL từ input
    const status = parseInt(document.getElementById('status').value);
    const bodyType = document.getElementById('bodyType').value;    // Lấy giá trị Body Type
    const responseBody = document.getElementById('responseBody').value;  // Lấy giá trị Response Body

    // Xử lý lỗi nhập liệu
    if (!urlValue || !method) {
        alert('URL và Method là bắt buộc!');
        return;
    }

    // Lấy request matchers và response headers
    const requestMatchers = getRequestMatchers();
    const responseHeaders = getResponseHeaders();

    // Xử lý phần Body tùy thuộc vào loại Body Type
    let bodyField = {};
    let contentType = '';  // Biến để lưu trữ Content-Type

    if (bodyType === 'json') {
        bodyField = { "jsonBody": responseBody };
        contentType = 'application/json';
    } else if (bodyType === 'xml') {
        bodyField = { "xmlBody": responseBody };
        contentType = 'application/xml';
    } else if (bodyType === 'html') {
        bodyField = { "htmlBody": responseBody };
        contentType = 'text/html';
    } else if (bodyType === 'base64') {
        bodyField = { "base64Body": responseBody };
        contentType = 'application/base64';  // Bạn có thể dùng loại này nếu cần cho base64
    } else if (bodyType === 'text') {
        bodyField = { "body": responseBody };
        contentType = 'text/plain';
    }

    // Tạo object JSON theo định dạng bạn yêu cầu
    const jsonStub = {
        mappings: [
            {
                request: {
                    [urlOption]: urlValue,  // URL Option sẽ quyết định loại khớp URL nào được dùng
                    method: method,
                    ...requestMatchers
                },
                response: {
                    status: status,
                    headers: {
                        "Content-Type": contentType,  // Gán giá trị Content-Type theo Body Type
                        ...responseHeaders
                    },
                    ...bodyField  // Chèn bodyField dựa trên Body Type
                }
            }
        ]
    };

    // Hiển thị JSON ra textarea
    const prettyJson = JSON.stringify(jsonStub, null, 4);
    document.getElementById('jsonOutput').value = prettyJson;
}
