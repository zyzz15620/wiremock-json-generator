import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

// Hàm để xuất JSON
export function exportJson() {
    const method = document.getElementById('method').value;
    const urlOption = document.getElementById('urlOption').value;  // Lấy URL Option (url, urlPath,...)
    const urlValue = document.getElementById('urlValue').value;    // Lấy giá trị URL từ input
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

    // Xử lý phần Body nếu người dùng chọn Include Body
    let bodyMatcher = {};
    if (document.getElementById('includeBody').checked) {
        const bodyMatcherType = document.getElementById('bodyMatcher').value;
        const bodyValue = document.getElementById('bodyValue').value;
        bodyMatcher = {
            bodyPatterns: [
                { [bodyMatcherType]: bodyValue }
            ]
        };
    }

    // Tạo object JSON theo định dạng bạn yêu cầu
    const jsonStub = {
        mappings: [
            {
                request: {
                    [urlOption]: urlValue,  // URL Option sẽ quyết định loại khớp URL nào được dùng
                    method: method,
                    ...requestMatchers,
                    ...bodyMatcher  // Thêm matcher cho Body nếu có
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
