import * as crypto from 'crypto';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';

/**
 * Calculates the SHA256 hash of a file using streams.
 */
async function calculateSHA2556Hash(fsmFile: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(fsmFile);
    
    await pipeline(fileStream, hash);
    
    // use digest('hex') to get the final hash as a hexadecimal string from the stream's content.
    return hash.digest('hex');
}

/**
 * Compares two FSM files by calculating and comparing their SHA256 hashes.
 */
async function compareFilesByHash(fsmSpec: string, fsmTestOutput: string): Promise<boolean> {
    try {
        const fsmSpecHash = await calculateSHA2556Hash(fsmSpec);
        const fsmTestOutputHash = await calculateSHA2556Hash(fsmTestOutput);

        // Compare the resulting hash strings.
        return fsmSpecHash === fsmTestOutputHash;
    } catch (error) {
        console.error('FSMs are not the same:', error);
        // Depending on requirements, you might throw the error or return false.
        return false; 
    }
}

// Example usage:
const fsmSpecPath = '../test-results/test_22_copy.json';
const fsmTestOutputPah = '../test-results/test_22.json';

compareFilesByHash(fsmSpecPath, fsmTestOutputPah)
    .then(isMatch => {
        console.log(`Do the FSMs (Spec: ${fsmSpecPath}) and (Test Output:${fsmTestOutputPah}) have the same content? ${isMatch}`); // Expected: true
    });
