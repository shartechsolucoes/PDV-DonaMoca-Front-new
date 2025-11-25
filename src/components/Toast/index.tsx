export default function Toast({
	success,
	msgSuccess,
	msgError,
}: {
	success?: boolean;
	msgSuccess?: string;
	msgError?: string;
}) {
	return (
		<>
			{success ? (
				<div className="position-fixed card bg-success top-0 end-0 w-25 m-3 p-2 text-white">
					<strong>Sucesso:</strong>
					<p className="text-white">{msgSuccess || 'Salvo com sucesso'}</p>
				</div>
			) : (
				<div className="position-fixed card bg-danger top-0 end-0 w-25 m-3 p-2 text-white">
					<strong>Erro</strong>
					<p className="text-white">{msgError || 'Erro ao criar'}</p>
				</div>
			)}
		</>
	);
}
