import * as fs from 'fs/promises'; // Use the promises API 
import * as path from 'path'; 
import { test, expect, Page } from '@playwright/test'; 
import { calculateFileHashSHA256, registerStartingOperation, generateSingleChartTextEntry, performEvaluationTextbox, performEvaluationRadioButton, outputLog} from "../Test.Framework/prototype" 
import { characterization_0_EquivalenceEntry, characterization_K_Equivalence} from '../Test.Framework/generateTests' 

test.beforeAll(async() =>{
		globalThis.EFSM_Outputs = []; //instantiate the output structure
});
test.afterAll(async() =>{
	//order 
	//generate outputs 
	const jsonExpr = JSON.stringify(globalThis.EFSM_Outputs.sort((a,b) => { 
		if(a.partition != b.partition)
			return a.partition < b.partition ? -1: 1
		return 0;
	}));
	var outputJSONPath = path.join("./playwright//test-results/", "characterizationSetTestOutput.json");
	fs.writeFile(outputJSONPath,
		jsonExpr, 'utf8'); 
	
	//compare the output and system definition
	const systemDefinitionJSONPath = path.join("./PlayWright/test-results/", "characterizationSet.json");
	const systemConfigHash = calculateFileHashSHA256(systemDefinitionJSONPath);
	const testOutputHash = calculateFileHashSHA256(outputJSONPath);
	console.log(`Final Check: ${systemConfigHash===testOutputHash? 'FSMs Match! Yay':'Does not match... boo'}`);
}); 
 
test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_Y';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: M.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "M", false, outputFSM);
	//Checking Question # - transition value specified was: Y.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "Y", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});

test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: M.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "M", false, outputFSM);
	//Checking Question # - transition value specified was: N.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "N", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});

test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N_U', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N_U';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: M.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "M", false, outputFSM);
	//Checking Question # - transition value specified was: U.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "U", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_Y_N_U.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});

test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: F.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "F", true, outputFSM);
	//Checking Question # - transition value specified was: Y.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "Y", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});

test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: F.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "F", true, outputFSM);
	//Checking Question # - transition value specified was: N.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "N", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});

test('test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N_U', async({page}) => {
	let testName = '_#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N_U';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('F:/GIT/Me/cs681TestAutomation/sampleWeb/src/exampleWeb/index.html'); 
	await registerStartingOperation(testName, 0, "!", "#", "LastName", outputFSM);
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 1, "LastName", "FirstName", "A", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 2, "FirstName", "MiddleInitial", "A", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "MiddleInitial", "Today", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "Today", "DoB", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "DoB", "Age", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "Age", "Age", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: F.
	await performEvaluationRadioButton(testName, page, 7, "Gender", "Pregnancy", "F", true, outputFSM);
	//Checking Question # - transition value specified was: U.
	await performEvaluationRadioButton(testName, page, 8, "Pregnancy", "#", "U", false, outputFSM);
 
	await outputLog("test__#_A_A_A_2025-11-05_2025-11-05_d_M_F_Y_N_U.json");
	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM.sort((a, b) => {
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
	)
});