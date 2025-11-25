import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../api"; // sua instância axios
import Thumbanail from "../../components/Image/thumbnail.tsx";
import Status from "../../components/Badge/Status/";
import { TbEyeSpark } from "react-icons/tb";
import { MdOutlineModeEditOutline } from "react-icons/md";
import "./index.css";
import {LuPencilLine, LuTrash2} from "react-icons/lu";

type AuthorType = {
	autor_id: number;
	name: string;
	email: string;
	description: string;
	phone: string;
	cellphone: string;
	status: number;
	image_id: string;
};

export default function Authors() {
	const [authors, setAuthors] = useState<AuthorType[]>([]);
	const [loading, setLoading] = useState(true);

	// Carrega a lista de autores
	const loadAuthors = async () => {
		try {
			setLoading(true);
			const response = await api.get("/authors"); // GET /authors
			setAuthors(response.data);
		} catch (err) {
			console.error("Erro ao carregar autores:", err);
			alert("Erro ao carregar autores");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadAuthors();
	}, []);

	// Deletar autor
	const handleDelete = async (id: number) => {
		if (!window.confirm("Deseja realmente deletar este autor?")) return;

		try {
			await api.delete(`/author/${id}`);
			alert("Autor deletado com sucesso!");
			setAuthors((prev) => prev.filter((a) => a.autor_id !== id));
		} catch (err) {
			console.error(err);
			alert("Erro ao deletar autor");
		}
	};

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando autores...</p>
			</div>
		);

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Autores</h2>
					<p className="url-page">Dashboard / Autores</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<NavLink
						to="/author/new"
						className="btn btn-info"
						style={{ height: "fit-content" }}
					>
						Adicionar
					</NavLink>
				</div>
			</div>

			<div className="row mt-3">
				{authors.map((author) => (
					<div className="col-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-3" key={author.autor_id}>
						<div className="card h-100 rounded-4">
							<div className="m-2">
								<div className="text-center rounded-3 overflow-hidden position-relative">
									<Thumbanail	image_id={author.image_id} height={180}/>
									<div className="position-absolute mb-2 d-flex justify-content-center">
										<Status status={author.status} />
									</div>
								</div>
								<div className="mb-2 mt-2">
									<h5 className="card-title">{author.name}</h5>
									{/*<p className="card-text">{author.email}</p>*/}
									<p className="card-text">{author.description}</p>
								</div>

								<div className=" d-flex justify-content-around gap-1">
									<div className="w-75">
										<NavLink
										to={`/author/${author.autor_id}`}
										className="btn btn-sm btn-primary w-100"
										title="Editar"
									>Editar
											<LuPencilLine />
										</NavLink></div>
									<div className="w-25">
									<button
										className="btn btn-sm btn-danger w-100"
										title="Deletar"
										onClick={() => handleDelete(author.autor_id)}
									>
										<LuTrash2 />
									</button>
									</div>

								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
