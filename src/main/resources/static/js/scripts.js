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

// Hàm sao chép JSON từ textarea vào clipboard và hiển thị thông báo "Copied!"
function copyToClipboard() {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.select(); // Chọn toàn bộ nội dung của textarea
    document.execCommand('copy'); // Sao chép nội dung đã chọn vào clipboard

    const copyButton = document.getElementById('copyBtn');
    copyButton.textContent = 'Copied!';  // Thay đổi văn bản nút thành "Copied!"
    setTimeout(() => {
        copyButton.textContent = 'Copy JSON';  // Đổi lại thành "Copy JSON" sau 2 giây
    }, 2000);  // Thời gian hiển thị thông báo (2 giây)
}

// Gán sự kiện cho nút Export và Body Matchers
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard); // Gán sự kiện cho nút Copy

// Gán sự kiện riêng cho nút Add Request Matching
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);

// Gán sự kiện riêng cho nút Add Response Header
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
