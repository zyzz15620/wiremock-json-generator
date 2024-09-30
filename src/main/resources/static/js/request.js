// Add a new Request Matching block
export function addRequestMatcher() {
    const container = document.getElementById('requestMatchingContainer');

    const matcherDiv = document.createElement('div');
    matcherDiv.className = 'dynamic-item row mb-2';

    const typeSelect = document.createElement('select');
    typeSelect.className = 'form-control col';
    typeSelect.innerHTML = `
        <option value="queryParameters">Query Parameter</option>
        <option value="pathParameters">Path Parameter</option>
        <option value="headers">Header</option>
        <option value="cookies">Cookie</option>
        <option value="formParameters">Form Parameter</option>
    `;
    typeSelect.required = true;

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.placeholder = 'Key';
    keyInput.className = 'form-control col';
    keyInput.required = true;

    const matchSelect = document.createElement('select');
    matchSelect.className = 'form-control col';
    matchSelect.innerHTML = `
        <option value="equalTo">equals</option>
        <option value="contains">contains</option>
        <option value="matches">matches</option>
        <option value="notEqualTo">not equals</option>
        <option value="doesNotContain">not contains</option>
        <option value="doesNotMatch">not matches</option>
    `;
    matchSelect.required = true;

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Value';
    valueInput.className = 'form-control col';
    valueInput.required = true;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger col-auto';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => container.removeChild(matcherDiv);

    matcherDiv.append(typeSelect, keyInput, matchSelect, valueInput, deleteButton);
    container.appendChild(matcherDiv);
}

// Retrieve all request matchers
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

        if (matchType === 'notEqualTo') {
            requestMatchers[type][key] = { "not": { "equalTo": value } };
        } else {
            requestMatchers[type][key] = { [matchType]: value };
        }
    });

    return requestMatchers;
}
