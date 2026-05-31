import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins";

export interface NotEqualOperator extends Operator<typeof OperatorTypes.NotEqual>, BaseInputMixin {}