import {GenericAutoCompleteTarget, Modifier} from "../general-modifiers";
import {Mode} from "../../../generic";
import {SingleValue} from "../../../mix-ins/single-value";

export type TextPatternPreset = "email" | "url" | "postcode" | "phone" | "slug";
export type CaseTransformType = "lower" | "upper" | "title" | "sentence";
export type TrimType = "start" | "end" | "both";
export type TextAutoCompleteTargets =
	| "name" | "given-name" | "family-name" | "nickname"
	| "email" | "tel" | "username"
	| "street-address" | "address-line1" | "address-line2" | "postal-code" | "country" | "country-name"
	| "organization" | "organization-title"
	| "url" | "language" | "bday" | "sex";

export const TextModifiers = {
	MaxLength: "max-length",
	MinLength: "min-length",
	Regex: "regex",
	CharacterFilter: "character-filter",
	Trim: "trim",
	CaseTransform: "case-transform",
	TextPattern: "text-types-pattern",
	Mask: "mask",
	TextAutoComplete: "text-types-autocomplete",
	Size: "size"
} as const;

export type TextModifierTypes = typeof TextModifiers[keyof typeof TextModifiers];

export interface Pattern<TPatternPresetEnum> {
	preset: TPatternPresetEnum
}

export interface MaxLengthModifier extends SingleValue<number>, Modifier<typeof TextModifiers.MaxLength> {}
export interface MinLengthModifier extends SingleValue<number>, Modifier<typeof TextModifiers.MinLength> {}
export interface TrimModifier extends Mode<TrimType>, Modifier<typeof TextModifiers.Trim> {}
export interface CaseTransformModifier extends Mode<CaseTransformType>, Modifier<typeof TextModifiers.CaseTransform> {}
export interface TextPatternModifier extends Pattern<TextPatternPreset>, Modifier<typeof TextModifiers.TextPattern> {}
export interface TextAutoCompleteModifier
	extends Mode<GenericAutoCompleteTarget | TextAutoCompleteTargets>, Modifier<typeof TextModifiers.TextAutoComplete> {}
export interface RegexModifier extends Modifier<typeof TextModifiers.Regex> {
	pattern: string;
	flags?: string; // optional: e.g. "i", "g"
}
export interface CharacterFilterModifier extends Modifier<typeof TextModifiers.CharacterFilter> {
	allow?: string[];
	disallow?: string[];
	allowRanges?: [number, number][];
	disallowRanges?: [number, number][];
}
export interface MaskModifier extends Modifier<typeof TextModifiers.Mask> {
	mask: string; // e.g. "(999) 999-9999"
}
export interface SizeModifier extends Modifier<typeof TextModifiers.Size>, SingleValue<number> {}