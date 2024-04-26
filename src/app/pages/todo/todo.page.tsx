import { useEffect, useState } from 'react';
import Dialog from '../../components/dialog/dialog';
import useSearch from '../../hooks/use-search';
import { TaskInListProps, TaskProps } from '../../shared/types/task.types';
import { LS } from '../../shared/utils/storage';
import { STORAGE_KEY } from '../../shared/utils/storage.key';
import NewTaskPage from '../new-task/new-task.page';
import BottomAction from './components/bottom-action/bottom-action';
import styles from './todo.module.scss';

function fetchData() {
	return (LS.getItem<TaskProps[]>(STORAGE_KEY.todos) || [])
		.map((v) => ({ ...v, selected: false }))
		.sort((a, b) => a.dueDateTimestamp - b.dueDateTimestamp)
		.map((c) => ({ ...c, selected: false }));
}

function TodoPage() {
	const immutableList = fetchData();
	const [selectedItems, setSelectedItems] = useState<TaskInListProps[]>([]);
	const [currentTask, setCurrentTask] = useState<TaskProps | null>(null);
	const [search, setSearch] = useState('');
	const { data, setSearchData } = useSearch(search, 'title', immutableList);

	const setCheck = (val: boolean, index: number) => {
		setSearchData((c) => {
			c[index].selected = val;
			return [...c];
		});
	};

	const onRemoveAllSelected = () => {
		const filtered = data.filter((c) => !c.selected);
		LS.setItem(STORAGE_KEY.todos, filtered);
		setSearchData(filtered);
	};

	const onRemoveCurent = (index: number) => {
		const newList = data.splice(index, 1);
		LS.setItem(STORAGE_KEY.todos, data);
		getNewList();
	};

	const getNewList = () => {
		setSearchData(fetchData());
		setCurrentTask(null);
	};

	//! hooks
	useEffect(() => {
		setSelectedItems(data.filter((c) => c.selected));
	}, [data]);

	return (
		<>
			<div style={{ paddingBottom: 'calc(var(--bottom-action-height) + 24px)' }}>
				<div className='text-center heading'>Todo List</div>
				<input value={search} type='text' onChange={(e) => setSearch(e.target.value)} className='text-field full-width' placeholder='Search...' />

				{data.map((item, index) => {
					const { title, id } = item;
					const { selected, ...task } = item;
					return (
						<div className={`${styles.todoItem} flex items-center`} key={id}>
							<input type='checkbox' className='cursor-pointer' onChange={(e) => setCheck(e.target.checked, index)} />
							<div className={`${styles.title} flex-1`}>{title}</div>
							<button
								className='btn-primary'
								style={{ width: '80px' }}
								onClick={() => {
									setCurrentTask(task);
								}}
							>
								Detail
							</button>
							<button className='btn-error' style={{ width: '80px', marginLeft: '12px' }} onClick={() => onRemoveCurent(index)}>
								Remove
							</button>
						</div>
					);
				})}
			</div>
			{selectedItems.length ? <BottomAction onDone={() => {}} onRemove={onRemoveAllSelected} /> : <></>}
			<Dialog openWhen={!!currentTask} onClose={() => setCurrentTask(null)}>
				<div className={styles.editBox}>
					<NewTaskPage
						data={{
							description: currentTask?.description ?? '',
							dueDate: currentTask?.dueDate ?? '',
							piority: currentTask?.piority ?? '',
							title: currentTask?.title ?? '',
						}}
						isUpdateMode
						id={currentTask?.id}
						onUpdateSuccess={getNewList}
					/>
					<button onClick={() => setCurrentTask(null)} className='mt full-width'>
						Cancel
					</button>
				</div>
			</Dialog>
		</>
	);
}
export default TodoPage;
