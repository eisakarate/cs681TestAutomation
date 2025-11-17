import { test, expect, Page } from '@playwright/test';
import {characterization_0_EquivalenceEntry, characterization_K_Equivalence} from './generateTests.ts'
//npx playwright install
//npm install --save-dev @types/node
import * as crypto from 'crypto'; //for hashing
import * as fs from 'fs'; // Use the promises API
import * as path from 'path';

export async function generateSingleChartTextEntry(): Promise<string>{
    return "a"
}

export async function outputLog(outputFileName: string): Promise<void>
{
    //get output
    const outputJSON: string = JSON.stringify(globalThis.EFSM_Outputs.sort((a, b) =>{
        if(a.stateOrdinal != b.stateOrdinal)
            return a.stateOrdinal - b.stateOrdinal;
        //sort by calling state
        if(a.callingState != b.callingState)
            return a.callingState.localeCompare(b.callingState);

        //sort by target state
        if(a.targetState != b.targetState)
            return a.targetState.localeCompare(b.targetState);

        //sort by transition value
        if(a.transitionValue)
          if(b.transitionValue)
            return a.transitionValue.localeCompare(b.transitionValue);
        return 0;
    }) , null, 2);
        
    var outputPath:string = path.join("./PlayWright/test-results/", outputFileName);
    //
    await fs.writeFileSync(outputPath, outputJSON, 'utf8')
}
export async function registerStartingOperation(testName: string, ordinal: number, callingQuestion: string, transitionValue: string, targetQuestion: string, fsm: characterization_0_EquivalenceEntry[])
{
  
  //log it 
  fsm.push(
    {
      stateOrdinal: ordinal,
      callingState: callingQuestion,
      transitionValue: transitionValue,
      nextState: targetQuestion
    }
  )
}
export async function performEvaluationTextbox(testName: string, page: Page,  ordinal: number, currentQuestion: string, nextQuestion: string, valueToSet: string, expectedControlEnabled: boolean, fsm: characterization_0_EquivalenceEntry[])
{
  //get the control
  var locatorKey = `[targetdbField = "${currentQuestion}"]`;
  var trgControl = await page.locator(locatorKey);
  
  //check state
  var currentEnabledState = await trgControl.isEditable();
  
  //set the value
  if (currentEnabledState){
    await trgControl.fill(valueToSet);
  }
  
  //log it 
  fsm.push(
    {
      stateOrdinal: ordinal,
      callingState: currentQuestion,
      transitionValue: valueToSet,
      nextState: nextQuestion
    }
  )
}

export async function performEvaluationRadioButton(testName: string, page: Page,  ordinal: number, currentQuestion: string, nextQuestion: string, valueToSet: string, expectedControlEnabled: boolean, fsm: characterization_0_EquivalenceEntry[])
{
  //get the control
  var locatorKey = `input[targetdbField = "${currentQuestion}"][value="${valueToSet}"]`;
  var trgControl = await page.locator(locatorKey);
  //check state
  var currentEnabledState = await trgControl.isEditable();

  //set the value
  if (currentEnabledState){
    await trgControl.check()
  }
  
  //log it 
  fsm.push(
    {
      stateOrdinal: ordinal,
      callingState: currentQuestion,
      transitionValue: valueToSet,
      nextState: nextQuestion
    }
  )
}

//generate hash for a given file
export function calculateFileHashSHA256(filePath: string):  string{
  const algorithm = 'sha256'
  const hash = crypto.createHash(algorithm);
  const fileCContent = fs.readFileSync(filePath); //get a stream of the target file

  //start hashing
  hash.update(fileCContent)

  const hashedStr = hash.digest('hex');
  return hashedStr;
}