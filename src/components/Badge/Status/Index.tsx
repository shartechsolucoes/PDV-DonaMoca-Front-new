import './styles.css';

interface BadgeProps {
    status: number | string,
}

const getStatus = (status: string | number) => {
    switch (status) {
        case 0:
            return {colorClass: 'bg-label-warning', label: 'Pendente'};
        case 1:
            return {colorClass: 'bg-label-success', label: 'Aprovado'};
        case 2:
            return {colorClass: 'bg-label-warning', label: 'Reprovado'};
        default:
            return {colorClass: 'bg-label-warning', label: 'Indefinido'};
    }
};

export default function Status({status}: BadgeProps) {
    const {colorClass, label} = getStatus(status);

    return (
        <div className="d-flex flex-column">
            <small className={`text-truncate d-none d-sm-block badge ${colorClass}`}>
                {label}
            </small>
        </div>
    );
}
