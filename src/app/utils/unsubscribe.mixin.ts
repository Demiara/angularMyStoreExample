import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export type Constructor<A = object> = new (...input: any[]) => A;
export type AnyFunction<A = any> = (...input: any[]) => A;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export const Unsubscribe = <T extends Constructor>(Base: T) =>
    class extends Base implements OnDestroy {
        protected readonly unsubscribe$ = new Subject();

        public ngOnDestroy() {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        }
    };

export interface Unsubscribe extends Mixin<typeof Unsubscribe> {}
