import { readFileSync } from 'fs';

export function readInputTxt(path: string): string {
    return readFileSync(path, 'utf8');
}

export function readInputArray(path: string): string[] {
    return readInputTxt(path).split(/\r?\n/);
}
