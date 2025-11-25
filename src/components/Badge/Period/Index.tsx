interface BadgeProps {
    content: string | number;
}

const getColorStyle = (content: string | number) => {
    switch (content) {
        case 'Ativo':
            return 'bg-label-success';
        case 'Suspenso':
            return 'bg-label-error';
        case 'Inativo':
            return 'bg-label-warning';
        case 'Transferido':
            return 'bg-label-info';
        default:
            return 'bg-label-success';
    }
};

export default function Badge({ content }: BadgeProps) {
    const badgeColor = getColorStyle(content);

    return (
    <div className="d-flex flex-column">
        <small className={`text-truncate d-none d-sm-block badge ${badgeColor}`}>
            {content}
        </small>
    </div>
    );
}