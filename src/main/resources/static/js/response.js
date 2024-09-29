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
