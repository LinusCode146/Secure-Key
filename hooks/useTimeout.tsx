import { useCallback, useEffect, useRef } from "react";

type TimeoutReturn = {
    reset: () => void;
    clear: () => void;
};

export default function useTimeout<T extends () => void>(
    callback: T,
    delay: number
): TimeoutReturn {
    const callbackRef = useRef<T>(callback);
    const timeoutRef = useRef<NodeJS.Timeout | null>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear };
}
