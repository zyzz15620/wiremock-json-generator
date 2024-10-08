import { addRequestMatcher } from './request.js';
import { addResponseHeader } from './response.js';
import { exportJson } from './export.js';
import { setContentTypeBasedOnBodyType } from './response.js';
import { placeholderData } from './placeholderData.js';

fetch('templates.html')
    .then(response => response.text())
    .then(html => {
    document.body.insertAdjacentHTML('beforeend', html); // Insert templates into body
})
    .catch(error => console.error('Error loading templates:', error));

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

// Function to update all placeholders (for body, response, and URL)
function updateAllPlaceholders() {
    const bodyMatcherField = document.getElementById('bodyMatcher');
    const bodyValueField = document.getElementById('bodyValue');
    const selectedMatcher = bodyMatcherField.value;
    bodyValueField.placeholder = placeholderData.bodyMatcher[selectedMatcher] || '';

    const bodyTypeField = document.getElementById('bodyType');
    const responseBodyField = document.getElementById('responseBody');
    const selectedType = bodyTypeField.value;
    responseBodyField.placeholder = placeholderData.bodyType[selectedType] || '';

    const urlOptionField = document.getElementById('urlOption');
    const urlValueField = document.getElementById('urlValue');
    const selectedUrlOption = urlOptionField.value;
    urlValueField.placeholder = placeholderData.urlOption[selectedUrlOption] || '';
}

// Set placeholders when the page loads
window.onload = updateAllPlaceholders;

document.getElementById('bodyMatcher').addEventListener('change', updateAllPlaceholders);
document.getElementById('bodyType').addEventListener('change', updateAllPlaceholders);
document.getElementById('urlOption').addEventListener('change', updateAllPlaceholders);
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
