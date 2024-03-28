import { useEffect, useRef, EffectCallback, DependencyList } from "react";

/*
Just like useEffect, though it doesn't trigger on load, only when the dependencies change
 */
function useUpdateEffect(callback: EffectCallback, dependencies: DependencyList): void {
    const firstRenderRef = useRef<boolean>(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
}

export default useUpdateEffect;
