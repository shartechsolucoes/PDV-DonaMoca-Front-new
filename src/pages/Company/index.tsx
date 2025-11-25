import { NavLink } from 'react-router-dom'; // corrigido: react-router-dom
import './index.css';

export default function banner() {

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Empresas</h2>
					<p className="url-page">Dashboard / Empresas</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<NavLink to="/users/new" className="btn btn-info" style={{ height: 'fit-content' }}>
						Adicionar
					</NavLink>
				</div>
			</div>

			{/* Tabela dinâmica */}
			<div className="row">
				
			</div>
		</div>
	);
}
