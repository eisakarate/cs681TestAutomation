import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs/promises'; // Use the promises API
import * as path from 'path';

//Generates test cases based on specified JSON
//Structure:
//  stateOrdinal: to ensure that questions are run in order
//  callingState: origin state
//  transitionValues: values that origin state use to transition to the next state
//  nextState: state to transition to via the transition value, i.e., next question
//  expectedNextStateControlStates: expected state of the target state (enabled or disabled)

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
};

//characterization set
interface characterizationEntry{
    stateOrdinal: number,
    callingState: string,
    transitionValue: string,
    nextStates: characterizationEntry[]
}

function cartesianProduct<X, Y>(arr1: X[], arr2: Y[]): Array<[X, Y]> {
  return arr1.flatMap(item1 => 
    arr2.map(item2 => [item1, item2] as [X, Y])
  );
}

function generateStates(efsm: outputFSMEntry[], curOrdinal: number): characterizationEntry[]
{

    var ret: characterizationEntry[] = [];

    //get the current state
    var curState :outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === curOrdinal);
    if(curState)
    {
        const currentState = curState;
        var nextStateIndex = curOrdinal + 1;
        //get the next state information
        var nextState:outputFSMEntry | undefined = efsm.find(x => x.stateOrdinal === nextStateIndex);

        if(nextState)
        {
            //get the next states list, then add to the current list
            const nextStates = generateStates(efsm, nextStateIndex);
            //add entries, no next states
            curState.transitionValues.forEach((x, index) => {
                ret.push(
                    {
                        stateOrdinal: currentState.stateOrdinal,
                        callingState: currentState.callingState,
                        transitionValue: x,
                        nextStates: nextStates,
                    }
                );
            });
        }
        else
        {
            //add entries, no next states
            curState.transitionValues.forEach((x, index) => {
                ret.push(
                    {
                        stateOrdinal: currentState.stateOrdinal,
                        callingState: currentState.callingState,
                        transitionValue: x,
                        nextStates: [],
                    }
                );
            });
        }

        return ret;
    }

    return [];
}


test('test', async ({ page }) => {
    const efsmForTestGeneration: outputFSMEntry[] = [
        
        {stateOrdinal: 0, 
            callingState: '!', 
            transitionValues: ["#"], 
            nextState: "LastName", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "#", enabled: true}
            ] },
        {stateOrdinal: 1, 
            callingState: 'LastName', 
            transitionValues: ["%"], 
            nextState: "FirstName", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "%", enabled: true}
            ] },
        {stateOrdinal: 2, 
            callingState: 'FirstName', 
            transitionValues: ["%"], 
            nextState: "MiddleInitial", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "%", enabled: true}
            ] },
        {stateOrdinal: 3, 
            callingState: 'MiddleInitial', 
            transitionValues: ["A"], 
            nextState: "Today", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "A", enabled: true}
            ] },
        {stateOrdinal: 4, 
            callingState: 'Today', 
            transitionValues: ["2025-11-05"], 
            nextState: "DoB", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "2025-11-05", enabled: true}
            ] },
        {stateOrdinal: 5, 
            callingState: 'DoB', 
            transitionValues: ["2025-11-05"], 
            nextState: "Age", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "2025-11-05", enabled: true}
            ] },
        {stateOrdinal: 6, 
            callingState: 'Age', 
            transitionValues: ["\d"], 
            nextState: "Age", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "\d", enabled: true}
            ] },
        {stateOrdinal: 7, 
            callingState: 'Gender', 
            transitionValues: ["M", "F"], 
            nextState: "Pregnancy", 
            expectedNextStateControlStates: 
            [
                {callerTransitionValue: "M", enabled: false},
                {callerTransitionValue: "F", enabled: true}
            ] },
        {stateOrdinal: 8, 
            callingState: 'Pregnancy', 
            transitionValues: ["Y", "N", "U"], 
            nextState: "#", 
            expectedNextStateControlStates: 
            [
            ] },
    ];

    //generate specification (characterization set) FSM
    const fsm = generateStates(efsmForTestGeneration, 0);
    const outputJSON = JSON.stringify(fsm);

    var outputPath:string = path.join("PlayWright//test-results/", "characterizationSet.json");
    //
    await fs.writeFile(outputPath, outputJSON, 'utf8')
});