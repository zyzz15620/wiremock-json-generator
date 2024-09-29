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

// Gán các sự kiện khi người dùng click
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.querySelector('.add-button').addEventListener('click', addRequestMatcher);
document.querySelector('.add-button').addEventListener('click', addResponseHeader);
