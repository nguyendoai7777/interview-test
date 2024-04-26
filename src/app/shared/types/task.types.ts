export interface NewTaskFormProps {
	title: string;
	dueDate: string;
	piority: string;
	description: string;
}

export interface TaskProps extends NewTaskFormProps {
	dueDateTimestamp: number;
	resolved: boolean;
	id: number;
}
export type TaskInListProps = TaskProps & {
	selected: boolean;
};