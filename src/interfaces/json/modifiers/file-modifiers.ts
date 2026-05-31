import {Modifier} from "./general-modifiers";
import {Enableable} from "../../generic";
import {MultipleValues} from "../../mix-ins/multiple-values";

export const FileModifiers = {
	TypeLimiter: "type-limiter",
	MaxFileSize: "max-file-size",
	DirectoryMode: "directory-mode"
} as const;

export type FileModifierTypes = typeof FileModifiers[keyof typeof FileModifiers];

export interface TypeLimiterModifier extends Modifier<typeof FileModifiers.TypeLimiter>, MultipleValues<string> {}
export interface MaxFileSizeModifier extends Modifier<typeof FileModifiers.MaxFileSize> {
	bytes: number;
}
export interface DirectoryModeModifier extends Enableable, Modifier<typeof FileModifiers.DirectoryMode> {}