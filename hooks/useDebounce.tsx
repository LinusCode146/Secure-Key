import {useEffect, DependencyList} from "react";
import useTimeout from "./useTimeout";

type CallbackFunction = () => void;

/*

Used most often in input fields, it triggers after the input wasn't changed for {delay} milliseconds so you don't
constantly keep on updating some large data with every keystroke

 */

export default function useDebounce<T extends CallbackFunction>(
    callback: T,
    delay: number,
    dependencies: DependencyList
): void {
    const {reset, clear} = useTimeout(callback, delay);

    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
}
