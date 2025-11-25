import { TbReportAnalytics} from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import {GrAnalytics, GrView} from "react-icons/gr";

interface CardProps {
	title: string;
	footer: string;
	content: string | number;
	info: string | number;
	icon: string | number;
}
function icons(icon: string | number): JSX.Element {
	switch (icon) {
		case 'analytics':
			return <IoAnalytics />;
		case 'report':
			return <TbReportAnalytics />;
		case 'calendary':
			return <GrAnalytics />;
		case 'view':
			return <GrView />;
		default:
			return <IoAnalytics />;
	}
}

export default function Card({ title, content, footer, info, icon }: CardProps) {
	return (
		<div className="card basic d-flex">
			<div className="card-header">
			</div>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<div className="text">
						<p>{title}</p>
						<div className="text">
							<h3 className='value'>{content}</h3>
							<span>{info}</span>
						</div>
					</div>
					<div className="icon">
						{icons(icon)}
					</div>
				</div>
			</div>
			<div className="card-footer">
				<p>{footer}</p>
			</div>
		</div>
	);
}
