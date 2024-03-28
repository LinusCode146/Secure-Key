import { useEffect, useState, RefObject } from "react";

function useOnScreen(ref: RefObject<HTMLElement>, rootMargin = "0px"): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin }
        );

        observer.observe(ref.current);

        return () => {
            if (!ref.current) return;
            observer.unobserve(ref.current);
        };
    }, [ref, rootMargin]);

    return isVisible;
}

export default useOnScreen;
