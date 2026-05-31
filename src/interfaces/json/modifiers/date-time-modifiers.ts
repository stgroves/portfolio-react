import {Modifier} from "./general-modifiers";
import {Format} from "../../generic";

export const DateModifiers = {
	DateFormat: "date-format",
	DisabledDates: "disabled-dates",
	DisabledWeekdays: "disabled-weekdays",
} as const;

export const TimeModifiers = {
	TimeFormat: "time-format",
} as const;

export const DateTimeModifiers = {
	...TimeModifiers,
	...DateModifiers
} as const;

export type DateModifierTypes = typeof DateModifiers[keyof typeof DateModifiers];
export type TimeModifierTypes = typeof TimeModifiers[keyof typeof TimeModifiers];
export type DateTimeModifierTypes = typeof DateTimeModifiers[keyof typeof DateTimeModifiers];

export interface DateFormatModifier extends Modifier<typeof DateModifiers.DateFormat>, Format<string> {}
export interface DisabledDatesModifier extends Modifier<typeof DateModifiers.DisabledDates> {
	dates: Date[];
}
export interface DisabledWeekdaysModifier extends Modifier<typeof DateModifiers.DisabledWeekdays> {
	days: number[];
}
export interface TimeFormatModifier extends Modifier<typeof TimeModifiers.TimeFormat>, Format<string> {}