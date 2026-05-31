import {ResolvedState} from "./state";
import {JSONNode} from "../json/node";
import {ReactNode} from "react";

export * from "./state";
export * from "./tree";
export * from "./mix-ins";
export * from "./renderable";

export interface ResolvedNode<
	TJSONNode extends JSONNode,
	TState extends ResolvedState<TJSONNode> = ResolvedState<TJSONNode>
> {
	state: TState
	render: () => ReactNode
}