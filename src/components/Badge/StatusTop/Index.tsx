import './styles.css';

interface BadgeProps {
    status: number | string,
}

const getStatus = (status: string | number) => {
    switch (status) {
        case 0:
            return {colorClass: 'bg-label-pending', label: 'Pendente'};
        case 1:
            return {colorClass: 'bg-label-approved', label: 'Aprovado'};
        case 2:
            return {colorClass: 'bg-label-disapproved', label: 'Reprovado'};
        case 3:
            return {colorClass: 'bg-label-waiting', label: 'Aguardando'};
        default:
            return {colorClass: 'bg-label-default', label: 'Indefinido'};
    }
};

export default function Badge({status}: BadgeProps) {
    const {colorClass, label} = getStatus(status);

    return (
        <div className="d-flex flex-column">
            <small className={`text-truncate d-none d-sm-block badge ${colorClass}`}>
                {label}
            </small>
        </div>
    );
}