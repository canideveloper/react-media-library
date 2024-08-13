import React, { ReactElement } from 'react';
import { FileLibraryPagerProps } from "../../../types";

const FileLibraryPager: React.FC<FileLibraryPagerProps> = ({
															   itemsPerPage,
															   total,
															   page,
															   pagerCallback,
															   last_page
														   }: FileLibraryPagerProps): ReactElement => {
	console.log("FileLibraryPagerProps", itemsPerPage, total, page, pagerCallback);

	// Offset determines how many pages are shown around the current page
	const offset = 2;

	// Total number of pages
	const totalPages = Math.ceil(total / itemsPerPage);

	function renderLinks(): ReactElement[] {
		const links: ReactElement[] = [];
		const prevPage = page - 1;
		const nextPage = page + 1;

		// First page button
		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-first"
				key="first"
				onClick={() => pagerCallback(1)}
				disabled={page === 1}
			>
				&lt;&lt;
			</button>
		);

		// Previous page button
		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-prev"
				key="prev"
				onClick={() => pagerCallback(prevPage)}
				disabled={page === 1}
			>
				&lt;
			</button>
		);

		// Loop to show links to a range of pages around the current page
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

		// Next page button
		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-next"
				key="next"
				onClick={() => pagerCallback(nextPage)}
				disabled={page === totalPages}
			>
				&gt;
			</button>
		);

		// Last page button
		links.push(
			<button
				type="button"
				className="react-media-library__file-library-pager__item is-last"
				key="last"
				onClick={() => pagerCallback(totalPages)}
				disabled={page === totalPages}
			>
				&gt;&gt;
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
