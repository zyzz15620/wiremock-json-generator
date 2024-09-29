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

// Hàm sao chép JSON từ textarea vào clipboard
function copyToClipboard() {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.select(); // Chọn toàn bộ nội dung của textarea
    document.execCommand('copy'); // Sao chép nội dung đã chọn vào clipboard
    alert('JSON copied to clipboard!');
}

// Gán sự kiện cho nút Export và Body Matchers
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard); // Gán sự kiện cho nút Copy

// Gán sự kiện riêng cho nút Add Request Matching
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);

// Gán sự kiện riêng cho nút Add Response Header
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
