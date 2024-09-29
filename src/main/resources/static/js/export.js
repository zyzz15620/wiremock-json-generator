import { getRequestMatchers } from './request.js';
import { getResponseHeaders } from './response.js';

export function exportJson() {
    const method = document.getElementById('method').value;
    const urlOption = document.getElementById('urlOption').value;
    const urlValue = document.getElementById('urlValue').value;
    const status = parseInt(document.getElementById('status').value);
    const bodyType = document.getElementById('bodyType').value;
    const responseBody = document.getElementById('responseBody').value;

    // Validate URL and Method
    if (!urlValue || !method) {
        alert('URL and Method are required!');
        return;
    }

    // Retrieve request matchers and response headers
    const requestMatchers = getRequestMatchers();
    const responseHeaders = getResponseHeaders();

    // Check if Content-Type exists in response headers
    let contentTypeExists = false;
    if (responseHeaders.hasOwnProperty('Content-Type')) {
        contentTypeExists = true;
    }

    // Handle Response Body based on body type
    let responseBodyField = {};
    let contentType = '';

    if (bodyType === 'json') {
        const parsedResponseBody = tryParseJSON(responseBody);
        if (parsedResponseBody) {
            responseBodyField = { "jsonBody": parsedResponseBody };
            contentType = 'application/json';
        } else {
            alert("Invalid JSON format in response body.");
            return;
        }
    } else if (bodyType === 'xml') {
        responseBodyField = { "equalToXml": responseBody };
        contentType = 'application/xml';
    } else if (bodyType === 'html') {
        responseBodyField = { "htmlBody": responseBody };
        contentType = 'text/html';
    } else if (bodyType === 'base64') {
        responseBodyField = { "binaryEqualTo": responseBody };
        contentType = 'application/base64';
    } else if (bodyType === 'text') {
        responseBodyField = { "body": responseBody };
        contentType = 'text/plain';
    }

    // Construct the response object
    let response = {
        status: status,
        ...responseBodyField,
        headers: responseHeaders
    };

    // Add the Content-Type only if it exists in the response headers
    if (contentTypeExists) {
        response.headers['Content-Type'] = contentType;
    }

    // Create the JSON structure
    const jsonStub = {
        mappings: [
            {
                request: {
                    [urlOption]: urlValue,
                    method: method,
                    ...requestMatchers,
                },
                response: response
            }
        ]
    };

    // Display JSON in the output area
    const prettyJson = JSON.stringify(jsonStub, null, 4);
    document.getElementById('jsonOutput').value = prettyJson;
}
