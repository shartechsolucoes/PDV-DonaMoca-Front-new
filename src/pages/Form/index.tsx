import { useLocation } from 'react-router';
import UserForm from '../../components/Forms/User';

export default function Form() {
	const { pathname } = useLocation();

	const returnForm = () => {
		switch (pathname) {
			case '/users/form':
				return <UserForm />;
			default:
				break;
		}
	};

	return <div>{returnForm()}</div>;
}
