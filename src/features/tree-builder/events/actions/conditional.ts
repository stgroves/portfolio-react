import {EventActionRegistryItem} from "../../../../interfaces/registries";
import {ConditionalEventAction, EventAction} from "../../../../interfaces/event";
import {ResolvedRegistry} from "../../resolved-registry";
import {evaluateInput} from "../index";

export const ConditionalEventActionRegistryItem: EventActionRegistryItem<ConditionalEventAction> = {
	process(action: ConditionalEventAction): void {
		const result = Boolean(evaluateInput(action.condition));

		if (result)
			action.then.forEach((resultAction: EventAction): void => {
				ResolvedRegistry.current.get(resultAction.type).process(resultAction);
			});
		else
			action.else?.forEach((resultAction: EventAction): void => {
				ResolvedRegistry.current.get(resultAction.type).process(resultAction);
			});
	}
};