/**
 * @classdesc sessionStorage class for `window.sessionStorage`
 */

class Store {
    store?: Storage;

    constructor() {
        if (typeof window !== "undefined") {
            this.store = window.sessionStorage;
        }
    }

    set(key: any, value: any) {
        this.store?.setItem(key, JSON.stringify(value));
        return;
    }

    get(key: any) {
        let temp = this.store?.getItem(key);
        return temp ? JSON.parse(temp) : null;
    }

    remove(key: string) {
        return this.store?.removeItem(key);
    }

    clear() {
        this.store?.clear();
        return;
    }

    length() {
        return this.store?.length;
    }
}

const store = new Store();

export default store;
