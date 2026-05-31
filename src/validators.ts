
import {RangeValue} from "./interfaces/values/range";
import {isValidCssBackground} from "./utilities/css";

interface ValidationError {
	message?: string;
	source: string;
}

interface BackgroundValidationError extends ValidationError {
	background: string;
}

interface NumberValidationError extends ValidationError {
	value: number;
}

interface RangeValidationError<TValue, TRange extends RangeValue<TValue>> extends ValidationError {
	value: TValue;
	range: TRange;
}

export function validateCssBackground(
	{background, source, message = "Invalid CSS Background"}: BackgroundValidationError
) {
	if (!isValidCssBackground(background))
		throw new Error(`${source}: ${message}`);
}

export function validatePositiveNumber(
	{value, source, message = `Value must be positive`}: NumberValidationError
) {
	if (value <= 0)
		throw new Error(`${source}: ${message}`);
}

export function validateRange<TValue, TRange extends RangeValue<TValue>>(
	{value, range, source, message = "value must be within range"}: RangeValidationError<TValue, TRange>
) {
	if (!range.contains(value))
		throw new Error(`${source}: ${message}`);
}