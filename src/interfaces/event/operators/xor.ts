import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin, ExclusiveModeMixin} from "../mix-ins";

export interface XorOperator extends Operator<typeof OperatorTypes.Xor>, MultipleInputMixin, ExclusiveModeMixin {}