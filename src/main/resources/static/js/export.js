import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

// Hàm để xuất JSON
export function exportJson() {
    const method = document.getElementById('method').value;
    const urlPath = document.getElementById('urlPath').value;
    const status = parseInt(document.getElementById('status').value);
    const bodyType = document.getElementById('bodyType').value;
    const responseBody = document.getElementById('responseBody').value;

    // Xử lý lỗi nhập liệu
    if (!urlPath || !method) {
        alert('URL Path và Method là bắt buộc!');
        return;
    }

    // Lấy request matchers và response headers
    const requestMatchers = getRequestMatchers();
    const responseHeaders = getResponseHeaders();

    // Tạo object JSON theo định dạng bạn yêu cầu
    const jsonStub = {
        mappings: [
            {
                request: {
                    urlPath: urlPath,
                    method: method,
                    ...requestMatchers
                },
                response: {
                    status: status,
                    body: responseBody,
                    headers: {
                        "Content-Type": bodyType === 'json' ? "application/json" : "text/plain",
                        ...responseHeaders
                    }
                }
            }
        ]
    };

    // Hiển thị JSON ra textarea
    const prettyJson = JSON.stringify(jsonStub, null, 4);
    document.getElementById('jsonOutput').value = prettyJson;
}
