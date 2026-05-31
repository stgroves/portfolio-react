import {GenericAutoCompleteTarget, Modifier} from "../general-modifiers";
import {TextModifiers} from "./text-modifiers";
import {Mode} from "../../../generic";

const { MinLength, MaxLength, Trim, CaseTransform, CharacterFilter, Regex } = TextModifiers;

export const SearchModifiers = {
	SearchAutoComplete: "search-autocomplete",
	MinLength,
	MaxLength,
	Trim,
	CaseTransform,
	CharacterFilter,
	Regex
} as const;

export type SearchModifierTypes = typeof SearchModifiers[keyof typeof SearchModifiers];

export interface SearchAutoCompleteModifier
	extends Mode<GenericAutoCompleteTarget | "search">, Modifier<typeof SearchModifiers.SearchAutoComplete> {}