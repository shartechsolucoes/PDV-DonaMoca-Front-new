import Charts from "../../components/Charts";

export default function Users() {
	return (
		<div>
			<div className="header-page row">
				<div className='col-3'>
					<h2 className='title-page'>Gráficos</h2>
					<p className='url-page'>Dashboard/Gráficos</p>
				</div>
			</div>
			<Charts/>
		</div>
	);
}
