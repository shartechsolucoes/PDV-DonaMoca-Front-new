import './styles.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface IPagination {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	toggleList: (setPage: number) => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	totalItems,
	toggleList,
}: IPagination) {
	return (
		<div className="row mx-3 justify-content-between my-3 pagination-container">
			<div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
				<div
					className="dt-info"
					aria-live="polite"
					id="DataTables_Table_0_info"
					role="status"
				>
					Mostrando {currentPage + 1} de {totalPages} de {totalItems} registros
				</div>
			</div>
			<div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
				{totalPages > 1 && (
					<div className="dt-paging">
						<nav className="d-flex" aria-label="pagination">
							<button
								disabled={currentPage === 0}
								className="btn border border-0"
								role="link"
								type="button"
								aria-controls="DataTables_Table_0"
								aria-current="page"
								data-dt-idx="0"
								onClick={() => toggleList(currentPage - 1)}
							>
								<FaArrowLeft color="101010" />
							</button>
							<ul className="pagination mx-2">
								{(() => {
									const visiblePages = Math.min(5, totalPages);
									let startPage = Math.max(
										0,
										currentPage - Math.floor(visiblePages / 2)
									);
									let endPage = startPage + visiblePages;

									if (endPage > totalPages) {
										endPage = totalPages;
										startPage = Math.max(0, endPage - visiblePages);
									}

									return Array.from(
										{ length: endPage - startPage },
										(_, i) => startPage + i
									).map((page) => (
										<li
											key={page}
											className={`dt-paging-button page-item pagination-button-size mx-1 ${
												page === currentPage ? 'active' : ''
											}`}
										>
											<button
												className="page-link"
												role="link"
												type="button"
												onClick={() => toggleList(page)}
											>
												{page + 1}
											</button>
										</li>
									));
								})()}
							</ul>
							<button
								disabled={currentPage + 1 === totalPages}
								className="btn border border-0"
								role="link"
								type="button"
								aria-controls="DataTables_Table_0"
								aria-current="page"
								data-dt-idx="0"
								onClick={() => toggleList(currentPage + 1)}
							>
								<FaArrowRight color="101010" />
							</button>
						</nav>
					</div>
				)}
			</div>
		</div>
	);
}
