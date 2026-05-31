import {NumberModifiers, RangeModifiers, SliderModifiers} from "../../../interfaces/json/modifiers/numeric-modifiers";
import {GeneralModifiers} from "../../../interfaces/json/modifiers/general-modifiers";
import {TextModifiers} from "../../../interfaces/json/modifiers/text-types/text-modifiers";
import {DateModifiers, DateTimeModifiers, TimeModifiers} from "../../../interfaces/json/modifiers/date-time-modifiers";
import {ColorModifiers} from "../../../interfaces/json/modifiers/color-modifiers";
import {MultilineModifiers} from "../../../interfaces/json/modifiers/text-types/multiline-modifiers";
import {PhoneModifiers} from "../../../interfaces/json/modifiers/text-types/phone-modifiers";
import {EmailModifiers} from "../../../interfaces/json/modifiers/text-types/email-modifiers";
import {PasswordModifiers} from "../../../interfaces/json/modifiers/text-types/password-modifiers";
import {RichTextModifiers} from "../../../interfaces/json/modifiers/text-types/rich-text-modifiers";
import {SearchModifiers} from "../../../interfaces/json/modifiers/text-types/search-modifiers";
import {TagModifiers} from "../../../interfaces/json/modifiers/text-types/tags-modifiers";
import {FileModifiers} from "../../../interfaces/json/modifiers/file-modifiers";

export const ModifierTypes = {
	...GeneralModifiers,
	...TextModifiers,
	...NumberModifiers,
	...DateTimeModifiers,
	...ColorModifiers,
	...DateModifiers,
	...TimeModifiers,
	...MultilineModifiers,
	...RangeModifiers,
	...SliderModifiers,
	...PhoneModifiers,
	...EmailModifiers,
	...PasswordModifiers,
	...RichTextModifiers,
	...SearchModifiers,
	...TagModifiers,
	...FileModifiers
} as const;

export type ModifierType = typeof ModifierTypes[keyof typeof ModifierTypes];