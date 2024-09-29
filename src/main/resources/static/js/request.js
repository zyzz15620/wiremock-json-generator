// Hàm để thêm một Request Matching
export function addRequestMatcher() {
    const container = document.getElementById('requestMatchingContainer');

    const matcherDiv = document.createElement('div');
    matcherDiv.className = 'dynamic-item row mb-2';  // Thêm Bootstrap row và margin bottom

    const typeSelect = document.createElement('select');
    typeSelect.className = 'form-control col';  // Áp dụng Bootstrap form-control
    typeSelect.innerHTML = `
        <option value="queryParameters">Query Parameter</option>
        <option value="headers">Header</option>
        <option value="cookies">Cookie</option>
        <option value="bodyPatterns">Body</option>
        <option value="formParameters">Form Parameter</option>
    `;
    typeSelect.required = true;

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.placeholder = 'Key';
    keyInput.className = 'form-control col';  // Áp dụng Bootstrap form-control
    keyInput.required = true;

    const matchSelect = document.createElement('select');
    matchSelect.className = 'form-control col';  // Áp dụng Bootstrap form-control
    matchSelect.innerHTML = `
        <option value="equalTo">equals</option>
        <option value="contains">contains</option>
        <option value="matches">matches</option>
        <option value="not">not</option>
    `;
    matchSelect.required = true;

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Value';
    valueInput.className = 'form-control col';  // Áp dụng Bootstrap form-control
    valueInput.required = true;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger col-auto';  // Áp dụng Bootstrap button
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => container.removeChild(matcherDiv);

    matcherDiv.appendChild(typeSelect);
    matcherDiv.appendChild(keyInput);
    matcherDiv.appendChild(matchSelect);
    matcherDiv.appendChild(valueInput);
    matcherDiv.appendChild(deleteButton);

    container.appendChild(matcherDiv);
}

// Hàm để lấy tất cả các request matchers
export function getRequestMatchers() {
    const requestMatchers = {};
    const requestMatchingElements = document.querySelectorAll('#requestMatchingContainer .dynamic-item');
    requestMatchingElements.forEach(item => {
        const type = item.children[0].value;
        const key = item.children[1].value;
        const matchType = item.children[2].value;
        const value = item.children[3].value;

        if (!requestMatchers[type]) {
            requestMatchers[type] = {};
        }

        requestMatchers[type][key] = {};
        requestMatchers[type][key][matchType] = value;
    });

    return requestMatchers;
}
