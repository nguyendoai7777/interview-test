import { SnackbarProvider } from 'notistack';
import { FCC } from '../shared/types/component.types';

const MainLayout: FCC = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={1}
			autoHideDuration={3000}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'bottom',
			}}
		>
			<div className='container'>{children}</div>
		</SnackbarProvider>
	);
};
export default MainLayout;
