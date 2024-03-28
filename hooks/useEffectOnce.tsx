import { useEffect, EffectCallback } from "react";


export default function useEffectOnce(cb: EffectCallback): void {
    useEffect(cb, []);
}
