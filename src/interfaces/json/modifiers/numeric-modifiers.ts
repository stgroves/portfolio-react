import {Modifier} from "./general-modifiers";
import {Enableable, Mode} from "../../generic";
import {SingleValue} from "../../mix-ins/single-value";
import {MultipleValues} from "../../mix-ins/multiple-values";

export type ClampType = "clamp" | "reject" | "snap";
export type RoundingType = "floor" | "ceil" | "round" | "truncate";

export const RangeModifiers = {
	PrecisionLimit: "precision-limit",
	Step: "step"
} as const;

export const SliderModifiers = {
	...RangeModifiers,
	RoundingMode: "rounding-mode",
	Unit: "unit"
} as const;

export const NumberModifiers = {
	...SliderModifiers,
	IntegerOnly: "integer-only",
	Clamp: "clamp",
	Scale: "scale",
	DisallowValues: "disallow-values",
	ScientificNotation: "scientific-notation",
} as const;

export type RangeModifierTypes = typeof RangeModifiers[keyof typeof RangeModifiers];
export type SliderModifierTypes = typeof SliderModifiers[keyof typeof SliderModifiers];
export type NumberModifierTypes = typeof NumberModifiers[keyof typeof NumberModifiers];

export interface IntegerOnlyModifier extends Modifier<typeof NumberModifiers.IntegerOnly> {}
export interface PrecisionLimitModifier extends Modifier<typeof NumberModifiers.PrecisionLimit> {
	fractionalLimit: number;
}
export interface ClampModifier extends Modifier<typeof NumberModifiers.Clamp>, Mode<ClampType> {}
export interface RoundingModeModifier extends Modifier<typeof NumberModifiers.RoundingMode>, Mode<RoundingType> {}
export interface UnitModifier extends Modifier<typeof NumberModifiers.Unit> {
	unit: string; // e.g. "kg", "%", "px"
	position?: "prefix" | "suffix";
}
export interface ScaleModifier extends Modifier<typeof NumberModifiers.Scale> {
	multiply: number;
	divide?: number;
}
export interface DisallowValuesModifier
	extends Modifier<typeof NumberModifiers.DisallowValues>, MultipleValues<number> {}
export interface ScientificNotationModifier extends Modifier<typeof NumberModifiers.ScientificNotation>, Enableable {}
export interface StepModifier extends Modifier<typeof NumberModifiers.Step>, SingleValue<number> {}