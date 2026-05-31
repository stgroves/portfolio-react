import {Modifier} from "../general-modifiers";
import {Pattern, TextModifiers} from "./text-modifiers";
import {Enableable, Mode} from "../../../generic";

export type PasswordPatternPreset =
	"strong-password" |
	"medium-password" |
	"pin" |
	"alphanumeric" |
	"no-special-chars";

export type PasswordStrengthAlgorithm = "entropy" | "zxcvbn" | "custom";
export type PasswordAutoCompleteTarget = "current-password" | "new-password" | "one-time-code";

export const PasswordModifiers = {
	...TextModifiers,
	PasswordPattern: "password-pattern",
	PasswordAutoComplete: "password-autocomplete",
	RevealToggle: "reveal-toggle",
	PasswordStrengthMeter: "password-strength-meter"
} as const;

export type PasswordModifierTypes = typeof PasswordModifiers[keyof typeof PasswordModifiers];

export interface PasswordPatternModifier
	extends Pattern<PasswordPatternPreset>, Modifier<typeof PasswordModifiers.PasswordPattern> {}
export interface PasswordAutoCompleteModifier
	extends	Mode<"off" | PasswordAutoCompleteTarget>, Modifier<typeof PasswordModifiers.PasswordAutoComplete> {}
export interface RevealToggleModifier extends Enableable, Modifier<typeof PasswordModifiers.RevealToggle> {}
export interface PasswordStrengthMeterModifier extends Modifier<typeof PasswordModifiers.PasswordStrengthMeter> {
	algorithm: PasswordStrengthAlgorithm;
}