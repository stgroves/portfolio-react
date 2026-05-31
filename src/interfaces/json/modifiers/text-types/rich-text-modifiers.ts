import {Modifier} from "../general-modifiers";
import {MultilineModifiers} from "./multiline-modifiers";
import {Enableable} from "../../../generic";
import {MultipleValues} from "../../../mix-ins/multiple-values";

export const RichTextModifiers = {
	...MultilineModifiers,
	AllowFormatting: "allow-formatting",
	AllowedTags: "allowed-tags",
	DisallowedTags: "disallowed-tags",
	SanitizeHTML: "sanitize-html",
	BlockListWords: "block-list",
	AllowedStyles: "allowed-styles",
	AllowedAttributes: "allowed-attributes"
} as const;

export type RichTextModifierTypes = typeof RichTextModifiers[keyof typeof RichTextModifiers];

export interface AllowFormattingModifier extends Enableable, Modifier<typeof RichTextModifiers.AllowFormatting> {}
export interface AllowedTagsModifier extends MultipleValues<string>, Modifier<typeof RichTextModifiers.AllowedTags> {}
export interface DisallowedTagsModifier
	extends MultipleValues<string>, Modifier<typeof RichTextModifiers.DisallowedTags> {}
export interface SanitizeHTMLModifier extends Enableable, Modifier<typeof RichTextModifiers.SanitizeHTML> {}
export interface BlockListWordsModifier
	extends MultipleValues<string>, Modifier<typeof RichTextModifiers.BlockListWords> {}
export interface AllowedStylesModifier
	extends MultipleValues<string>, Modifier<typeof RichTextModifiers.AllowedStyles> {}
export interface AllowedAttributesModifier
	extends MultipleValues<string>, Modifier<typeof RichTextModifiers.AllowedAttributes> {}