import {ComparableRegistryItem} from "../../../../interfaces/registries";
import {EqualOrderMixin} from "../../../../interfaces/registries/mix-ins";

export const NumberComparableRegistryItem: ComparableRegistryItem & EqualOrderMixin<number> = {
	"<"(a: number, b: number): boolean {
		return a < b;
	},
	"<="(a: number, b: number): boolean {
		return a <= b;
	},
	">"(a: number, b: number): boolean {
		return a > b;
	},
	">="(a: number, b: number): boolean {
		return a >= b;
	},
	"!="(a: number, b: number): boolean {
		return a != b;
	},
	"=="(a: number, b: number): boolean {
		return a == b;
	}
} as const;