import { useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";

type StorageType = typeof window.localStorage | typeof window.sessionStorage;

type ValueOrFunction<T> = T | (() => T);

type ReturnTuple<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];

function useStorage<T>(
    key: string,
    defaultValue: ValueOrFunction<T>,
    storageObject: StorageType
): ReturnTuple<T> {
    const [value, setValue] = useState<T | undefined>(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === "function") {
            return (defaultValue as () => T)();
        } else {
            return defaultValue as T;
        }
    });

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}

export function useLocalStorage<T>(key: string, defaultValue: ValueOrFunction<T>): ReturnTuple<T> {
    return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: ValueOrFunction<T>): ReturnTuple<T> {
    return useStorage(key, defaultValue, window.sessionStorage);
}
