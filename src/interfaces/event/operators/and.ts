import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin} from "../mix-ins";

export interface AndOperator extends Operator<typeof OperatorTypes.And>, MultipleInputMixin {}