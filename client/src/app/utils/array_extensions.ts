// array-extensions.ts
import { Subscription } from 'rxjs';
export { }
declare module 'rxjs' {
    interface Subscription {
        unsubscribeAll(): void;
    }
}

Subscription.prototype.unsubscribeAll = function () {
    this.unsubscribe();
};
