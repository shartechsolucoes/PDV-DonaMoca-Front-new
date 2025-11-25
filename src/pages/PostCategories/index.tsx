import { NavLink } from 'react-router';
import { api } from '../../api';
import { useEffect, useState } from 'react';
import './index.css';
import { FaAddressBook, FaFileAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

type CategoryType = {
	category_id: number;
	name: string;
	description: string;
	status: number;
};

export default function Users() {
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	const getPostCategories = async () => {
		try {
			const response = await api.get('/post/categories');
			setCategories(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getPostCategories();
	}, []);

	const handleEdit = (item: CategoryType) => {
		setSelectedCategory(item);
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setSelectedCategory(null);
	};

	const handleInputChange = (field: keyof CategoryType, value: any) => {
		setSelectedCategory(prev =>
			prev ? { ...prev, [field]: value } : null
		);
	};

	const saveCategory = async () => {
		if (!selectedCategory) return;

		try {
			await api.put(`/post/category/${selectedCategory.category_id}`, selectedCategory);
			closeSidebar();
			getPostCategories();
		} catch (error) {
			console.error("Erro ao salvar categoria", error);
		}
	};

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Categorias</h2>
					<p className="url-page">Dashboard / Categorias</p>
				</div>
				<div className="col-9 d-flex justify-content-end">
					<NavLink to="form" className="btn btn-info">Adicionar</NavLink>
					<NavLink to="form" className="btn btn-info">Buscar</NavLink>
				</div>
			</div>

			<div className="col-12 mt-5">
				<div className="row">
					{categories.map((item) => (
						<div className="col-3 mb-2" key={item.category_id}>
							<div className={`card categories ${item.status === 1 ? "active" : "inactive"}`}>
							<div className="card-body">
							{/*<p>{item.category_id}</p>*/}
							<h4>{item.name}</h4>
							<p>{item.description}</p>
							{/*<p><Badge status={item.status} /></p>*/}
							<p>
								<button
									className="btn btn-warning btn-sm"
									onClick={() => handleEdit(item)}
								>
									Editar
								</button>
							</p>
							</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ✅ Sidebar para edição */}
			{selectedCategory && (
				<div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}>
					<div className="sidebar" onClick={(e) => e.stopPropagation()}>
						<div className="tabs-menu">
							<ul className="tab-list">
								<li className={activeTab === 0 ? "active" : ""} onClick={() => setActiveTab(0)}>
									<FaFileAlt />
								</li>
								<li className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
									<FaAddressBook />
								</li>
								<li className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
									<FaBasketShopping />
								</li>
							</ul>
						</div>

						<div className="sidebar-content">
							<button className="close-btn" onClick={closeSidebar}><IoClose/></button>
							<h3>Editar Categoria</h3>
							<hr />

							{/* Aba 0 - Geral */}
							{activeTab === 0 && (
								<>
									<div className="mb-3">
										<label>Nome:</label>
										<input
											type="text"
											value={selectedCategory.name}
											className="form-control"
											onChange={(e) => handleInputChange("name", e.target.value)}
										/>
									</div>

									<div className="mb-3">
										<label>Descrição:</label>
										<textarea
											value={selectedCategory.description}
											className="form-control"
											onChange={(e) => handleInputChange("description", e.target.value)}
										/>
									</div>

									<div className="mb-3">
										<label>Status:</label>
										<select value={selectedCategory.status} className="form-control"
												onChange={(e) => handleInputChange("status", Number(e.target.value))}>
											<option value={0}>Inativo</option>
											<option value={1}>Ativo</option>
										</select>
									</div>
								</>
							)}

							{/* Aba 1 - exemplo */}
							{activeTab === 1 && (
								<p>Conteúdo da aba 2</p>
							)}

							{/* Aba 2 - exemplo */}
							{activeTab === 2 && (
								<p>Conteúdo da aba 3</p>
							)}

							<button style={{ marginTop: "10px" }} className="btn btn-primary" onClick={saveCategory}>
								Salvar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
