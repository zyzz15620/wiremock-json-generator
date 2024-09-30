export function addRequestMatcher() {
    const container = document.getElementById('requestMatchingContainer');
    const matcherDiv = document.createElement('div');
    matcherDiv.className = 'dynamic-item row mb-2';

    const template = `
        <select class="form-control col">
            <option value="queryParameters">Query Parameter</option>
            <option value="pathParameters">Path Parameter</option>
            <option value="headers">Header</option>
            <option value="cookies">Cookie</option>
            <option value="formParameters">Form Parameter</option>
        </select>
        <input type="text" placeholder="Key" class="form-control col" required />
        <select class="form-control col">
            <option value="equalTo">equals</option>
            <option value="contains">contains</option>
            <option value="matches">matches</option>
            <option value="notEqualTo">not equals</option>
            <option value="doesNotContain">not contains</option>
            <option value="doesNotMatch">not matches</option>
            <option value="after">after date</option>
            <option value="before">before date</option>
        </select>
        <input type="text" placeholder="Value" class="form-control col" required />
        <button type="button" class="btn btn-danger col-auto">Delete</button>
    `;

    matcherDiv.innerHTML = template;

    const deleteButton = matcherDiv.querySelector('button');
    deleteButton.onclick = () => container.removeChild(matcherDiv);

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
