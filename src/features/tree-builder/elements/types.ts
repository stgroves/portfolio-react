import {CheckboxTypes} from "../../../interfaces/json/elements/checkbox";
import {NumberFieldTypes} from "../../../interfaces/json/elements/number-field";

export const ElementTypes = {
	Label: "label",
	TextInput: "text-input",
	...NumberFieldTypes,
	...CheckboxTypes,
	FileInput: "file-input",
	Select: "select",
	Radio: "radio",
	Switch: "switch",
	Slider: "slider",
	Slider2D: "slider-2d",
	DateInput: "date-input",
	TimeInput: "time-input",
	DateTimeInput: "datetime-input",
	ColorInput: "color-input",
	PasswordInput: "password-input",
	TextArea: "text-types-area",
	RichTextArea: "rich-text-types-area",
	SearchInput: "search-input",
	PhoneInput: "phone-input",
	EmailInput: "email-input",
	RangeSlider: "range-slider",
	Tags: "tags"
} as const;