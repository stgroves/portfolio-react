import {JSONNode} from "../../json/node";
import {ResolvedRegistryItem} from "./index";
import {ParentMixin, ResolvedNode} from "../../resolved";

export interface LayoutRegistryItem<TLayoutNode extends JSONNode, TReturn extends ResolvedNode<TLayoutNode>>
	extends ResolvedRegistryItem<TLayoutNode, TReturn> {}