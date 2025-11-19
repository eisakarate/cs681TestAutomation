# UI Test Automation using FSM-based Test Generation for Specification Compliance Evaluation

UI Test Automation using Model-Based Testing method based on W-Method. 

Technologies used:

- Vite+React for prototype target
- Microsoft PlayWright + TypeScript for test case execution

## 0. Assumptions

It is assumed that you have already configured VS Code to run unit tests.

## 1. Install Node.JS

Please install node.js: https://nodejs.org/en/download

## 3. Install Playwright runtime

Please use the command below to install PlayWright runtime files:

`$npm init playwright@1.17.131`

## 3. Install Playwright Test for VS Code

`Playwright Test for VSCode` is a helpful tool for unning Playwright test cases.  To install, follow the instructions provided by Microsoft (https://playwright.dev/docs/getting-started-vscode)

## 4. Directory Structure Overview

- `PlayWright\` contains playwright related assets
  - `Test.Framework` contains the prototype code for test generation and other key libraries
  - `test` contains test cases
    - `test_gen.spec.ts` the test case generated using the code-gen process discussed in the report
- `node-mdoules\` node assets, you can replace it with what you need
- `sampleWeb\` contains the sample website
  - 
