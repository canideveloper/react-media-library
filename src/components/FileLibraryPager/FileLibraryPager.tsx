import React, { ReactElement } from 'react';
import { FileLibraryPagerProps } from "../../../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const FileLibraryPager: React.FC<FileLibraryPagerProps> = ({

															   itemsPerPage,
															   total,
															   page,
															   pagerCallback
														   }: FileLibraryPagerProps): ReactElement => {
	// console.log("FileLibraryPagerProps", itemsPerPage, total, page, pagerCallback);

	const offset = 2;
	const totalPages = Math.ceil(total / itemsPerPage);

	function renderLinks(): ReactElement[] {
		const links: ReactElement[] = [];
		const prevPage = page - 1;
		const nextPage = page + 1;

		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-first"
				key="first"
				onClick={() => pagerCallback(1)}
				disabled={page === 1}
			>
				<FontAwesomeIcon icon={faAngleDoubleLeft} />
			</button>
		);

		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-prev"
				key="prev"
				onClick={() => pagerCallback(prevPage)}
				disabled={page === 1}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
		);

		for (let number = page - offset; number <= page + offset; number++) {
			if (number > 0 && number <= totalPages) {
				links.push(
					<button
						type="button"
						className={`react-media-library__file-library-pager__item ${number === page ? "is-active" : ""}`}
						key={number}
						onClick={() => pagerCallback(number)}
					>
						{number}
					</button>
				);
			}
		}

		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-next"
				key="next"
				onClick={() => pagerCallback(nextPage)}
				disabled={page === totalPages}
			>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
		);

		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-last"
				key="last"
				onClick={() => pagerCallback(totalPages)}
				disabled={page === totalPages}
			>
				<FontAwesomeIcon icon={faAngleDoubleRight} />
			</button>
		);

		return links;
	}

	return (
		<div className="react-media-library__file-library-pager">
			{renderLinks()}
		</div>
	);
};

export default FileLibraryPager;
