import {GeneralModifiers} from "../../../interfaces/json/modifiers/general-modifiers";
import {ElementRegistryItem, RegistryManagementItem} from "../../../interfaces/registries";
import {TextInputRegistryItem} from "./text-input";
import {LabelRegistryItem} from "./label";
import {Registry} from "../../../classes/registry";
import {ElementTypes} from "./types";
import {throwInitializationError} from "../../../classes/registry-manager";

const { Options, Snap, Required, GenericAutoComplete, Placeholder, Range, Multiple, ReadOnly, Disabled } = GeneralModifiers;

/*export const ModifierApplicability = {
	[ElementTypes.Label]: [],
	[ElementTypes.NumberInput]:
		NumberModifierTypes | typeof Required | typeof Placeholder |
		typeof Range | typeof Snap | typeof GenericAutoComplete;
	[ElementTypes.Checkbox]: typeof Required;
	[ElementTypes.FileInput]: FileModifierTypes | typeof Required | typeof Placeholder | typeof Multiple;
	[ElementTypes.Select]: typeof Options | typeof Required | typeof Multiple;
	[ElementTypes.Radio]: typeof Options | typeof Required;
	[ElementTypes.Switch]: typeof Required;
	[ElementTypes.Slider]: SliderModifierTypes | typeof Range | typeof Snap;
	[ElementTypes.Slider2D]: "";
	[ElementTypes.DateInput]: DateModifierTypes | typeof Required | typeof Placeholder |
		typeof GenericAutoComplete | typeof Range;
	[ElementTypes.TimeInput]: TimeModifierTypes | typeof Required | typeof Placeholder |
		typeof GenericAutoComplete | typeof Range | typeof Snap;
	[ElementTypes.DateTimeInput]: DateTimeModifierTypes | typeof Required | typeof Placeholder |
		typeof GenericAutoComplete | typeof Range;
	[ElementTypes.ColorInput]: ColorModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.PasswordInput]: PasswordModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.TextArea]: MultilineModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.RichTextArea]: RichTextModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.SearchInput]: SearchModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.RangeSlider]: RangeModifierTypes | typeof Range;
	[ElementTypes.Tags]: TagModifierTypes | typeof Placeholder;
	[ElementTypes.PhoneInput]: PhoneModifierTypes | typeof Required | typeof Placeholder;
	[ElementTypes.EmailInput]: EmailModifierTypes | typeof Required | typeof Placeholder;
}*/

let instance: Registry<string, ElementRegistryItem<any, any>> | undefined;

export function isElement(type: string): boolean {
	return ElementRegistry.current.has(type);
}

export const ElementRegistry = {
	get current(): Registry<string, ElementRegistryItem<any, any>> {
		if (!instance)
			throwInitializationError("ElementRegistry");

		return instance!;
	}
};

export const ElementRegistryManagementItem: RegistryManagementItem = {
	initialize(): Registry<string, ElementRegistryItem<any, any>> {
		instance = new Registry();

		instance.add(ElementTypes.TextInput, TextInputRegistryItem, true);
		instance.add(ElementTypes.Label, LabelRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}

/*[
	[
		ElementTypes.NumberInput,
		{
				applicableModifiers: [
				...Object.values(NumberModifiers), DefaultValue, Required,
				Placeholder, Range, Snap, GenericAutoComplete
			],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.Checkbox,
		{
				applicableModifiers: [DefaultValue, Required],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.FileInput,
		{
				applicableModifiers: [...Object.values(FileModifiers), Required, Placeholder, Multiple],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.Select,
		{
				applicableModifiers: [Options, Required, DefaultValue, Multiple],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.Radio,
		{
				applicableModifiers: [Options, Required, DefaultValue],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.Switch,
		{
				applicableModifiers: [Required, DefaultValue],
				load: () => {},
				save: () => {}
		}
	],
	[
		ElementTypes.Slider,
		{
			applicableModifiers: [...Object.values(SliderModifiers), DefaultValue, Range, Snap],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.Slider2D,
		{
			applicableModifiers: [],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.DateInput,
		{
			applicableModifiers: [
				...Object.values(DateModifiers), DefaultValue, Required, Range, Placeholder, GenericAutoComplete
			],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.TimeInput,
		{
			applicableModifiers: [
			...Object.values(TimeModifiers), DefaultValue, Required,
			Range, Placeholder, Snap, GenericAutoComplete
		],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.DateTimeInput,
		{
			applicableModifiers: [
			...Object.values(DateTimeModifiers), DefaultValue, Required,
			Range, Placeholder, GenericAutoComplete
		],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.ColorInput,
		{
			applicableModifiers: [...Object.values(ColorModifiers), DefaultValue, Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.PasswordInput,
		{
			applicableModifiers: [...Object.values(PasswordModifiers), Placeholder, Required],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.TextArea,
		{
			applicableModifiers: [...Object.values(MultilineModifiers), DefaultValue, Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.RichTextArea,
		{
			applicableModifiers: [...Object.values(RichTextModifiers), DefaultValue, Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.SearchInput,
		{
			applicableModifiers: [...Object.values(SearchModifiers), Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.RangeSlider,
		{
			applicableModifiers: [...Object.values(RangeModifiers), DefaultValue, Range],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.Tags,
		{
			applicableModifiers: [...Object.values(TagModifiers), DefaultValue, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.PhoneInput,
		{
			applicableModifiers: [...Object.values(PhoneModifiers), Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	],
	[
		ElementTypes.EmailInput,
		{
			applicableModifiers: [...Object.values(EmailModifiers), Required, Placeholder],
			load: () => {},
			save: () => {}
		}
	]
]*/