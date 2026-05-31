import {JSONStackNode} from "../../../interfaces/json/layout/json-stack";
import React, {createElement, ReactNode} from "react";
import {Stack, StackProps} from "../../../components/stack/Stack";
import {LayoutRegistryItem} from "../../../interfaces/registries";
import {LayoutMixin, RenderableResolvedNode} from "../../../interfaces/resolved";
import {prepareChildren} from "../index";

type StackResolvedNode = RenderableResolvedNode<JSONStackNode> & LayoutMixin;

export const StackRegistryItem: LayoutRegistryItem<JSONStackNode, StackResolvedNode> = {
	resolve(parent: any, node: JSONStackNode): StackResolvedNode {
		const applyProperties = (): StackProps => {
			const { style, className, orientation } = node;
			return { style, className, orientation };
		}

		const resolved: StackResolvedNode = {
			template: {
				component: Stack,
				captureProperties(): void { resolved.state.properties = applyProperties(); }
			},
			state: {
				id: node.id,
				jsonNode: node,
				properties: { }
			},
			children: [],
			parent,
		}

		resolved.children = prepareChildren(resolved, node);

		return resolved;
	},

	render(node: StackResolvedNode): ReactNode {
		node.template.captureProperties?.();
		return createElement(node.template.component, node.state.properties, node.children.map(child => ));
	}
} as const;