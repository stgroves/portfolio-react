import {JSONNode} from "../json/node";
import {AnyComponent} from "../../features/tree-builder";
import {ResolvedNode, ResolvedState} from "./index";
import {ReactNode} from "react";

export interface RenderableResolvedNode<
	TJSONNode extends JSONNode,
	TState extends ResolvedState<TJSONNode> = ResolvedState<TJSONNode>,
> extends ResolvedNode<TJSONNode, TState> {
	template: {
		component: AnyComponent;
		render: () => ReactNode;
	};
}