import {Pattern, TextModifiers} from "./text-modifiers";
import {Modifier} from "../general-modifiers";

const { CaseTransform, MinLength, MaxLength, CharacterFilter, Trim } = TextModifiers;

export const EmailModifiers = {
	EmailPattern: "email-pattern",
	MinLength,
	MaxLength,
	CharacterFilter,
	Trim,
	CaseTransform
} as const;

export type EmailModifierTypes = typeof EmailModifiers[keyof typeof EmailModifiers];

export interface EmailPatternModifier extends	Modifier<typeof EmailModifiers.EmailPattern>, Pattern<"email"> {}