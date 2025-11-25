import './styles.css';

interface BadgeProps {
    status: number | string,
}

const getStatus = (status: string | number) => {
    switch (status) {
        case 1:
            return {colorClass: 'top-label-supplier', label: 'Fornecedor'};
        case 2:
            return {colorClass: 'top-label-industry', label: 'Indústria'};
        default:
            return {colorClass: 'top-label-default', label: 'Indefinido'};
    }
};

export default function TypeTop({status}: BadgeProps) {
    const {colorClass, label} = getStatus(status);

    return (
        <div className="d-flex flex-column">
            <small className={`text-truncate d-none d-sm-block badge ${colorClass}`}>
                {label}
            </small>
        </div>
    );
}