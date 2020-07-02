import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> => {
  return combineLatest([first$, second$]).pipe(
    map(([, b]: [T, R]): R => b),
    distinctUntilChanged(),
  );
};
