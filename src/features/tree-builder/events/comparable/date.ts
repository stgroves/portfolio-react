import {ComparableRegistryItem} from "../../../../interfaces/registries";
import {EqualOrderMixin} from "../../../../interfaces/registries/mix-ins";

export const DateComparableRegistryItem: ComparableRegistryItem & EqualOrderMixin<Date> = {
	"<"(a: Date, b: Date): boolean {
		return a.getTime() < b.getTime();
	},
	"<="(a: Date, b: Date): boolean {
		return a.getTime() <= b.getTime();
	},
	">"(a: Date, b: Date): boolean {
		return a.getTime() > b.getTime();
	},
	">="(a: Date, b: Date): boolean {
		return a.getTime() >= b.getTime();
	},
	"!="(a: Date, b: Date): boolean {
		return a.getTime() !== b.getTime();
	},
	"=="(a: Date, b: Date): boolean {
		return a.getTime() === b.getTime();
	}
} as const;