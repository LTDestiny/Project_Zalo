/**
 * Custom hook to detect clicks outside an element
 */

import { useEffect, RefObject } from "react";

/**
 * Hook that triggers callback when clicking outside the ref element
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
