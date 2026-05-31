import {createElement, ReactNode} from "react";
import {JSONRefNode} from "../../../interfaces/json/layout/json-ref";
import {LayoutRegistryItem} from "../../../interfaces/registries";
import {ParentMixin, RenderableResolvedNode} from "../../../interfaces/resolved";
import {ResolvedRegistry} from "../resolved-registry";

type RefResolvedNode = RenderableResolvedNode<JSONRefNode> & ParentMixin;

export const RefRegistryItem: LayoutRegistryItem<JSONRefNode, RefResolvedNode> = {
	resolve(parent: any, node: JSONRefNode): RefResolvedNode {
		const wrapper = { parent };
		const resolvedNode = ResolvedRegistry.current.get(node.type);

		return new Proxy(wrapper, {
			get(target, prop) {
				if (prop === "parent")
					return target.parent;

				return resolvedNode[prop];
			},
			set(target, prop, value) {
				if (prop === "parent") {
					target.parent = value;
					return true;
				}

				resolvedNode[prop] = value;
				return true;
			},
			has(target, prop) {
				return prop === "parent" || prop in resolvedNode;
			},
			ownKeys(target) {
				return ["parent", ...Reflect.ownKeys(resolvedNode)];
			},
			getOwnPropertyDescriptor(target, prop) {
				if (prop === "parent")
					return { configurable: true, enumerable: true, value: target.parent };

				return Object.getOwnPropertyDescriptor(resolvedNode, prop);
			}
		}) as RefResolvedNode;
	},

	render(node: RefResolvedNode): ReactNode {
		node.template.captureProperties?.();
		return createElement(node.template.component, node.state.properties);
	}
} as const;