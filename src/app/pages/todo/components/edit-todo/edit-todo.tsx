import { FCC } from '../../../../shared/types/component.types';
import { TaskProps } from '../../../../shared/types/task.types';
import NewTaskPage from '../../../new-task/new-task.page';

const EditTodo: FCC<{ title?: string; data: TaskProps }> = ({ data }) => {
	const { dueDateTimestamp, id, resolved, ...props } = data;
	return (
		<>
			
		</>
	);
};
export default EditTodo;
