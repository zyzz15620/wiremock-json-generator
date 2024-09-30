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

// Function to update placeholders based on selected values
function updatePlaceholders() {
    const bodyMatcherField = document.getElementById('bodyMatcher');
    const bodyValueField = document.getElementById('bodyValue');
    const selectedMatcher = bodyMatcherField.value;

    switch (selectedMatcher) {
        case 'equalTo':
            bodyValueField.placeholder = 'Exact string you want to match';
            break;
        case 'equalToJson':
            bodyValueField.placeholder = '{ "key": "value" }';
            break;
        case 'equalToXml':
            bodyValueField.placeholder = '<root><key>value</key></root>';
            break;
        case 'matchesXPath':
            bodyValueField.placeholder = '//root/element';
            break;
        case 'matchesJsonPath':
            bodyValueField.placeholder = '$.key';
            break;
        case 'contains':
            bodyValueField.placeholder = 'Partial string match';
            break;
        case 'matches':
            bodyValueField.placeholder = 'Regular expression pattern';
            break;
        case 'doesNotMatch':
            bodyValueField.placeholder = 'Regular expression to not match';
            break;
    }

    const bodyTypeField = document.getElementById('bodyType');
    const responseBodyField = document.getElementById('responseBody');
    const selectedType = bodyTypeField.value;

    switch (selectedType) {
        case 'json':
            responseBodyField.placeholder = '{ "key": "value" }';
            break;
        case 'text':
            responseBodyField.placeholder = 'Plain text content';
            break;
        case 'xml':
            responseBodyField.placeholder = '<root><key>value</key></root>';
            break;
        case 'html':
            responseBodyField.placeholder = '<html><body><h1>Your HTML content</h1></body></html>';
            break;
        case 'base64':
            responseBodyField.placeholder = 'SGVsbG8gV29ybGQ=';
            break;
    }
}

// Set placeholders when the page loads
window.onload = updatePlaceholders;

// Bind event listeners for other functionality
document.getElementById('bodyMatcher').addEventListener('change', updatePlaceholders);
document.getElementById('bodyType').addEventListener('change', updatePlaceholders);
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
