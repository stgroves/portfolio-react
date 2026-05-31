import {RefObject, useCallback, useRef, useState} from "react";

export const useControlledState = <T>(
	controlledValue: T | undefined,
	defaultValue: T,
	onChange?: (value: T) => void
): readonly [T, (next: T | ((prev: T) => T)) => void] => {
	const isControlled: boolean = controlledValue !== undefined;

	const [internal, setInternal] = useState<T>(defaultValue);

	const value: T = isControlled ? controlledValue! : internal;

	const setValue: (next: T | ((prev: T) => T)) => void =
		useCallback(
			(next: T | ((prev: T) => T)): void => {
				const resolved: T = typeof next === "function" ? (next as (prev: T) => T)(value) : next;

				if (!isControlled)
					setInternal(resolved);

				onChange?.(resolved);
			},
			[isControlled, value, onChange]
		);

	return [value, setValue] as const;
};

export function useControlledStateWithRef<T>(
	controlledValue: T | undefined,
	defaultValue: T,
	onChange?: (value: T) => void
): readonly[T, (next: T) => void, RefObject<T>] {
	const [value, setValue] = useControlledState(controlledValue, defaultValue, onChange);

	const valueRef: RefObject<T> = useRef(value);
	valueRef.current = value;

	return [value, setValue, valueRef] as const;
}