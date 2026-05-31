import {JSONStylableNode} from "../../stylable";
import {ElementTypes} from "../../../../features/tree-builder";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {NativeButtonMixin} from "../../mix-ins/native-button";

export interface JSONNumberFieldDecrementNode
	extends JSONStylableNode<typeof ElementTypes.NumberFieldDecrement>, BaseUIMixin, NativeButtonMixin {
}