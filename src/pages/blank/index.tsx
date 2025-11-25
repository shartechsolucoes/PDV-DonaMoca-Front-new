import './styles.css';

function blank() {
	return (
		<>
			<div className="header-page row">
				<div className='col-3'>
					<h2 className='title-page'>Gerador de Gráficos</h2>
					<p className='url-page'>Dashboard/Turma</p>
				</div>
				<div className='col-9 align-content-end'>
					<button
						className="btn btn-primary btn-md"
					>
						+ Adicionar
					</button>
				</div>
			</div>
			<div className="d-block d-sm-none col-sm-6">

			</div>
		</>
	);
}
export default blank;