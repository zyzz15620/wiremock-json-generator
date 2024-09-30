# [WireMock JSON Stub Generator](https://wiremock-json-generator.onrender.com/)

## Overview
The **WireMock JSON Stub Generator** is a web-based tool that simplifies the process of creating WireMock stubs for mock API testing. Instead of manually writing JSON stubs, this tool provides an intuitive interface for generating stubs efficiently, reducing errors and saving time for testers, especially in automation scenarios.

This project demonstrates my full-stack development skills and a deep understanding of testing automation processes. By addressing the complexities of creating mock APIs, it offers a streamlined solution for automation testers.

## Features
- **Generate WireMock Stubs**: Easily create request matchers and response configurations using an intuitive UI.
- **Flexible Options**: Supports various HTTP methods, URL matching options, headers, request body matchers, and response body types (JSON, XML, etc.).
- **Customization**: Users can define response delays and fault scenarios for more advanced testing needs.

## Motivation
Creating WireMock stubs manually can be error-prone and time-consuming, especially in large-scale automation environments. This tool was built to address that pain point, making it easier to set up mock APIs for testing automation, especially for testers like myself who want to focus on test execution rather than stub creation.

## Tech Stack
- **Frontend**: HTML, CSS (Bootstrap 4), JavaScript
- **Backend**: None (fully static, deployed on Render)
- **Tools**: WireMock (API mock framework)

## Key Learning Points
- **UI/UX for Testing Tools**: Developed an intuitive user interface that minimizes errors while generating complex WireMock stubs.
- **WireMock Stub Creation**: I gained a deeper understanding of how WireMock stubs work.
- **Error Handling**: Implemented validations to prevent invalid JSON or incorrect request/response configurations.
- **The Importance of Automation Testing**: I encountered many bugs, and each fix required manually retesting all features. This experience emphasized the need for automated tests to ensure functionality after every change.

## Future Enhancements
- **Support for Additional Elements**: Add support for more complex elements such as `multipart/form-data` and **Basic Authentication**.
- **More Matchers**: Expand support for additional matchers to provide more flexibility in request matching.
- **Code Conversion**: Add a feature to convert the generated stubs to **Java** code, offering testers and developers the ability to directly integrate stubs into their Java-based WireMock setups.

## Try It Out
Check out the project live: [WireMock JSON Generator](https://wiremock-json-generator.onrender.com/)
