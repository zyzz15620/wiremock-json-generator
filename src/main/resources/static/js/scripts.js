import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';
import { setContentTypeBasedOnBodyType } from './response.js';

// Toggle visibility and enable/disable Fixed Delay
function toggleFixedDelay() {
    const includeFixedDelay = document.getElementById('includeFixedDelay').checked;
    const fixedDelayInput = document.getElementById('fixedDelayValue');
    fixedDelayInput.disabled = !includeFixedDelay;
}

// Toggle visibility and enable/disable Fault options
function toggleFaultOptions() {
    const includeFault = document.getElementById('includeFault').checked;
    const faultSelect = document.getElementById('faultValue');
    faultSelect.disabled = !includeFault;
}

// Toggle visibility of Body Matchers section based on checkbox
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
document.getElementById('includeFixedDelay').addEventListener('change', toggleFixedDelay);
document.getElementById('includeFault').addEventListener('change', toggleFaultOptions);
document.getElementById('includeBody').addEventListener('change', toggleBodyMatchers);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('addRequestMatcher').addEventListener('click', addRequestMatcher);
document.getElementById('addResponseHeader').addEventListener('click', addResponseHeader);
document.getElementById('bodyType').addEventListener('change', setContentTypeBasedOnBodyType);

document.addEventListener('DOMContentLoaded', () => {
    toggleFixedDelay(); // Ensure Fixed Delay is disabled on page load
    toggleFaultOptions(); // Ensure Fault option is disabled on page load
    toggleBodyMatchers(); // Ensure Body Matchers section is hidden on page load
    setContentTypeBasedOnBodyType(); // Set Content-Type based on the selected body type on page load
});
