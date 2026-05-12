import type { CacheEntry } from "../interfaces/CacheEntry";

export class CacheManager {
    private static cache = new Map<string, CacheEntry<any>>();

    static async getOrSet<T>(
        key: string,
        fetchFunction: () => Promise<T>,
        ttlMinutes: number,
        shouldCache?: (data: T) => boolean,
    ): Promise<T> {
        const now = Date.now();
        const cacheEntry = this.cache.get(key);

        if (cacheEntry && now - cacheEntry.timestamp < ttlMinutes * 60 * 1000) {
            return cacheEntry.data as T;
        }
        const freshData = await fetchFunction();

        if (!shouldCache || shouldCache(freshData)) {
            this.cache.set(key, {
                data: freshData,
                timestamp: now,
            });
        }

        return freshData;
    }

    static clear(key?: string): void {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }
}
