import { FormEvent, useEffect, useState } from 'react';
import PioritySelectComponent from '../../components/piority/piority.component';
import { today, withTimetamp } from '../../shared/utils/date';
import FieldError from '../../components/field-error/field-error';
import { LS } from '../../shared/utils/storage';
import { STORAGE_KEY } from '../../shared/utils/storage.key';
import { NewTaskFormProps, TaskProps } from '../../shared/types/task.types';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const initProps = {
	title: '',
	dueDate: today,
	piority: 'normal',
	description: '',
};

function NewTaskPage({ isUpdateMode, data, id, onUpdateSuccess }: { isUpdateMode?: boolean; data?: NewTaskFormProps; id?: number; onUpdateSuccess?: () => void }) {
	const { enqueueSnackbar } = useSnackbar();
	const [form, setForm] = useState<NewTaskFormProps>(data ? { ...data } : initProps);
	const [error, setError] = useState({
		title: false,
	});

	const updateForm = (
		value: Partial<{
			[K in keyof NewTaskFormProps]: K[number];
		}>
	) => {
		setForm((c) => ({ ...c, ...value }));
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError((c) => ({ ...c, title: !form.title.length }));
		const valid = !!form.title.length;
		if (valid) {
			const items = LS.getItem<TaskProps[]>('todos');
			if (!items) {
				LS.setItem(STORAGE_KEY.todos, [{ ...form, dueDateTimestamp: withTimetamp(form.dueDate), id: Date.now(), resolved: false }]);
			} else {
				const newList = items;
				newList.push({ ...form, dueDateTimestamp: withTimetamp(form.dueDate), id: Date.now(), resolved: false });
				newList.sort((a, b) => a.dueDateTimestamp - b.dueDateTimestamp);
				LS.setItem(STORAGE_KEY.todos, newList);
				enqueueSnackbar('Created', { variant: 'success' });
			}
		}
		updateForm(initProps);
	};

	const onUpdate = (e: FormEvent) => {
		e.preventDefault();
		setError((c) => ({ ...c, title: !form.title.length }));
		const valid = !!form.title.length;
		if (valid) {
			const list = LS.getItem<TaskProps[]>(STORAGE_KEY.todos)!;
			const currentIndex = list.findIndex((c) => c.id === id);
			list[currentIndex].title = form.title;
			list[currentIndex].description = form.description;
			list[currentIndex].dueDate = form.dueDate;
			list[currentIndex].dueDateTimestamp = withTimetamp(form.dueDate);
			list[currentIndex].piority = form.piority;
			LS.setItem(STORAGE_KEY.todos, list);
			onUpdateSuccess!();
			enqueueSnackbar('Updated !', { variant: 'success' });
		}
		updateForm(initProps);
	};

	//! hooks
	useEffect(() => {
		data && setForm({ ...data });
	}, []);

	return (
		<>
			<form onSubmitCapture={isUpdateMode ? onUpdate : onSubmit}>
				<div className='text-center heading'>{isUpdateMode ? 'Update Task' : 'New task'}</div>
				<input
					value={form.title}
					onChange={({ target: { value } }) => {
						updateForm({ title: value });
						setError((c) => ({ ...c, title: !value }));
					}}
					type='text'
					className={`text-field full-width${error.title ? ' text-field-invalid' : ''}`}
					placeholder='Add new task'
				/>
				<FieldError>{error.title ? <div className='text-error text-small'>Required</div> : <></>}</FieldError>
				<div className='text-field-label'>
					<label htmlFor='desc'>Description</label>
				</div>
				<div>
					<textarea value={form.description} onChange={(e) => updateForm({ description: e.target.value })} className='full-width text-field' name='' id='desc' rows={5}></textarea>
				</div>
				<div className='mt'>
					<div className='pick-box'>
						<div className='flex-1'>
							<div className='text-field-label'>Due Date </div>
							<input name='date' onChange={(e) => updateForm({ dueDate: e.target.value })} type='date' min={today} value={form.dueDate} className='full-width text-field' />
						</div>
						<div className='flex-1'>
							<div className='text-field-label'>Piority</div>
							<PioritySelectComponent value={form.piority} className='full-width text-field' change={(piority) => updateForm({ piority })} />
						</div>
					</div>
					<div style={{ height: '24px' }}></div>
					<button className='btn-success full-width'>{isUpdateMode ? 'Update' : 'Add'}</button>
				</div>
			</form>
			{!isUpdateMode ? (
				<div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
					<Link className='btn-primary btn inline-block' to='/tasks' style={{ padding: '6px 12px' }}>
						Goto Tasks
					</Link>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
export default NewTaskPage;
