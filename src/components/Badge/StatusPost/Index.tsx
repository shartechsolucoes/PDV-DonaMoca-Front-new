import './styles.css';

interface BadgeProps {
    status: number | string,
}

const getStatus = (status: string | number) => {
    switch (status) {
        case 0:
            return {colorClass: 'bg-label-warning', label: 'Rascunho'};
        case 1:
            return {colorClass: 'bg-label-success', label: 'Publicado'};
        case 2:
            return {colorClass: 'bg-label-warning', label: 'Excluido'};
        case 3:
            return {colorClass: 'bg-label-warning', label: 'Arquivado'};
        default:
            return {colorClass: 'bg-label', label: 'Indefinido'};
    }
};

export default function StatusPost({status}: BadgeProps) {
    const statusNumber = Number(status);
    const safeStatus = isNaN(statusNumber) ? 0 : statusNumber;

    const { colorClass, label } = getStatus(safeStatus);

    return (
        <div className="d-flex flex-column">
            <small className={`text-truncate d-none d-sm-block badge ${colorClass}`}>
                {label}
            </small>
        </div>
    );
}