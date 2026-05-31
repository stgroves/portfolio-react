import {ComparableRegistryItem} from "../../../../interfaces/registries";
import {EqualMixin} from "../../../../interfaces/registries/mix-ins";

export const StringComparableRegistryItem: ComparableRegistryItem & EqualMixin<string> = {
	"!="(a: string, b: string): boolean {
		return a !== b;
	},
	"=="(a: string, b: string): boolean {
		return a === b;
	}
} as const;