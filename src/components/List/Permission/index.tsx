type Permission = {
    id: string;
    name: string;
};

type Props = {
    permissions: Permission[];
    selected: string[];
    onToggle: (permissionId: string) => void;
};

export default function UserPermissionsList({ permissions, selected, onToggle }: Props) {
    return (
        <div className="permission-list-wrapper">
            {permissions.map((permission) => (
                <label
                    key={permission.id}
                    className={`permission-item ${selected.includes(permission.id) ? 'selected' : ''}`}
                >
                    <input
                        type="checkbox"
                        checked={selected.includes(permission.id)}
                        onChange={() => onToggle(permission.id)}
                    />
                    {permission.name}
                </label>
            ))}
        </div>
    );
}
