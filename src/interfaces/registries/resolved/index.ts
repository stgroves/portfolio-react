import {JSONNode} from "../../json/node";
import {ResolvedNode} from "../../resolved";

export * from "./layout-registry-item";
export * from "./element-registry-item";

export interface ResolvedRegistryItem<TNodeType extends JSONNode, TReturn extends ResolvedNode<TNodeType>> {
	resolve(parent: any, node: TNodeType): TReturn;
}
