import * as fs from 'fs/promises'; // Use the promises API
import * as path from 'path';

//Generates test cases based on specified JSON
//Structure:
//  stateOrdinal: to ensure that questions are run in order
//  callingState: origin state
//  transitionValues: values that origin state use to transition to the next state
//  nextState: state to transition to via the transition value, i.e., next question
//  expectedNextStateControlStates: expected state of the target state (enabled or disabled)

/**
 * Defining EFSM/test definition structure
 */
interface expectedNextStateControlState {
    callerTransitionValue: string,  //value that the calling state transitioned with (i.e., parent question)
    enabled: boolean,   //true-> control should be enabled, false -> control should be disabled
}
interface outputFSMEntry{
    stateOrdinal: number,   //sorting index, ensures that questions are called in order, otherwise it will be challenging to build the state diagram (it is possible however)
    callingState: string,   //current state, i.e., current question
    transitionValues: string[],   //values to transition using
    nextState: string,    //next state, i.e., next question
    expectedNextStateControlStates: expectedNextStateControlState[],
    controlType: string //indicates the control type (e.g., textbox, radio)
};
/*
Test Code Generation process
 */
function generateCodeForControl(ordinal: number, targetQuestion: string, targetQuestionControlType: string, valueToSet: string, nextQuestion: string, expectedControlEnabled: boolean): string{
    switch(targetQuestionControlType)
    {
        case "textbox":
            return `await performEvaluationTextbox(testName, page, ${ordinal.toString()}, "${targetQuestion}", "${nextQuestion}", "${valueToSet}", ${(expectedControlEnabled? "true": "false")},outputFSM);`
        case "radio":
            return `await performEvaluationRadioButton(testName, page, ${ordinal.toString()}, "${targetQuestion}", "${nextQuestion}", "${valueToSet}", ${(expectedControlEnabled? "true": "false")}, outputFSM);`
            break;
    }
    return "";
}
let testCode: string[] = [];
function generateTestCaseCode(efsm: outputFSMEntry[], curOrdinal: number, curExpr: string, previousState: string, valueUsedForTransition: string, fsmInputWord: string){
    //get the current state
    var curState :outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === curOrdinal);

    if(curState)
    {
        const currentState = curState;
        currentState.transitionValues.forEach((x, index) => {
            let testExpression:string = curExpr;
            const x2 = x; //get the value to set

            //add to the "word"
            fsmInputWord += `_${x}`;
            
            //get the expected state
            const curExpectedState = currentState.expectedNextStateControlStates.find(x=>x.callerTransitionValue === x2);
            let curExpectedStateValue = false;
            if (curExpectedState)
                curExpectedStateValue = curExpectedState.enabled;

            //check if the transition value is special
            switch(x2)
            {
                case "#":
                    //no test to run
                    testExpression += `\t//Skipping Question ${currentState.nextState} - transition value specified was: ${x2}.\r\n`;
                    break;
                default:
                    //add the test case
                    testExpression += `\t//Checking Question ${currentState.nextState} - transition value specified was: ${x2}.\r\n`;
                    testExpression += '\t' + generateCodeForControl(
                        currentState.stateOrdinal,
                        currentState.callingState,
                        currentState.controlType,
                        x,
                        currentState.nextState,
                        curExpectedStateValue
                    ) + "\r\n";
                    break;
            }

            //go to the next state
            var nextStateIndex = curOrdinal + 1;
            var nextStateToGoTo: outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === nextStateIndex);

            if (nextStateToGoTo)
            {
                //generate more
                generateTestCaseCode(
                    efsm,
                    nextStateIndex,
                    testExpression,
                    currentState.callingState,
                    x,
                    fsmInputWord);
            }
            else
            {
                
                //get current path
                const currentPath = path.join(process.cwd(), "../../sampleWeb/src/exampleWeb/index.html").replaceAll("\\", "/")
                
                //nothing to add, write to array
                testCode.push(
                    `test('test_${fsmInputWord}', async({page}) => {\r\n` +
                    `\tlet testName = \'${fsmInputWord}\';\r\n` + 
	                '\tlet outputFSM: characterization_0_EquivalenceEntry[] = [];\r\n'+
                    `\tawait page.goto(\'${currentPath}\'); \r\n` +
                    `\tawait registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);\r\n` + 
                    testExpression + ' \r\n' +
                    `\tawait outputLog("test_${fsmInputWord}.json");\r\n` + 
                    `\tglobalThis.EFSM_Outputs.push(\r\n`+
                    `\t\t{\r\n`+
                    `\t\t\tpartition: testName,\r\n`+
                    `\t\t\tfsm: outputFSM.sort((a, b) => {\r\n`+
                        `\t\t\t\tif(a.stateOrdinal != b.stateOrdinal)\r\n`+
                        `\t\t\t\t\treturn a.stateOrdinal - b.stateOrdinal;\r\n`+
                        `\t\t\t//sort by calling state\r\n`+
                        `\t\t\tif(a.callingState != b.callingState)\r\n`+
                        `\t\t\t\treturn (a.callingState < b.callingState) ? -1: 1;\r\n`+
                        `\t\t\t//calling state are the same\r\n`+
                        `\t\t\t\t//sort by transition value\r\n`+
                        `\t\t\tif(a.transitionValue != b.transitionValue)\r\n`+
                        `\t\t\t\treturn (a.transitionValue < b.transitionValue) ? -1: 1;\r\n`+
                        `\t\t\t//sort by target state\r\n`+
                        `\t\t\tif(a.nextState != b.nextState)\r\n`+
                        `\t\t\t\treturn (a.nextState < b.nextState) ? -1: 1;\r\n`+
                        `\t\t\treturn 0;\r\n`+
                    `\t\t\t})\r\n`+
                    `\t\t}\r\n`+
                    `\t)\r\n`+
                    "});"
                );
            }
        });
    }
}

/*
Characterization Set Generation
 */
//characterization set of 0-Equivalence
export interface characterization_0_EquivalenceEntry{
    stateOrdinal: number,
    callingState: string,
    transitionValue: string,
    nextState: string,
}
//full characterization set of the full k-equivalence
export interface characterization_K_Equivalence{
    partition: string,
    fsm: characterization_0_EquivalenceEntry[]
}
//let specFSMCode: string[] = [];
let specFSMCodeSets: characterization_K_Equivalence[] = [];
function generateSpecificationFSM(efsm: outputFSMEntry[], curOrdinal: number, curOEquivalenceSet: characterization_0_EquivalenceEntry[], previousState: string, valueUsedForTransition: string, fsmInputWord: string){
    console.log(`Starting up generateSpecificationFSM with: curOrdinal=${curOrdinal}`)
    //get the current state
    var curState :outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === curOrdinal);

    if(curState)
    {
        const currentState = curState;
        currentState.transitionValues.forEach((x, index) => {
            let specFSMExpression:characterization_0_EquivalenceEntry[] = [...curOEquivalenceSet];//make a copy of the array, don't modify the original
            const x2 = x;

            //add to the "word"
            fsmInputWord += `_${x}`;
            
            //get the expected state
            const curExpectedState = currentState.expectedNextStateControlStates.find(x=>x.callerTransitionValue === x2);
            let curExpectedStateValue = false;
            if (curExpectedState)
                curExpectedStateValue = curExpectedState.enabled;

            //register the next state
            const stateOrdinal = currentState.stateOrdinal;
            specFSMExpression.push(
                {
                    stateOrdinal: stateOrdinal, 
                    callingState: currentState.callingState, 
                    transitionValue: x2,
                    nextState: currentState.nextState}
            );

            //go to the next state
            var nextStateIndex = curOrdinal + 1;
            var nextStateToGoTo: outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === nextStateIndex);

            if (nextStateToGoTo)
            {
                console.log(`collecting more`);
                //generate more
                generateSpecificationFSM(
                    efsm,
                    nextStateIndex,
                    specFSMExpression,
                    currentState.callingState,
                    x,
                    fsmInputWord);
            }
            else
            {
                //nothing to add, write to array
                specFSMCodeSets.push(
                        {
                            partition: fsmInputWord,
                            fsm: specFSMExpression.sort((a, b) => {
                                if(a.stateOrdinal != b.stateOrdinal)
                                    return a.stateOrdinal - b.stateOrdinal;
                                
                                //sort by calling state
                                if(a.callingState != b.callingState)
                                    return (a.callingState < b.callingState) ? -1: 1;
                                //calling state are the same
                                //sort by transition value
                                if(a.transitionValue != b.transitionValue)
                                    return (a.transitionValue < b.transitionValue) ? -1: 1;
                                //sort by target state
                                if(a.nextState != b.nextState)
                                    return (a.nextState < b.nextState) ? -1: 1;
                                
                                return 0;
                            })
                        }
                );
            }
        });
    }
    else{
        console.log("Empty");
    }
}

const efsmForTestGeneration: outputFSMEntry[] = [
    
    {stateOrdinal: 0, 
        callingState: '!', 
        transitionValues: ["#"], 
        nextState: "LastName", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "#", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 1, 
        callingState: 'LastName', 
        transitionValues: ["A"], 
        nextState: "FirstName", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "A", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 2, 
        callingState: 'FirstName', 
        transitionValues: ["A"], 
        nextState: "MiddleInitial", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "A", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 3, 
        callingState: 'MiddleInitial', 
        transitionValues: ["A"], 
        nextState: "Today", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "A", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 4, 
        callingState: 'Today', 
        transitionValues: ["2025-11-05"], 
        nextState: "DoB", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "2025-11-05", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 5, 
        callingState: 'DoB', 
        transitionValues: ["2025-11-05"], 
        nextState: "Age", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "2025-11-05", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 6, 
        callingState: 'Age', 
        transitionValues: ["\d"], 
        nextState: "Age", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "\d", enabled: true}
        ],
        controlType: "textbox" },
    {stateOrdinal: 7, 
        callingState: 'Gender', 
        transitionValues: ["M", "F"], 
        nextState: "Pregnancy", 
        expectedNextStateControlStates: 
        [
            {callerTransitionValue: "M", enabled: false},
            {callerTransitionValue: "F", enabled: true}
        ],
        controlType: "radio" },
    {stateOrdinal: 8, 
        callingState: 'Pregnancy', 
        transitionValues: ["Y", "N", "U"], 
        nextState: "#", 
        expectedNextStateControlStates: 
        [
        ],
        controlType: "radio" },
];

//run using $ node generateTests.ts
//code gen
generateTestCaseCode(efsmForTestGeneration, 0, "", "s_0", "#", "");
await fs.writeFile(path.join("../tests/", "test_gen.spec.ts"),
    'import * as fs from \'fs/promises\'; // Use the promises API \r\n' +
    'import * as path from \'path\'; \r\n' + 
    "import { test, expect, Page } from '@playwright/test'; \r\n" + 
    'import { calculateFileHashSHA256, registerStartingOperation, generateSingleChartTextEntry, performEvaluationTextbox, performEvaluationRadioButton, outputLog} from "../Test.Framework/prototype" \r\n' + 
    'import { characterization_0_EquivalenceEntry, characterization_K_Equivalence} from \'../Test.Framework/generateTests\' \r\n\r\n' + 
    'test.beforeAll(async() =>{\r\n'+
    '\t\tglobalThis.EFSM_Outputs = []; //instantiate the output structure\r\n'+
    '});\r\n'+
    'test.afterAll(async() =>{\r\n'+
    '\t//order \r\n'+
    '\t//generate outputs \r\n'+ 
    '\tconst jsonExpr = JSON.stringify(globalThis.EFSM_Outputs.sort((a,b) => { \r\n'+
    '\t\tif(a.partition != b.partition)\r\n'+
    '\t\t\treturn a.partition < b.partition ? -1: 1\r\n'+
    '\t\treturn 0;\r\n'+
    '\t}));\r\n'+
    `\tvar outputJSONPath = path.join("./playwright//test-results/", "characterizationSetTestOutput.json");\r\n` + 
    '\tfs.writeFile(outputJSONPath,\r\n'+
    '\t\tjsonExpr, \'utf8\'); \r\n'+
    `\t\r\n` +
    `\t//compare the output and system definition\r\n` +
    `\tconst systemDefinitionJSONPath = path.join("./PlayWright/test-results/", "characterizationSet.json");\r\n` +
    `\tconst systemConfigHash = calculateFileHashSHA256(systemDefinitionJSONPath);\r\n` +
    `\tconst testOutputHash = calculateFileHashSHA256(outputJSONPath);\r\n` +
    `\tconsole.log(\`Final Check: \${systemConfigHash===testOutputHash? 'FSMs Match! Yay':'Does not match... boo'}\`);\r\n` +
    '}); \r\n \r\n' +
 testCode.join('\r\n\r\n'), 'utf8')

//generate specification FSM
let startState: characterization_0_EquivalenceEntry[] = [];
generateSpecificationFSM(efsmForTestGeneration, 0, startState, "", "s_0", "");
//generate characterization set
const ssorted = specFSMCodeSets.sort((a,b) => {
    if(a.partition != b.partition)
        return a.partition < b.partition ? -1: 1
    return 0;
});
const jsonExpr = JSON.stringify(specFSMCodeSets);
await fs.writeFile(path.join("../test-results/", "characterizationSet.json"),
    jsonExpr,
     'utf8');