export interface PiorityComponentProps {
	change: (item: string) => void;
	className?: string;
	defaultValue?: string;
	value: string;
}
