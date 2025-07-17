export type CacheEntry<T> = {
    createdAt: number,
    val: T,
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: URL, val: T): void {
        this.#cache.set(key.toString(), { createdAt: Date.now(), val });
    }

    get<T>(key: URL): T | undefined {
        return this.#cache.get(key.toString())?.val;
    }

    #reap(): void {
        for (const [key, obj] of this.#cache) {
            if ( Date.now() - this.#interval > obj.createdAt ) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => {this.#reap();}, this.#interval);
    }

    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

}