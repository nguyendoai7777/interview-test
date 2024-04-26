import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routing';
import MainLayout from './app/layout/main.layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainLayout>
			<RouterProvider router={router} />
		</MainLayout>
	</React.StrictMode>
);
