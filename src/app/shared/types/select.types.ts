export interface SlectOptionsProps<T = any, TId = number> {
	label: string;
	value: T;
	id?: TId;
  selected?: boolean;
}
