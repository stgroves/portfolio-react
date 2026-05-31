import {Pattern, TextModifiers} from "./text-modifiers";
import {Modifier} from "../general-modifiers";

const { Mask, MinLength, MaxLength, CharacterFilter, Trim, Regex } = TextModifiers;

export const PhoneModifiers = {
	PhonePattern: "phone-pattern",
	Mask,
	MinLength,
	MaxLength,
	CharacterFilter,
	Trim,
	Regex
} as const;

export type PhoneModifierTypes = typeof PhoneModifiers[keyof typeof PhoneModifiers];

export interface PhonePatternModifier extends Pattern<"phone">, Modifier<typeof PhoneModifiers.PhonePattern> {}