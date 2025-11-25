import useModalStore from '../../stores/modalStore';

type IModal = {
	copy: string;
	cancelCopy: string;
	saveCopy: string;
	toggleCancel: () => void;
	toggleSave: () => void;
};

export default function Modal({
	copy,
	cancelCopy,
	saveCopy,
	toggleCancel,
	toggleSave,
}: IModal) {
	const { modal } = useModalStore((state) => state);

	return (
		<>
			<div
				className={`modal fade ${modal.open ? 'show' : ''}`}
				tabIndex={-1}
				style={{ display: modal.open ? 'block' : 'none' }}
				aria-hidden={!modal.open}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header border-bottom-0">
							{/* <h5 className="modal-title">Modal Title</h5> */}
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => toggleCancel()}
							></button>
						</div>
						<div className="modal-body text-center">{copy}</div>
						<div className="modal-footer d-flex justify-content-between border-top-0">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => toggleCancel()}
							>
								{cancelCopy}
							</button>
							<button
								type="button"
								className="nav-link text-danger"
								onClick={() => toggleSave()}
							>
								{saveCopy}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
