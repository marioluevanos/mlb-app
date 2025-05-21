import { useCallback, useEffect, useRef } from 'react';
import type { BaseSyntheticEvent } from 'react';

type OutsideClickCallback = (event: BaseSyntheticEvent | MouseEvent) => void;

/**
 * Handle event when clicking ouside of a specific UI context.
 */
export function useOutsideClick<T extends HTMLElement>(
  callback: OutsideClickCallback,
) {
  const elementRef = useRef<T | null>(null);
  /**
   * Catch-all document click, invoke callback.
   */
  const onDocumentClick = useCallback(
    (event: BaseSyntheticEvent | MouseEvent) => {
      if (!elementRef.current?.contains(event.target)) {
        callback(event);
      }
    },
    [callback],
  );
  /**
   * Add event handlers after mounting.
   */
  useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [onDocumentClick]);
  return elementRef;
}
