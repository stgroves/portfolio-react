import {Operator} from "../../../../interfaces/event/operators";
import {BaseInputMixin} from "../../../../interfaces/event/mix-ins";
import {ComparableRegistry, evaluateInput} from "../index";

export * from "./index-gates";
export * from "./types";
export * from "./registry";

export function validateValue(value: any): void {
	if (typeof (value) !== "boolean")
		throw new Error(`Expected a boolean. Received: ${value}`);
}

export function getType(value: any): string {
	const t = typeof value;

	switch (t) {
		case "string":
		case "number":
		case "boolean":
		case "function":
		case "bigint":
		case "symbol":
		case "undefined":
			return t;

		case "object":
			if (value === null)
				return "null";

			// Your custom typed objects
			if (Object.hasOwn(value, "type"))
				return value.type;

			// Built‑ins
			if (value instanceof Date)
				return "date";

			if (Array.isArray(value))
				return "array";

			// Custom classes
			if (value.constructor && value.constructor.name !== "Object")
				return value.constructor.name;

			return "object";
	}
}

export function evaluateComparableOperator(operator: Operator & BaseInputMixin): boolean {
	const { inputA, inputB, type } = operator;
	const a = evaluateInput(inputA);
	const b = evaluateInput(inputB);

	const aType = getType(a);

	const entry = ComparableRegistry.current.get(aType);

	if (!Object.hasOwn(entry, type))
		throw new Error(`'${type}' has not been implemented for ${aType}`);

	const result = ComparableRegistry.current.get(aType)[type](a, b);

	validateValue(result);

	return result;
}