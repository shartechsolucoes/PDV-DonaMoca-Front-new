import Dashboard from '../pages/Dashboard';


import Users from '../pages/Users';
import UserEdit from '../pages/Users/Edit';

import FilesUpload from '../pages/Files';
import Sales from '../pages/Sales';
import SalesEdit from '../pages/Sales/Edit';
import Product from '../pages/Product';


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
    		name: 'PDV',
    		path: '',
    		icon: '',
    		component: Users,
    		access: [0, 1, 2],
    		children: [
    			{
    				name: 'Vendas',
    				path: '/sales',
    				icon: 'cart',
    				component: Sales,
    				access: [0, 1],
    				visible: true,
    			},
            {
                     name: 'Nova Vendas',
                     path: '/sale/new',
                     icon: 'account',
                     component: SalesEdit,
                     access: [0, 1],
                     visible: false,
                			},
                        {
                     name: 'Editar Venda',
                     path: '/sale/:id',
                     icon: 'account',
                     component: SalesEdit,
                     access: [0, 1],
                     visible: false,
                            },
                            			{
    				name: 'Produtos',
    				path: '/products',
    				icon: 'product',
    				component: Product,
    				access: [0, 1],
    				visible: true,
    			},
    			{
    				name: 'Estoque',
    				path: '/user/:id',
    				icon: '',
    				component: UserEdit,
    				access: [0, 1],
    				visible: true,
    			},
            {
                    name: 'Clientes',
                    path: '/user/:id',
                	icon: '',
                	component: UserEdit,
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
