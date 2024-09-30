// Event delegation for delete buttons
document.getElementById('requestMatchingContainer').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn-danger')) {
        event.target.closest('.dynamic-item').remove();
    }
});

export function addRequestMatcher() {
    const container = document.getElementById('requestMatchingContainer');
    const template = document.getElementById('request-matcher-template');

    // Clone the template content and append it to the container
    const matcherDiv = template.content.cloneNode(true);
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
