import {JSONStylableNode} from "../../stylable";
import {ElementTypes} from "../../../../features/tree-builder";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {NativeButtonMixin} from "../../mix-ins/native-button";

export interface JSONNumberFieldIncrementNode
	extends JSONStylableNode<typeof ElementTypes.NumberFieldIncrement>, BaseUIMixin, NativeButtonMixin {
}