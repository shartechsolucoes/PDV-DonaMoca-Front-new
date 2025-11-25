import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import ImageUpload from "../../../components/Image/upload";
import { api } from "../../../api";
import "./user.css";
import Thumbnail from "../../../components/Image/thumbnail.tsx";

type AuthorType = {
	account_id?: number;
	name: string;
	username?: string;
	email: string;
	image_id: string;
	description: string;
	phone?: string;
	cellphone?: string;
	status: number;
};

type ActivityType = {
	id: number;
	title: string;
	views: number;
	created_at: string;
};

export default function UserForm() {
	const { id } = useParams<{ id: string }>();
	const token = localStorage.getItem("token") || "";
	const navigate = useNavigate();

	const [author, setAuthor] = useState<AuthorType>({
		name: "",
		email: "",
		image_id: "",
		description: "",
		status: 1,
	});

	const [activities, setActivities] = useState<ActivityType[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingActivities, setLoadingActivities] = useState(false);
	const [activeTab, setActiveTab] = useState("activities");

	// Carregar autor
	useEffect(() => {
		const fetchAuthor = async () => {
			if (id) {
				try {
					const res = await api.get(`/author/${id}`);
					const data = res.data;
					setAuthor({
						...data,
						phone: data.phone || "",
						cellphone: data.cellphone || "",
						image_id: data.image_id || "",
					});
				} catch (err) {
					console.error(err);
					alert("Erro ao carregar autor");
				}
			}
			setLoading(false);
		};
		fetchAuthor();
	}, [id]);

	// Carregar atividades do autor
	useEffect(() => {
		const fetchActivities = async () => {
			if (!id) return;
			try {
				setLoadingActivities(true);
				const res = await api.get(`/posts/author/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setActivities(res.data || []);
			} catch (err) {
				console.error("Erro ao carregar atividades:", err);
			} finally {
				setLoadingActivities(false);
			}
		};

		if (activeTab === "activities") fetchActivities();
	}, [activeTab, id, token]);

	const handleChange = (field: keyof AuthorType, value: string | number) => {
		setAuthor((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			if (id) {
				await api.put(`/author/${id}`, author);
			} else {
				await api.post("/author", author);
			}
			alert("Autor salvo com sucesso!");
			navigate("/authors");
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar autor");
		}
	};

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando autor...</p>
			</div>
		);

	return (
		<div className="mt-4">
			{/* Header */}
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">{id ? "Editar Autor" : "Novo Autor"}</h2>
					<p className="url-page">Dashboard / Autores</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<button onClick={handleSave} className="btn btn-info">
						Salvar
					</button>
					<NavLink to="/authors" className="btn btn-secondary">
						Voltar
					</NavLink>
				</div>
			</div>

			<div className="row mt-4">
				{/* Menu lateral */}
				<div className="col-2">
					<div className="card user">
						<div className="card-body">
							<div className="rounded-4 overflow-hidden mb-3">
								<Thumbnail image_id={author.image_id} width={220} height={200} />
							</div>

							<h3>{author.name}</h3>
							<p><b>Email:</b> {author.email}</p>
							<p><b>Descrição:</b> {author.description}</p>
							{author.phone && <p><b>Telefone:</b> {author.phone}</p>}
							{author.cellphone && <p><b>Celular:</b> {author.cellphone}</p>}
							<p><b>Status:</b> {author.status === 1 ? "Ativo" : "Inativo"}</p>

							<ul className="nav flex-column nav-pills mt-3">
								<li
									className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
									onClick={() => setActiveTab("edit")}
								>
									Editar
								</li>
								<li
									className={`nav-link ${activeTab === "activities" ? "active" : ""}`}
									onClick={() => setActiveTab("activities")}
								>
									Atividades
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Conteúdo principal */}
				<div className="col-10">
					{/* Aba Atividades */}
					{activeTab === "activities" && (
						<div className="card user">
							<div className="card-body">
								<h5 className="mb-3">Atividades do Autor</h5>

								{loadingActivities ? (
									<div className="text-center mt-4">
										<div className="spinner-border text-info" role="status"></div>
										<p>Carregando atividades...</p>
									</div>
								) : activities.length === 0 ? (
									<p className="text-muted">Nenhuma atividade encontrada.</p>
								) : (
									<div className="table-responsive">
										<table className="table table-striped table-bordered align-middle">
											<thead className="table-light">
											<tr>
												<th>Título</th>
												<th className="text-center">Visualizações</th>
												<th className="text-center">Data</th>
											</tr>
											</thead>
											<tbody>
											{activities.map((a) => (
												<tr key={a.id}>
													<td>{a.title}</td>
													<td className="text-center">{a.views}</td>
													<td className="text-center">
														{new Date(a.created_at).toLocaleDateString("pt-BR")}
													</td>
												</tr>
											))}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Aba Editar */}
					{activeTab === "edit" && (
						<div className="card user">
							<div className="card-body">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleSave();
									}}
									className="row"
								>
									<div className="col-12 mb-3">
										<ImageUpload
											image_id={author.image_id}
											token={token}
											onChange={async (newId) => {
												if (newId && newId !== author.image_id) {
													handleChange("image_id", newId);
													try {
														if (id) {
															await api.put(`/author/${id}`, { ...author, image_id: newId });
															console.log("Autor atualizado com nova imagem!");
														}
													} catch (error) {
														console.error("Erro ao atualizar imagem do autor:", error);
													}
												}
											}}
										/>
									</div>

									<div className="col-6 mb-3">
										<label className="form-label">Nome</label>
										<input
											type="text"
											className="form-control"
											value={author.name}
											onChange={(e) => handleChange("name", e.target.value)}
											required
										/>
									</div>

									<div className="col-6 mb-3">
										<label className="form-label">Email</label>
										<input
											type="email"
											className="form-control"
											value={author.email}
											onChange={(e) => handleChange("email", e.target.value)}
											required
										/>
									</div>

									<div className="col-6 mb-3">
										<label className="form-label">Telefone</label>
										<input
											type="text"
											className="form-control"
											value={author.phone || ""}
											onChange={(e) => handleChange("phone", e.target.value)}
										/>
									</div>

									<div className="col-6 mb-3">
										<label className="form-label">Celular</label>
										<input
											type="text"
											className="form-control"
											value={author.cellphone || ""}
											onChange={(e) => handleChange("cellphone", e.target.value)}
										/>
									</div>

									<div className="col-12 mb-3">
										<label className="form-label">Descrição</label>
										<textarea
											className="form-control"
											value={author.description}
											onChange={(e) => handleChange("description", e.target.value)}
										/>
									</div>

									<div className="col-6 mb-3">
										<label className="form-label">Status</label>
										<select
											className="form-select"
											value={author.status}
											onChange={(e) =>
												handleChange("status", parseInt(e.target.value))
											}
										>
											<option value={1}>Ativo</option>
											<option value={0}>Inativo</option>
										</select>
									</div>

									<div className="d-flex gap-2">
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => navigate("/authors")}
										>
											Cancelar
										</button>
										<button type="submit" className="btn btn-primary">
											Salvar
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
