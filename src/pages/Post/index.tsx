import "./styles.css";
import { useEffect, useState } from "react";
import { api } from "../../api";
import PostThumbnail from '../../components/Image/thumbnail';
import Card from '../../components/Cards/Basic';
import Author from '../../components/Post/Author.tsx';
import {NavLink, useNavigate} from "react-router";
import Badge from "../../components/Badge/StatusPost/Index.tsx";
import {format, isToday} from "date-fns";
import { ptBR } from "date-fns/locale";
import {FaRegComments} from "react-icons/fa";

import {IoEyeOutline} from "react-icons/io5";
import {MdOutlineModeEditOutline} from "react-icons/md";
import { TbEyeSpark } from "react-icons/tb";
import {BsCalendarDate} from "react-icons/bs";


type PostType = {
	post_id: number,
	title: string,
	sub_title: string,
	content: string,
	midia: string,
	player: string,
	event: string,
	summary:string,
	tags:string,
	status:string,
	evento:string,
	account_id:string,
	autor_id:string,
	lider_id:string,
	id_company :string,
	press :string,
	date_added:string,
	date_modified:string,
	date_scheduled:string,
	views:string,
	spotlight:string,
	account_modified:string,
	image_id: number,
	viewsByDay: { day: string; views: number }[]; // histórico diário
};

export default function Dashboard() {
	const [post, setPost] = useState<PostType[]>([]);
	const [loading, setLoading] = useState(true);

	const [totalItems, setTotalItems] = useState({
		statusPending: 0,
		statusApproved: 0,
		statusFailed: 0,
		total: 0,
	});

	// Funções para sidebar
	const getData = async () => {
		try {
			const response = await api.get(`/post/data`);
			const { statusPending, statusApproved, statusFailed, total } = response.data;

			setTotalItems({
				statusPending,
				statusApproved,
				statusFailed,
				total,
			});
		} catch (error) {
			console.error('Erro ao buscar dados do top:', error);
		} finally {
			setLoading(false);
		}
	};

	const [search, setSearch] = useState("");

	const getPosts = async () => {
		try {
			const url = search ? `/posts/${search}` : `/posts/`;
			const response = await api.get(url);
			setPost(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getPosts();
		getData();
	}, [search]);
	useNavigate();

	function formatDate(dateString: string | null | undefined) {
		if (!dateString) return "-";

		// Converte para Date, mas força que seja interpretada como local
		let parsedDate = new Date(dateString);

		if (isNaN(parsedDate.getTime())) return "-";

		// Ajuste manual para 3 horas a mais se o banco está em UTC
		parsedDate = new Date(parsedDate.getTime() + 3 * 60 * 60 * 1000);

		return isToday(parsedDate)
			? format(parsedDate, "HH:mm", { locale: ptBR })
			: format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
	}

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando...</p>
			</div>
		);
	return (
		<div>
			{/* Cards de resumo */}
			<div className="row">
				<div className="header-page row">
					<div className="col-3">
						<h2 className="title-page">Notícias</h2>
						<p className="url-page">Dashboard / Notícias</p>
					</div>
					<div className="col-9 d-flex justify-content-end">
						<NavLink to="/post/" className="btn btn-info">Adicionar</NavLink>
					</div>
				</div>
				<div className="col-4 mt-4 d-none">
					<Card icon='' title='Total' info='' content={totalItems.total} footer=''/>
				</div>
				<div className="col-4 mt-4 d-none">
					<Card icon='' title='Inativas' info='' content={totalItems.statusPending} footer=''/>
				</div>
				<div className="col-4 mt-4 d-none">
					<Card icon='' title='Ativas' info='' content={totalItems.statusApproved} footer=''/>
				</div>
			{/* Tabela */}
			<div className="col-12 col-md-2 mt-4 fixed">
				<div className="card">
					<div className="card-body">

					<div className="mb-3">
						<input
							type="text"
							placeholder="Titulo"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && getPosts()} // busca ao Enter
							className="form-control search-input"
						/>
					</div>
						<div className="mb-3">
							<input
								type="text"
								placeholder="Autor"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && getPosts()} // busca ao Enter
								className="form-control search-input"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-12 col-md-8  mt-4">

				{post.map((item) => (
					<div className="card mb-3">
						<div className="row g-0">
							<div className="col-md-2">
								<PostThumbnail
									image_id={item.image_id?.toString()}
									token={localStorage.getItem("token") || ""}
								/>
							</div>
							<div className="col-12 col-md-10">
								<div className="card-body">

									<div className="mb-1 d-flex align-items-center justify-content-between">
										<Badge status={item.status} />
										</div>
									<div className="d-flex align-items-center justify-content-between">
										<h5 className="card-title">{item.title}</h5>
										<div className="action">
											<a href="" className="btn btn-sm btn-primary"><TbEyeSpark /></a>
											<a href={`post/${item.post_id}`} className="btn btn-sm btn-primary">
												<MdOutlineModeEditOutline />
											</a>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between w-50" >
										<p className="icons text-center"><IoEyeOutline />
											{item.views}</p>
										<p className="icons text-center"><FaRegComments />
											0</p>
										<p className="icons text-center"><BsCalendarDate />
											{formatDate(item.date_added)}</p>
										<p className="date text-center"><BsCalendarDate />
											{formatDate(item.date_modified)}</p>
										<Author authorId={item.account_id} />
									</div>
									<p className="card-text">{item.sub_title}</p>

								</div>
							</div>
						</div>
					</div>
				))}

			</div>
			</div>

		</div>
	);
}
