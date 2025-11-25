import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { api } from "../../../api";
import "./user.css";
import { format, parseISO } from "date-fns";

type UserType = {
	account_id: number;
	name: string;
	username: string;
	email: string;
	phone?: string;
	birthday?: string;
	address?: string;
	city?: string;
	state?: string;
	access_level: number;
	status: number;
};

export default function UserForm() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [user, setUser] = useState<UserType | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("info");

	// ao carregar do backend
	useEffect(() => {
		if (id) {
			api.get(`/user/${id}`).then((res) => {
				const data = res.data;
				setUser({
					...data,
					// apenas extrair a data como yyyy-MM-dd
					birthday: data.birthday ? data.birthday.split("T")[0] : "",
				});
				setLoading(false);
			});
		} else {
			setUser({
				account_id: 0,
				name: "",
				username: "",
				email: "",
				phone: "",
				birthday: "",
				address: "",
				city: "",
				state: "",
				access_level: 1,
				status: 1,
			});
			setLoading(false);
		}
	}, [id]);

	const handleChange = (field: keyof UserType, value: string | number) => {
		setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
	};

	const handleSave = async () => {
		if (!user) return;

		const formattedUser = {
			...user,
			// converte para ISO na hora de enviar
			birthday: user.birthday ? new Date(user.birthday + "T00:00:00").toISOString() : null,
		};

		try {
			if (id) await api.put(`/user/${id}`, formattedUser);
			else await api.post(`/user`, formattedUser);

			// alert("Usuário salvo com sucesso!");
			navigate(`/user/${id}`);
		} catch (error) {
			console.error(error);
			alert("Erro ao salvar usuário");
		}
	};

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando dados do usuário...</p>
			</div>
		);

	return (
		<div className="mt-4">
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Usuários</h2>
					<p className="url-page">Dashboard / Usuários</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<button
						onClick={handleSave}
						className="btn btn-info"
						style={{ height: "fit-content" }}
					>
						Salvar
					</button>
					<NavLink
						to="/users/search"
						className="btn btn-secondary"
						style={{ height: "fit-content" }}
					>
						Voltar
					</NavLink>
				</div>
			</div>

			<div className="row mt-4">
				{/* Menu lateral */}
				<div className="col-2">
					<ul className="nav flex-column nav-pills">
						<li
							className={`nav-link ${activeTab === "info" ? "active" : ""}`}
							onClick={() => setActiveTab("info")}
							style={{ cursor: "pointer" }}
						>
							Informações
						</li>
						<li
							className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
							onClick={() => setActiveTab("edit")}
							style={{ cursor: "pointer" }}
						>
							Editar
						</li>
						<li
							className={`nav-link ${activeTab === "activities" ? "active" : ""}`}
							onClick={() => setActiveTab("activities")}
							style={{ cursor: "pointer" }}
						>
							Atividades
						</li>
						<li
							className={`nav-link ${activeTab === "password" ? "active" : ""}`}
							onClick={() => setActiveTab("password")}
							style={{ cursor: "pointer" }}
						>
							Senha
						</li>
					</ul>
				</div>

				{/* Conteúdo da aba */}
				<div className="col-10">
					{activeTab === "info" && user && (
						<div className="row">
							<div className="col-12">
								<div className="card user">
									<div className="card-body d-flex gap-3 justify-content-between">
										<div className="d-flex gap-2">
											<div className="avatar-user">
												<div className="initials">
													{user.name
														?.split(" ")
														.map((n) => n[0])
														.join("")
														.substring(0, 2)
														.toUpperCase()}
												</div>
											</div>
											<div>
												<h1 className="title">{user.name}</h1>
												<p>
													{user.access_level === 0
														? "Super Admin"
														: user.access_level === 1
															? "Administrador"
															: user.access_level === 2
																? "Jornalista"
																: user.access_level === 3
																	? "Designer"
																	: "Financeiro"}
												</p>
												<p>{user.email}</p>
												<p>{user.phone}</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-12 mt-1">
								<div className="card">
									<div className="card-body">
										<p>
											<b>Nome:</b>
											<br />
											{user.name}
										</p>
										<p>
											<b>Login:</b>
											<br />
											{user.username}
										</p>
										<p>
											<b>Nascimento:</b>
											<br />
											{user.birthday
												? format(parseISO(user.birthday), "dd/MM/yyyy")
												: "-"}
										</p>
										<p>
											<b>Email:</b>
											<br />
											{user.email}
										</p>
										<p>
											<b>Telefone:</b>
											<br />
											{user.phone}
										</p>
										<p>
											<b>Endereço:</b>
											<br />
											{user.address}
										</p>
										<p>
											<b>Cidade:</b> {user.city} - {user.state}
										</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "edit" && user && (
						<div className="card user">
							<div className="card-body">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleSave();
									}}
									className="row"
								>
									{/* Nome */}
									<div className="col-12 mb-3">
										<label className="form-label">Nome</label>
										<input
											type="text"
											className="form-control"
											value={user.name || ""}
											onChange={(e) => handleChange("name", e.target.value)}
										/>
									</div>

									{/* Email */}
									<div className="col-12 mb-3">
										<label className="form-label">E-mail</label>
										<input
											type="email"
											className="form-control"
											value={user.email || ""}
											onChange={(e) => handleChange("email", e.target.value)}
										/>
									</div>

									{/* Login */}
									<div className="col-6 mb-3">
										<label className="form-label">Login</label>
										<input
											type="text"
											className="form-control"
											value={user.username || ""}
											onChange={(e) => handleChange("username", e.target.value)}
										/>
									</div>

									{/* Telefone */}
									<div className="col-6 mb-3">
										<label className="form-label">Telefone</label>
										<input
											type="text"
											className="form-control"
											value={user.phone || ""}
											onChange={(e) => handleChange("phone", e.target.value)}
										/>
									</div>

									{/* Birthday */}
									<input
										type="date"
										className="form-control"
										value={user?.birthday || ""}
										onChange={(e) => handleChange("birthday", e.target.value)}
									/>

									{/* Access Level */}
									<div className="col-6 mb-3">
										<label className="form-label">Nível de acesso</label>
										<select
											className="form-select"
											value={user.access_level || 1}
											onChange={(e) =>
												handleChange("access_level", parseInt(e.target.value))
											}
										>
											<option value={4}>Financeiro</option>
											<option value={3}>Designer</option>
											<option value={2}>Jornalista</option>
											<option value={1}>Administrador</option>
											<option value={0}>Super Admin</option>
										</select>
									</div>

									{/* Status */}
									<div className="col-6 mb-3">
										<label className="form-label">Status</label>
										<select
											className="form-select"
											value={user.status || 1}
											onChange={(e) =>
												handleChange("status", parseInt(e.target.value))
											}
										>
											<option value={1}>Ativo</option>
											<option value={0}>Inativo</option>
										</select>
									</div>

									{/* Endereço */}
									<div className="col-6 mb-3">
										<label className="form-label">Endereço</label>
										<input
											type="text"
											className="form-control"
											value={user.address || ""}
											onChange={(e) => handleChange("address", e.target.value)}
										/>
									</div>

									{/* Cidade */}
									<div className="col-4 mb-3">
										<label className="form-label">Cidade</label>
										<input
											type="text"
											className="form-control"
											value={user.city || ""}
											onChange={(e) => handleChange("city", e.target.value)}
										/>
									</div>

									{/* Estado */}
									<div className="col-2 mb-3">
										<label className="form-label">Estado</label>
										<input
											type="text"
											className="form-control"
											value={user.state || ""}
											onChange={(e) => handleChange("state", e.target.value)}
										/>
									</div>

									{/* Botões */}
									<div className="d-flex gap-2">
										<button
											type="button"
											className="btn btn-sm btn-secondary"
											onClick={() => navigate("/users")}
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

					{activeTab === "activities" && (
						<>
							<h3>📊 Atividades</h3>
							<p>Aqui você pode listar atividades do usuário.</p>
						</>
					)}

					{activeTab === "password" && (
						<>
							<h3>🔑 Alterar Senha</h3>
							<form>
								<div className="mb-3">
									<label className="form-label">Nova Senha</label>
									<input type="password" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Confirmar Senha</label>
									<input type="password" className="form-control" />
								</div>
								<button type="submit" className="btn btn-warning">
									Atualizar Senha
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
