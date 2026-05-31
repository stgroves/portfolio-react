export * from "./root";
export * from "./scrub-area-cursor";
export * from "./scrub-area";
export * from "./decrement";
export * from "./increment";
export * from "./group";
export * from "./input";

export const NumberFieldTypes = {
	NumberFieldRoot: "number-field-root",
	NumberFieldScrubArea: "number-field-scrub-area",
	NumberFieldScrubAreaCursor: "number-field-scrub-area-cursor",
	NumberFieldGroup: "number-field-group",
	NumberFieldDecrement: "number-field-decrement",
	NumberFieldIncrement: "number-field-increment",
	NumberFieldInput: "number-field-input"
} as const;