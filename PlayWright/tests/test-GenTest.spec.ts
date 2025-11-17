import * as fs from 'fs/promises'; // Use the promises API 
import * as path from 'path'; 
import { test, expect, Page } from '@playwright/test'; 
import {registerStartingOperation, generateSingleChartTextEntry, performEvaluationTextbox, performEvaluationRadioButton, outputLog} from "../Test.Framework/prototype" 
import {characterization_0_EquivalenceEntry, characterization_K_Equivalence} from '../Test.Framework/generateTests' 

test.beforeAll(async()=>{
		globalThis.EFSM_Outputs = []; //instantiate the output structure
});
test.afterAll(async()=>{
	//order 
	//generate outputs 
	const jsonExpr = JSON.stringify(globalThis.EFSM_Outputs.sort((a,b) => {
		if(a.partition != b.partition)
			return a.partition < b.partition ? -1: 1
		return 0;
	}));
	fs.writeFile(path.join("./playwright//test-results/", "characterizationSetTestOutput.json"),
		jsonExpr,
		 'utf8')
}); 
 
test('test__#_%_%_A_2025-11-05_2025-11-05_d_M_Y', async({page}) => {
	let testName = '_#_%_%_A_2025-11-05_2025-11-05_d_M_Y';
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('file:///F:/Git/Me/cs690TestAutomation-main/sampleWeb/src/exampleWeb/index.html'); 
	//Skipping Question LastName - transition value specified was: #.
	//Checking Question FirstName - transition value specified was: %.
	await registerStartingOperation(testName, 0, "!", "#", "A", outputFSM);
	
	await performEvaluationTextbox(testName, page, 1, "!", "LastName", "#", "%", true,outputFSM);
	//Checking Question MiddleInitial - transition value specified was: %.
	await performEvaluationTextbox(testName, page, 2, "LastName", "FirstName", "%", "%", true,outputFSM);
	//Checking Question Today - transition value specified was: A.
	await performEvaluationTextbox(testName, page, 3, "FirstName", "MiddleInitial", "%", "A", true,outputFSM);
	//Checking Question DoB - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 4, "MiddleInitial", "Today", "A", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: 2025-11-05.
	await performEvaluationTextbox(testName, page, 5, "Today", "DoB", "2025-11-05", "2025-11-05", true,outputFSM);
	//Checking Question Age - transition value specified was: d.
	await performEvaluationTextbox(testName, page, 6, "DoB", "Age", "2025-11-05", "d", true,outputFSM);
	//Checking Question Pregnancy - transition value specified was: M.
	await performEvaluationRadioButton(testName, page, 7, "Age", "Gender", "d", "M", false, outputFSM);
	//Checking Question # - transition value specified was: Y.
	await performEvaluationRadioButton(testName, page, 8, "Gender", "Pregnancy", "M", "Y", false, outputFSM);
 
	await outputLog("test__#_%_%_A_2025-11-05_2025-11-05_d_M_Y.json");
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

test('test', async ({ page }) => {
	const testName = "test";
	let outputFSM: characterization_0_EquivalenceEntry[] = [];
	await page.goto('file:///F:/Git/Me/cs690TestAutomation-main/sampleWeb/src/exampleWeb/index.html');

	var lName = await generateSingleChartTextEntry();

	await performEvaluationTextbox(testName, page, 1, "", "LastName", "$", lName, true, outputFSM);
	await performEvaluationTextbox(testName, page, 2, "LastName", "FirstName", lName, lName, true, outputFSM);
	await performEvaluationTextbox(testName, page, 3, "FirstName", "MiddleInitial", lName, lName, true, outputFSM);
	await performEvaluationTextbox(testName, page, 4, "MiddleInitial", "Today", lName, '2025-11-05', true, outputFSM);
	await performEvaluationTextbox(testName, page, 5, "Today", "DoB", '2025-11-05', '2025-11-05', true, outputFSM);
	await performEvaluationTextbox(testName, page, 6, "DoB", "Age", '2025-11-05', '2', true, outputFSM);

	//await page.locator('div').filter({ hasText: 'Male' }).nth(2).click();
	//await page.getByRole('radio', { name: 'Male', exact: true }).check();
	await performEvaluationRadioButton(testName, page, 7, "Age", "Gender", '2', 'F', true, outputFSM);
	//await page.locator('input[name="Gender"][value="M"]').check()

	globalThis.EFSM_Outputs.push(
		{
			partition: testName,
			fsm: outputFSM
		}
	)
});
