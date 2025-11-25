import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { publicRoutes } from './routes/PublicRoutes.ts';
import { privateRoutes } from './routes/PrivateRoutes.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout/index.tsx';
import 'react-datepicker/dist/react-datepicker.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			{publicRoutes.map(({ path, component}) => (
				<Route>
					<Route key={path} path={path} Component={component} />
				</Route>
			))}
			<Route element={<Layout />}>
				{privateRoutes.map(({ path, component, children }) => (
					<>
						<Route key={path} path={path} Component={component} />
						{children?.map((child) => (
							<Route
								path={child.path}
								key={child.path}
								Component={child.component}
							/>
						))}
					</>
				))}
			</Route>
		</Routes>
	</BrowserRouter>
);
