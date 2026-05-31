import {Modifier} from "../general-modifiers";
import {TextModifiers} from "./text-modifiers";
import {Enableable, Mode} from "../../../generic";
import {SingleValue} from "../../../mix-ins/single-value";

export type WhitespaceMode = "preserve" | "collapse" | "normalize";
export type TrimMode =
	"none" |
	"trim-start" |
	"trim-end" |
	"trim-lines" |
	"trim-empty-lines" |
	"trim-all";

export const MultilineModifiers = {
	...TextModifiers,
	MaxLines: "max-lines",
	AllowNewlines: "allow-newlines",
	Whitespace: "whitespace",
	TrimArea: "trim-area"
} as const;

export type MultilineModifierTypes = typeof MultilineModifiers[keyof typeof MultilineModifiers];

export interface MaxLinesModifier extends SingleValue<number>, Modifier<typeof MultilineModifiers.MaxLines> {}
export interface AllowNewlinesModifier extends Modifier<typeof MultilineModifiers.AllowNewlines>, Enableable {}
export interface WhitespaceModifier extends Mode<WhitespaceMode>, Modifier<typeof MultilineModifiers.Whitespace> {}
export interface TrimAreaModifier extends Mode<TrimMode>, Modifier<typeof MultilineModifiers.TrimArea> {}