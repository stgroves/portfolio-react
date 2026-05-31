import {ParentMixin} from "./parent";
import {ChildrenMixin} from "./layout";

export * from "./layout";
export * from "./parent";

export interface LayoutMixin extends ParentMixin, ChildrenMixin {}