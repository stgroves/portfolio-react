import {Registry} from "./registry";
import {
	ElementRegistryManagementItem, LayoutRegistryManagementItem,
	OperatorRegistryManagementItem, ModifierRegistryManagementItem,
	EventActionRegistryManagementItem, ResolvedRegistryManagementItem,
	ExpressionRegistryManagementItem, ComparableRegistryManagementItem
} from "../features/tree-builder";
import {Lockable} from "./lockable";
import {RegistryManagementItem} from "../interfaces/registries";

let instance: RegistryManagerClass | undefined;

export const RegistryManager = {
	get current(): RegistryManagerClass {
		if (!instance)
			throwInitializationError("RegistryManager");

		return instance!;
	}
};

class RegistryManagerClass extends Lockable<Registry<any, any>> {
	constructor() {
		super(Registry<any, any>, "RegistryManagerClass");
	}

	add(key: string, value: RegistryManagementItem, isDefault = false): RegistryManagerClass {
		if (this.has(key))
			throw new Error(`${key} already exists`);

		const registry: Registry<any, any> = value.initialize();

		if (isDefault)
			this.applyIfUnlocked((): void => {this.defaultData.add(key, registry)});
		else
			this.data.add(key, registry);

		return this;
	};

	has(key: string): boolean {
		return this.defaultData.has(key) || this.data.has(key);
	}

	get(key: string): Registry<string, any> {
		if (this.defaultData.has(key))
			return this.defaultData.get(key);

		if (this.data.has(key))
			return this.data.get(key);

		throw new Error(`Key not found: ${key}`);
	}
}

export function throwInitializationError(registryName: string): void {
	throw new Error(
		`${registryName} has not been initialized yet! Did you forget to call initializeRegistryManager()?`
	);
}

export function initializeRegistryManager(): void {
	instance = new RegistryManagerClass();

	instance.add("element", ElementRegistryManagementItem, true);
	instance.add("layout", LayoutRegistryManagementItem, true);
	instance.add("modifier", ModifierRegistryManagementItem, true);
	instance.add("operator", OperatorRegistryManagementItem, true);
	instance.add("event-action", EventActionRegistryManagementItem, true);
	instance.add("expression", ExpressionRegistryManagementItem, true);
	instance.add("comparator", ComparableRegistryManagementItem, true);
	instance.add("resolved", ResolvedRegistryManagementItem, true);

	instance.lockDefaults();
}