import {Modifier} from "../general-modifiers";
import {TextModifiers} from "./text-modifiers";
import {Enableable} from "../../../generic";
import {SingleValue} from "../../../mix-ins/single-value";

const { CaseTransform, CharacterFilter, Regex, MaxLength, Trim, MinLength } = TextModifiers;

export const TagModifiers = {
	MinItems: "min-items",
	MaxItems: "max-items",
	UniqueItems: "unique-items",
	CaseTransform,
	CharacterFilter,
	Regex,
	MaxLength,
	MinLength,
	Trim
} as const;

export type TagModifierTypes = typeof TagModifiers[keyof typeof TagModifiers];

export interface MinItemsModifier extends Modifier<typeof TagModifiers.MinItems>, SingleValue<number> {}
export interface MaxItemsModifier extends Modifier<typeof TagModifiers.MaxItems>, SingleValue<number> {}
export interface UniqueItemsModifier extends Modifier<typeof TagModifiers.UniqueItems>, Enableable {}