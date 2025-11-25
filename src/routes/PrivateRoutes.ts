import Dashboard from '../pages/Dashboard';

import TopVotes from '../pages/Top';
import TopRanking from '../pages/Top/winners.tsx';

import Users from '../pages/Users';
import UserEdit from '../pages/Users/Edit';

import Post from '../pages/Post';
import PostEditPreview from '../pages/Post/EditPreview/index.tsx';
import PostCategories from '../pages/PostCategories/index.tsx';
import Author from '../pages/Author';
import AuthorEdit from '../pages/Author/Edit';
import Publication from '../pages/Publication';
import PublicationReport from '../pages/PublicationReport';
import Banner from '../pages/Banner';
import Charts from '../pages/Charts';
import Event from '../pages/Event';
import Company from '../pages/Company';
import FilesUpload from '../pages/Files';

export type RouteItem = {
	name: string;
	path: string;
	icon: string;
	component: React.ComponentType;
	access: number[];
	visible?: boolean;
	children?: RouteItem[];
};

export const privateRoutes: RouteItem[] = [
	{
		name: 'Dashboard',
		path: '/',
		icon: 'dashboard',
		component: Dashboard,
		access: [0, 1, 2, 3, 4, 5, 6],
	},
	{
		name: 'Top20',
		path: '/top',
		icon: 'top',
		component: Post,
		access: [0, 1, 2, 3, 4, 5, 6],
		children: [
			{
				name: 'Votos',
				path: '/votes',
				icon: 'vote',
				component: TopVotes,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Ranking',
				path: '/ranking',
				icon: 'ranking',
				component: TopRanking,
				access: [0, 1],
				visible: true,
			},
		],
	},
	{
		name: 'Notícias',
		path: '/posts',
		icon: 'news',
		component: Post,
		access: [0, 1, 2, 3, 4, 5, 6],
		children: [
			{
				name: 'Noticias',
				path: '/posts',
				icon: 'news',
				component: Post,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'editarPreview',
				path: '/post/:id',
				icon: '',
				component: PostEditPreview,
				access: [0, 1],
				visible: false,
			},
			{
				name: 'editarPreview',
				path: '/post',
				icon: '',
				component: PostEditPreview,
				access: [0, 1],
				visible: false,
			},
			{
				name: 'Categorias',
				path: '/categories',
				icon: 'category',
				component: PostCategories,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Autor',
				path: '/authors',
				icon: 'author',
				component: Author,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Autor',
				path: '/author/new',
				icon: 'author',
				component: AuthorEdit,
				access: [0, 1],
				visible: false,
			},
			{
				name: 'Autor',
				path: '/author/:id',
				icon: 'author',
				component: AuthorEdit,
				access: [0, 1],
				visible: false,
			},
			{
				name: 'Gráficos',
				path: '/charts',
				icon: 'charts',
				component: Charts,
				access: [0, 1],
				visible: true,
			},
		],
	},
	{
		name: 'Publicações',
		path: '',
		icon: '',
		component: Users,
		access: [0, 1, 2],
		children: [
			{
				name: 'Lista',
				path: '/publication',
				icon: 'book',
				component: Publication,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Relatório',
				path: '/publiresport',
				icon: 'report',
				component: PublicationReport,
				access: [0, 1],
				visible: true,
			},
		],
	},
	{
		name: 'Publicidade',
		path: '',
		icon: '',
		component: Users,
		access: [0, 1, 2],
		children: [
			{
				name: 'Banners',
				path: '/banners',
				icon: 'banner',
				component: Banner,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Feiras e Eventos',
				path: '/events',
				icon: 'event',
				component: Event,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Empresas',
				path: '/company',
				icon: 'company',
				component: Company,
				access: [0, 1],
				visible: true,
			},
		],
	},
	{
		name: 'Configurações',
		path: '',
		icon: '',
		component: Users,
		access: [0, 1, 2],
		children: [
			{
				name: 'Usuários',
				path: '/users',
				icon: 'account',
				component: Users,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Arquivos',
				path: '/files',
				icon: 'files',
				component: FilesUpload,
				access: [0, 1],
				visible: true,
			},
			{
				name: 'Editar',
				path: '/user/:id',
				icon: '',
				component: UserEdit,
				access: [0, 1],
				visible: false,
			},
		],
	},
];
