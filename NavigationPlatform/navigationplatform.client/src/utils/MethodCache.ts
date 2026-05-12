import type { ApiResult } from "../interfaces/responses/ApiResult";
import { CacheManager } from "./CacheManager";
import { extractMethodName } from "./ExtractMethodName";
import { simpleHash } from "./SimpleHash";

export function createCachedMethod<T>(
    method: () => Promise<ApiResult<T[]>>,
    ttlMinutes: number,
    options?: {
        customKey?: string;
        transformBeforeCache?: (result: ApiResult<T[]>) => ApiResult<T[]>;
    },
): () => Promise<ApiResult<T[]>> {
    const cacheKey = options?.customKey || simpleHash(extractMethodName(method));

    return async (): Promise<ApiResult<T[]>> => {
        const cachedResult = await CacheManager.getOrSet<ApiResult<T[]>>(
            cacheKey,
            async () => {
                const result = await method();

                if (options?.transformBeforeCache) {
                    return options.transformBeforeCache(result);
                }

                return result;
            },
            ttlMinutes,
            (result: ApiResult<T[]>) => result.ok === true,
        );

        return cachedResult;
    };
}

export const clearCachedMethod = <T>(method: () => Promise<ApiResult<T[]>>): void =>
    CacheManager.clear(simpleHash(extractMethodName(method)));
