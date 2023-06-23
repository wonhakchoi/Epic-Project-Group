// adapted from Cosden Solutions
import { useEffect, useState } from "react";

/**
 * Debounces a value, preventing extra activations or slow functions from triggering too often
 * by returns new value only after a delay
 *
 * Useful for limiting HTTP requests in a search bar
 *
 * @param {*} value - the value to debounce
 * @param {number} delay - how many miliseconds to wait before confirming change and returning new value
 * @returns {*} the debounced value only if the delay has passed
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
