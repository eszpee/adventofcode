import { readFileSync } from 'fs';
import path = require('path');

export function readInputTxt(day: string): string {
    return readFileSync(path.join(__dirname, '..', 'input', day+'.txt'), 'utf8');
}

export function readInputArray(path: string): string[] {
    return readInputTxt(path).split(/\r?\n/);
}
