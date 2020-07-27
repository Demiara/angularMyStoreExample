import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    public messages: string[] = [];

    constructor(private snackBar: MatSnackBar) {}

    public clear(): string[] {
        this.messages = [];
        return this.messages;
    }

    public log(source: string, message: string): void {
        this.add(`${source}: ${message}`);
    }

    private add(message: string): void {
        this.messages.push(message);
    }

    public openSnackBar(message: string, action: string, sec: number): void {
        this.snackBar.open(message, action, {
            duration: sec,
        });
    }
}
