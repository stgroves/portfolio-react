import {RangeValue} from "../../values/range";
import {Enableable, Mode} from "../../generic";
import {JSONNode} from "../node";
import {SingleValue} from "../../mix-ins/single-value";
import {MultipleValues} from "../../mix-ins/multiple-values";

export type GenericAutoCompleteTarget = "on" | "off";

export interface Modifier<T extends string = string> extends JSONNode<T> {}

export const GeneralModifiers = {
	GenericAutoComplete: "generic-autocomplete",
	Required: "required",
	Snap: "snap",
	Placeholder: "placeholder",
	Multiple: "multiple",
	Options: "options",
	Range: "range",
	ReadOnly: "readonly",
	Disabled: "disabled",
	Tooltip: "tooltip"
} as const;

export interface RequiredModifier extends Modifier<typeof GeneralModifiers.Required>, Enableable {}
export interface PlaceholderModifier extends SingleValue<string>, Modifier<typeof GeneralModifiers.Placeholder> {}
export interface MultipleModifier extends Modifier<typeof GeneralModifiers.Multiple>, Enableable {}
export interface SnapModifier extends MultipleValues<number>, Modifier<typeof GeneralModifiers.Snap> {}
export interface GenericAutoCompleteModifier
	extends Mode<GenericAutoCompleteTarget>, Modifier<typeof GeneralModifiers.GenericAutoComplete> {}
export interface OptionsModifier<TOption> extends Modifier<typeof GeneralModifiers.Options> {
	options: TOption[];
}
export interface RangeModifier<TValue extends RangeValue<any>> extends Modifier<typeof GeneralModifiers.Range> {
	range: TValue;
}
export interface ReadOnlyModifier extends Modifier<typeof GeneralModifiers.ReadOnly>, Enableable {}
export interface DisabledModifier extends Modifier<typeof GeneralModifiers.Disabled>, Enableable {}
export interface TooltipModifier extends Modifier<typeof GeneralModifiers.Tooltip>, SingleValue<string> {}