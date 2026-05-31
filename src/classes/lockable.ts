export interface LockableEntry<TValue> {
	value: TValue,
	isDefault?: boolean
}

export abstract class Lockable<TData> {
	protected defaultData!: TData;
	protected data!: TData;

	protected locked!: boolean;
	protected type: string;

	protected lockedError: Error;

	private readonly ctor: { new(): TData };

	get areDefaultsLocked(): boolean { return this.locked };

	protected constructor(ctor: { new(): TData }, type: string) {
		this.ctor = ctor;
		this.type = type;
		this.lockedError = new Error(`${this.type} is locked`);

		this.reset();
	}

	lockDefaults(): void {
		this.locked = true
	};

	reset(): void {
		this.defaultData = new this.ctor();
		this.data = new this.ctor();

		this.locked = false;
	}

	protected applyIfUnlocked<T>(unlockedFn: () => T, lockedFn: () => T = (): never => { throw this.lockedError }): T {
		return this.locked ? lockedFn() : unlockedFn();
	}
}