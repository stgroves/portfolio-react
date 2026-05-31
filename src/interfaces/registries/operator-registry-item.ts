import {Operator} from "../event/operators";

export interface OperatorRegistryItem<TLogicGateType extends Operator> {
	evaluate: (operator: TLogicGateType) => boolean;
}