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
    if (jsonOutput) {  // Kiểm tra xem phần tử jsonOutput có tồn tại không
        jsonOutput.select(); // Chọn toàn bộ nội dung của textarea
        document.execCommand('copy'); // Sao chép nội dung đã chọn vào clipboard

        const copyButton = document.getElementById('copyBtn');
        copyButton.textContent = 'Copied!';  // Thay đổi văn bản nút thành "Copied!"
        setTimeout(() => {
            copyButton.textContent = 'Copy JSON';  // Đổi lại thành "Copy JSON" sau 2 giây
        }, 2000);  // Thời gian hiển thị thông báo (2 giây)
    } else {
        console.error('jsonOutput element not found');
    }
}

// Gán sự kiện cho nút Export và Body Matchers
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', exportJson);
} else {
    console.error('exportBtn element not found');
}

const includeBodyCheckbox = document.getElementById('includeBody');
if (includeBodyCheckbox) {
    includeBodyCheckbox.addEventListener('change', toggleBodyMatchers);
} else {
    console.error('includeBody element not found');
}

const copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', copyToClipboard);
} else {
    console.error('copyBtn element not found');
}

// Gán sự kiện riêng cho nút Add Request Matching
const addRequestMatcherBtn = document.getElementById('addRequestMatcher');
if (addRequestMatcherBtn) {
    addRequestMatcherBtn.addEventListener('click', addRequestMatcher);
} else {
    console.error('addRequestMatcher element not found');
}

// Gán sự kiện riêng cho nút Add Response Header
const addResponseHeaderBtn = document.getElementById('addResponseHeader');
if (addResponseHeaderBtn) {
    addResponseHeaderBtn.addEventListener('click', addResponseHeader);
} else {
    console.error('addResponseHeader element not found');
}
