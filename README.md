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
  - `test-results` contains FSMs
    - `characterizationSet.json` FSM for System Specfication
    - `characterizationSetTestOutput.json` Test FSM
  - `Test.Framework` contains the prototype code for test generation and other key libraries
    - `geneateTest.ts` contains the code-gen code to generate the test cases and FSM for system definition.
    - `output.d.ts` a global script
    - `prototype.tx` a library called by test cases. 
  - `test` contains test cases
    - `test_gen.spec.ts` the test case generated using the code-gen process discussed in the report
    - `test-sandbox.spec.ts` a sandbox test case you can use to test ideas without it getting overridedn code-gen
- `node-mdoules\` node assets, you can replace it with what you need
- `sampleWeb\` contains the sample website
  - `src\` root directory of the sample website
    - `exampleWeb\` contains the sample website
      - `index.html` the sampel web page used in the prototype test cases

## 5. Running Code Gen

Navigate to `Playwright\` folder then execute `$ node generateTests.ts`.  

