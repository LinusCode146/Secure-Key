import { ReactElement, useState } from "react";

type UseMultistepFormReturn = {
    currentStepIndex: number;
    step: ReactElement;
    steps: ReactElement[];
    isFirstStep: boolean;
    isLastStep: boolean;
    goTo: (index: number) => void;
    next: () => void;
    back: () => void;
};

export function useMultistepForm(steps: ReactElement[]): UseMultistepFormReturn {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const maxIndex = steps.length - 1;

    const next = () => {
        setCurrentStepIndex((i) => Math.min(i + 1, maxIndex));
    };

    const back = () => {
        setCurrentStepIndex((i) => Math.max(i - 1, 0));
    };

    const goTo = (index: number) => {
        if (index >= 0 && index <= maxIndex) {
            setCurrentStepIndex(index);
        }
    };

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === maxIndex,
        goTo,
        next,
        back,
    };
}
