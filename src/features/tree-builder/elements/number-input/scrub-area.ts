import {applyLockableSet, ElementRegistryItem} from "../../../../interfaces/registries";
import {GeneralModifiers} from "../../../../interfaces/json/modifiers/general-modifiers";
import {Input, NumberFieldScrubArea} from "@base-ui/react";
import {ComponentProps, ReactNode} from "react";
import {NumberModifiers} from "../../../../interfaces/json/modifiers/numeric-modifiers";
import {JSONNumberFieldScrubAreaNode} from "../../../../interfaces/json/elements/number-field";
import {ResolvedNode} from "../../../../interfaces/resolved";
import {ModifierType} from "../../modifiers";

const { Required, Placeholder, ReadOnly, Disabled } = GeneralModifiers;

const modifierSet: ModifierType[] = [
	...Object.values(NumberModifiers),
	Required,
	Placeholder,
	ReadOnly,
	Disabled
];

export const NumberFieldScrubAreaRegistryItem:
	ElementRegistryItem<JSONNumberFieldScrubAreaNode, ResolvedNode<JSONNumberFieldScrubAreaNode>> = {
	applicableModifiers: applyLockableSet(modifierSet),
	resolve: (node: JSONNumberFieldScrubAreaNode): ResolvedNode<JSONNumberFieldScrubAreaNode> => {
		const applyProperties = (node: JSONNumberFieldScrubAreaNode): ComponentProps<typeof NumberFieldScrubArea> => {
			return { style: node.style, className: node.className };
		}

		const resolved: ResolvedNode<JSONNumberFieldScrubAreaNode> = {
			render: {
				component: Input,
				captureProperties: (): void => { resolved.properties = applyProperties(node) }
			},
			id: node.id,
			jsonNode: node,
			properties: {}
		};

		return resolved;
	},
	render(node: ResolvedNode<any>): ReactNode {
		return null;
	},
	save: () => {}
} as const;

NumberFieldScrubAreaRegistryItem.applicableModifiers.lockDefaults();