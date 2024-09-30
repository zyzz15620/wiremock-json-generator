import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';
import { setContentTypeBasedOnBodyType } from './response.js';

function toggleFixedDelay() {
    const includeFixedDelay = document.getElementById('includeFixedDelay').checked;
    const fixedDelayInput = document.getElementById('fixedDelayValue');
    fixedDelayInput.disabled = !includeFixedDelay;
}

function toggleFaultOptions() {
    const includeFault = document.getElementById('includeFault').checked;
    const faultSelect = document.getElementById('faultValue');
    faultSelect.disabled = !includeFault;
}

function toggleBodyMatchers() {
    const includeBody = document.getElementById('includeBody').checked;
    const bodySection = document.getElementById('bodyMatcherSection');
    bodySection.style.display = includeBody ? 'block' : 'none';
}

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
document.getElementById('includeFixedDelay').addEventListener('change', toggleFixedDelay);
document.getElementById('includeFault').addEventListener('change', toggleFaultOptions);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
document.getElementById('bodyType').addEventListener('change', setContentTypeBasedOnBodyType);

// Ensure the content type is set based on the body type when the page loads
document.addEventListener('DOMContentLoaded', () => {
    toggleFixedDelay();
    toggleFaultOptions();
    toggleBodyMatchers();
    setContentTypeBasedOnBodyType();
});