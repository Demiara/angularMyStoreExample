import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage,
});

@Injectable({
    providedIn: 'root',
})
export class BrowserStorageService {
    constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

    public get(key: string): string {
        return this.storage.getItem(key);
    }

    public set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
