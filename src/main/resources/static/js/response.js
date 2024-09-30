export function addResponseHeader() {
    const container = document.getElementById('responseHeadersContainer');

    const headerDiv = document.createElement('div');
    headerDiv.className = 'dynamic-item row mb-2';

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.placeholder = 'Header Key';
    keyInput.className = 'form-control col';
    keyInput.required = true;

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Header Value';
    valueInput.className = 'form-control col';
    valueInput.required = true;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger col-auto';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => container.removeChild(headerDiv);

    headerDiv.append(keyInput, valueInput, deleteButton);
    container.appendChild(headerDiv);
}

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
            contentType = 'text/plain';
    }

    const existingContentTypeHeader = document.getElementById('contentTypeHeader');
    if (existingContentTypeHeader) {
        const valueInput = existingContentTypeHeader.querySelector('input[type="text"]:nth-child(2)');
        if (valueInput) {
            valueInput.value = contentType;
        }
    } else {
        const container = document.getElementById('responseHeadersContainer');
        const headerDiv = document.createElement('div');
        headerDiv.className = 'dynamic-item row mb-2';
        headerDiv.id = 'contentTypeHeader';

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

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger col-auto';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => container.removeChild(headerDiv);

        headerDiv.append(keyInput, valueInput, deleteButton);
        container.appendChild(headerDiv);
    }
}
