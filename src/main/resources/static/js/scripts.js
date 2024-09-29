import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';

// Hàm để bật/tắt phần Body Matchers
function toggleBodyMatchers() {
    const includeBody = document.getElementById('includeBody').checked;
    const bodySection = document.getElementById('bodyMatcherSection');

    // Hiển thị hoặc ẩn phần Body Matcher dựa vào checkbox
    if (includeBody) {
        bodySection.style.display = 'block'; // Hiển thị phần body matcher khi checkbox được tích
    } else {
        bodySection.style.display = 'none';  // Ẩn phần body matcher nếu checkbox không được tích
    }
}

// Gán sự kiện khi người dùng click cho nút "Export JSON"
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);

// Gán sự kiện riêng cho nút "Add Request Matching"
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);

// Gán sự kiện riêng cho nút "Add Response Header"
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
