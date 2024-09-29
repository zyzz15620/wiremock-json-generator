// Hàm để thêm một Response Header
export function addResponseHeader() {
    const container = document.getElementById('responseHeadersContainer');

    const headerDiv = document.createElement('div');
    headerDiv.className = 'dynamic-item row mb-2';  // Thêm Bootstrap row và margin bottom

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.placeholder = 'Header Key';
    keyInput.className = 'form-control col';  // Áp dụng Bootstrap form-control
    keyInput.required = true;

    const valueInput = document.createElement('input');
    valueInput.type = 'text';  // Đặt type cho giá trị
    valueInput.placeholder = 'Header Value';
    valueInput.className = 'form-control col';  // Áp dụng Bootstrap form-control
    valueInput.required = true;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger col-auto';  // Áp dụng Bootstrap button
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => container.removeChild(headerDiv);

    headerDiv.appendChild(keyInput);
    headerDiv.appendChild(valueInput);
    headerDiv.appendChild(deleteButton);

    container.appendChild(headerDiv);
}

// Hàm để lấy tất cả các response headers
export function getResponseHeaders() {
    const responseHeaders = {};
    const responseHeaderElements = document.querySelectorAll('#responseHeadersContainer .dynamic-item');
    responseHeaderElements.forEach(item => {
        const key = item.children[0].value;
        const value = item.children[1].value;
        responseHeaders[key] = value;
    });

    return responseHeaders;
}

export function setContentTypeBasedOnBodyType() {
    const bodyType = document.getElementById('bodyType').value;
    let contentType = '';

    switch (bodyType) {
        case 'json':
            contentType = 'application/json';
            break;
        case 'text':
            contentType = 'text/plain';
            break;
        case 'xml':
            contentType = 'application/xml';
            break;
        case 'html':
            contentType = 'text/html';
            break;
        case 'base64':
            contentType = 'application/base64';
            break;
        default:
            contentType = 'text/plain';  // Default to plain text
            break;
    }

    // Check if the Content-Type header already exists
    const existingContentTypeHeader = document.getElementById('contentTypeHeader');
    if (existingContentTypeHeader) {
        // If it exists, update the value if the user hasn't removed it
        const valueInput = existingContentTypeHeader.querySelector('input[type="text"]:nth-child(2)');
        if (valueInput) {
            valueInput.value = contentType;  // Update the content-type value
        }
    } else {
        // If no Content-Type header exists, create a new one
        const container = document.getElementById('responseHeadersContainer');
        const headerDiv = document.createElement('div');
        headerDiv.className = 'dynamic-item row mb-2';
        headerDiv.id = 'contentTypeHeader';  // Assign a unique ID for the Content-Type header

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.value = 'Content-Type';
        keyInput.className = 'form-control col';
        keyInput.required = true;

        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.value = contentType;
        valueInput.className = 'form-control col';
        valueInput.required = true;

        // Make both inputs editable by removing readOnly attributes
        keyInput.readOnly = false;
        valueInput.readOnly = false;

        // Add delete button to allow removal of the Content-Type header
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger col-auto';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => container.removeChild(headerDiv);

        headerDiv.appendChild(keyInput);
        headerDiv.appendChild(valueInput);
        headerDiv.appendChild(deleteButton);
        container.appendChild(headerDiv);
    }
}






