import { useEffect, useState } from 'react';
import { TaskInListProps } from '../shared/types/task.types';

const useSearch = (search = '', searchBy: string, immutableList: TaskInListProps[]) => {
	const [data, setSearchData] = useState(immutableList);
	const immu = structuredClone(immutableList);
	useEffect(() => {
		if (!search) {
			setSearchData(immutableList);
		} else {
			const searchWords = search.toLocaleLowerCase().split(' ');
			const filtered = immu.filter((c) => {
				const rq = (c as any)[searchBy].toLocaleLowerCase().split(' ');
				return searchWords.every((w) => rq.some((match: string) => match.includes(w)));
			});
			setSearchData(filtered);
		}
	}, [search]);

	return { data, setSearchData };
};

export default useSearch;
