import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';

// Gán các sự kiện khi người dùng click
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.querySelector('.add-button').addEventListener('click', addRequestMatcher);
document.querySelector('.add-button').addEventListener('click', addResponseHeader);
