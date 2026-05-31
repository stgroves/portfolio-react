import {ComparableRegistryItem} from "../../../../interfaces/registries";
import {EqualOrderMixin} from "../../../../interfaces/registries/mix-ins";

export const BooleanComparableRegistryItem: ComparableRegistryItem & EqualOrderMixin<boolean> = {
	"<"(a: boolean, b: boolean): boolean {
		return Number(a) < Number(b);
	},
	"<="(a: boolean, b: boolean): boolean {
		return Number(a) <= Number(b);
	},
	">"(a: boolean, b: boolean): boolean {
		return Number(a) > Number(b);
	},
	">="(a: boolean, b: boolean): boolean {
		return Number(a) >= Number(b);
	},
	"!="(a: boolean, b: boolean): boolean {
		return a !== b;
	},
	"=="(a: boolean, b: boolean): boolean {
		return a === b;
	}
} as const;