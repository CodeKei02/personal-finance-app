import { RefObject, useEffect } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, onClickOutside]);
}