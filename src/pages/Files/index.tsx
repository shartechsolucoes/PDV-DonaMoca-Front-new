import { useEffect, useState, useRef } from "react";
import { api } from "../../api";
import { NavLink } from "react-router-dom";

interface FileData {
	id: string;
	originalName: string;
	url: string;
	size: number;
	createdAt: string;
}

export default function Files() {
	const [files, setFiles] = useState<FileData[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const getFiles = async () => {
		try {
			const response = await api.get("/files");
			setFiles(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getFiles();
	}, []);

	// ✅ Upload do arquivo
	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);

			await api.post("/file", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			await getFiles(); // atualiza a lista
		} catch (error) {
			console.error("Erro ao enviar arquivo:", error);
			alert("Erro ao enviar arquivo");
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const handleDelete = async (id: string) => {
		if (!window.confirm("Deseja realmente excluir este arquivo?")) return;

		try {
			await api.delete(`/file/${id}`); // chama a rota da API
			setFiles(prev => prev.filter(f => f.id !== id));
		} catch (err) {
			console.error(err);
			alert("Erro ao deletar arquivo.");
		}
	};

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Arquivos</h2>
					<p className="url-page">Dashboard / Arquivos</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					{/* Botão de upload */}
					<input
						type="file"
						accept=".pdf,.doc,.docx,.xls,.xlsx"
						ref={fileInputRef}
						onChange={handleUpload}
						style={{ display: "none" }}
					/>

					<button
						className="btn btn-success"
						onClick={() => fileInputRef.current?.click()}
						disabled={uploading}
						style={{ height: "fit-content" }}
					>
						{uploading ? "Enviando..." : "Upload de Arquivo"}
					</button>

					<NavLink to="/files/new" className="btn btn-info" style={{ height: "fit-content" }}>
						Adicionar
					</NavLink>
				</div>
			</div>

			<div className="mt-4">
				<h5>Lista de arquivos no servidor</h5>

				{loading ? (
					<p>Carregando arquivos...</p>
				) : files.length === 0 ? (
					<p>Nenhum arquivo encontrado.</p>
				) : (
					<table className="table table-striped mt-3">
						<thead>
						<tr>
							<th>Nome</th>
							<th>Tamanho</th>
							<th>Data de Envio</th>
							<th>Ações</th>
						</tr>
						</thead>
						<tbody>
						{files.map((file) => (
							<tr key={file.id}>
								<td>{file.originalName}</td>
								<td>{(file.size / 1024).toFixed(2)} KB</td>
								<td>{new Date(file.createdAt).toLocaleString()}</td>
								<td>
									<a
										href={file.url}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-sm btn-outline-primary me-2"
									>
										Ver
									</a>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDelete(file.id)}
									>
										Excluir
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
