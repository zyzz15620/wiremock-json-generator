import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';
import { setContentTypeBasedOnBodyType } from './response.js';

// Toggle visibility of Body Matchers section
function toggleBodyMatchers() {
    const includeBody = document.getElementById('includeBody').checked;
    const bodySection = document.getElementById('bodyMatcherSection');
    bodySection.style.display = includeBody ? 'block' : 'none';
}

// Copy JSON output to clipboard
function copyToClipboard() {
    const jsonOutput = document.getElementById('jsonOutput');
    if (jsonOutput) {
        jsonOutput.select();
        document.execCommand('copy');
        const copyButton = document.getElementById('copyBtn');
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy JSON', 2000);
    }
}

// Bind event listeners
document.getElementById('exportBtn').addEventListener('click', exportJson);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
document.getElementById('bodyType').addEventListener('change', setContentTypeBasedOnBodyType);

document.addEventListener('DOMContentLoaded', () => {
    setContentTypeBasedOnBodyType();
});
