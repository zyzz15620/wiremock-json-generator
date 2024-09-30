export const placeholderData = {
    bodyMatcher: {
        equalTo: 'Exact string you want to match',
        equalToJson: '{ "key": "value" }',
        equalToXml: '<root><key>value</key></root>',
        matchesXPath: '//root/element',
        matchesJsonPath: '$.key',
        contains: 'Partial string match',
        matches: 'Regular expression pattern',
        doesNotMatch: 'Regular expression to not match',
    },
    bodyType: {
        json: '{ "key": "value" }',
        text: 'Plain text content',
        xml: '<root><key>value</key></root>',
        html: '<html><body><h1>Your HTML content</h1></body></html>',
        base64: 'SGVsbG8gV29ybGQ=',
    },
    urlOption: {
        url: '/your/url',
        urlPath: '/your/url/path',
        urlPattern: '/your/.*',
        urlPathPattern: '/your/.*path',
    }
};
