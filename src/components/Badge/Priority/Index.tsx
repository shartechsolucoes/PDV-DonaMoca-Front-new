import './styles.css';

interface BadgeProps {
    idPriority: number;
}
const getPriorityInfo = (idPriority: number) => {
    switch (idPriority) {
        case 1:
            return { colorClass: 'bg-label-low', label: 'Baixa' };
        case 2:
            return { colorClass: 'bg-label-medium', label: 'Média' };
        case 3:
            return { colorClass: 'bg-label-high', label: 'Alta' };
        case 4:
            return { colorClass: 'bg-label-urgent', label: 'Urgente' };
        default:
            return { colorClass: 'bg-label-analysis', label: 'Em Análise' };
    }
};

export default function Badge({ idPriority }: BadgeProps) {
    const { colorClass, label } = getPriorityInfo(idPriority);

    return (
        <div className="d-flex flex-column">
            <small className={`text-truncate d-none d-sm-block badge ${colorClass}`}>
                {label}
            </small>
        </div>
    );
}