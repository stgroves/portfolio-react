import {
	applyLockableSet,
	ElementRegistryItem
} from "../../../../interfaces/registries";
import {GeneralModifiers} from "../../../../interfaces/json/modifiers/general-modifiers";
import {Input, NumberFieldRoot} from "@base-ui/react";
import {UIState} from "../../../../App";
import {ComponentProps, ReactNode} from "react";
import {NumberModifiers} from "../../../../interfaces/json/modifiers/numeric-modifiers";
import {JSONNumberFieldRootNode} from "../../../../interfaces/json/elements/number-field";
import {applyModifiers} from "../index";
import {ModifierType} from "../../modifiers";
import {ResolvedNode} from "../../../../interfaces/resolved";

import {SingleValue} from "../../../../interfaces/mix-ins/single-value";

const { Required, Placeholder, ReadOnly, Disabled } = GeneralModifiers;

const modifierSet: ModifierType[] = [
	...Object.values(NumberModifiers),
	Required,
	Placeholder,
	ReadOnly,
	Disabled
];

export const NumberFieldRootRegistryItem:
	ElementRegistryItem<JSONNumberFieldRootNode, ResolvedNode<JSONNumberFieldRootNode> & SingleValue<number|null>> = {
	applicableModifiers: applyLockableSet(modifierSet),
	resolve: (node: JSONNumberFieldRootNode): ResolvedNode<JSONNumberFieldRootNode> & SingleValue<number|null> => {
		const applyProperties = (node: JSONNumberFieldRootNode): ComponentProps<typeof NumberFieldRoot> => {
			let properties: NumberFieldRoot.Props = {
				value: resolved.value,
				onValueChange(newValue: number|null): void {
					resolved.value = newValue;
					UIState.rerender();
				}
			};

			properties = applyModifiers(node, properties, NumberFieldRootRegistryItem.applicableModifiers);

			return properties;
		}

		const resolved: ResolvedNode<JSONNumberFieldRootNode> & SingleValue<number|null> = {
			render: {
				component: Input,
				captureProperties: (): void => {	resolved.properties = applyProperties(node) }
			},
			id: node.id,
			jsonNode: node,
			value: node.value,
			properties: {}
		};

		return resolved;
	},
	render(node: ResolvedNode<JSONNumberFieldRootNode> & SingleValue<number|null>): ReactNode {
		return null;
	},
	save: () => {}
} as const;

NumberFieldRootRegistryItem.applicableModifiers.lockDefaults();