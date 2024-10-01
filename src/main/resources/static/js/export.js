import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

function tryParseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        alert("Invalid JSON format.");
        return null;
    }
}

export function exportJson() {
    const method = document.getElementById('method').value;
    const urlOption = document.getElementById('urlOption').value;
    const urlValue = document.getElementById('urlValue').value;
    const status = parseInt(document.getElementById('status').value);
    const includeRequestBody = document.getElementById('includeBody').checked;
    const bodyMatcherType = document.getElementById('bodyMatcher').value;
    const bodyValue = document.getElementById('bodyValue').value;

    if (!urlValue || !method) {
        alert('URL and Method are required!');
        return;
    }

    const requestMatchers = getRequestMatchers();
    const responseHeaders = getResponseHeaders();

    let responseBodyField = {};

    const bodyType = document.getElementById('bodyType').value;
    const responseBody = document.getElementById('responseBody').value;

    if (bodyType === 'json') {
        const parsedResponseBody = tryParseJSON(responseBody);
        if (parsedResponseBody) {
            responseBodyField = { "jsonBody": parsedResponseBody };
        } else {
            return; // Stop export if response body is invalid JSON
        }
    } else if (bodyType === 'xml') {
        responseBodyField = { "equalToXml": responseBody };
    } else if (bodyType === 'html') {
        responseBodyField = { "htmlBody": responseBody };
    } else if (bodyType === 'base64') {
        responseBodyField = { "binaryEqualTo": responseBody };
    } else if (bodyType === 'text') {
        responseBodyField = { "body": responseBody };
    }

    let response = {
        status: status,
        ...responseBodyField
    };

    // Add the headers field if there are actual headers
    if (Object.keys(responseHeaders).length > 0) {
        response.headers = responseHeaders; // Include Content-Type and other headers
    }

    if (document.getElementById('includeFixedDelay').checked) {
        const fixedDelayValue = parseInt(document.getElementById('fixedDelayValue').value);
        if (!isNaN(fixedDelayValue)) {
            response.fixedDelayMilliseconds = fixedDelayValue;
        }
    }

    if (document.getElementById('includeFault').checked) {
        const faultValue = document.getElementById('faultValue').value;
        response.fault = faultValue;
    }

    let requestBody = {};
    if (includeRequestBody) {
        if (bodyMatcherType === 'equalToJson') {
            const parsedRequestBody = tryParseJSON(bodyValue);
            if (parsedRequestBody) {
                requestBody = { "bodyPatterns": [{ "equalToJson": parsedRequestBody }] };
            } else {
                return;
            }
        } else if (bodyMatcherType === 'equalToXml') {
            requestBody = { "bodyPatterns": [{ "equalToXml": bodyValue }] };
        } else {
            requestBody = { "bodyPatterns": [{ [bodyMatcherType]: bodyValue }] };
        }
    }

    const jsonStub = {
        mappings: [
            {
                request: {
                    [urlOption]: urlValue,
                    method: method,
                    ...requestMatchers,
                    ...requestBody
                },
                response: response
            }
        ]
    };

    const prettyJson = JSON.stringify(jsonStub, null, 4);
    document.getElementById('jsonOutput').value = prettyJson;
}