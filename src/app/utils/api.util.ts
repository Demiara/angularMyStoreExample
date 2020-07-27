import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> => {
    return combineLatest([first$, second$]).pipe(
        map(([, b]: [T, R]): R => b),
        distinctUntilChanged(),
    );
};

export const handleError = <T>(operation = 'operation', result?: T) => {
    return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
};
