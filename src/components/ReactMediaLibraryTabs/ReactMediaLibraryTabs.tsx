import React, {ReactElement, useContext, useState} from "react";
import FileUpload from "../FileUpload/FileUpload";
import FileLibrary from "../FileLibrary/FileLibrary";
import {ReactMediaLibraryContext} from "../../context/ReactMediaLibraryContext";
import {FileLibraryPagination} from "../../../types/components/FileLibrary";

const ReactMediaLibraryTabs: React.FC<FileLibraryPagination> = ({current_page,last_page,total,per_page}): ReactElement => {
	const {
		fileUploadCallback,
		filesSelectCallback
	} = useContext(ReactMediaLibraryContext);
	const [currentTab, setCurrentTab] = useState<"upload" | "browse">((filesSelectCallback || !fileUploadCallback) ? "browse" : "upload");

	return (
		<div className="react-media-library__tabs">
			<div className="react-media-library__tabs__header">
				{/** Only show tab headers if both browse & upload are enabled. **/}
				{(filesSelectCallback && fileUploadCallback) && (
					<React.Fragment>
						<div
							className={`react-media-library__tabs__header__item ${(currentTab === "browse") && "is-active"}`}
						>
							<button
								type="button"
								onClick={() => setCurrentTab("browse")}
							>
								Browse Files
							</button>
						</div>
						<div
							className={`react-media-library__tabs__header__item ${(currentTab === "upload") && "is-active"}`}
						>
							<button
								type="button"
								onClick={() => setCurrentTab("upload")}
							>
								Upload File
							</button>
						</div>
					</React.Fragment>
				)}
			</div>
			{(currentTab === "browse") ? (
				<div className="react-media-library__tabs__item">
					<FileLibrary last_page={last_page} current_page={current_page} total={total} per_page={per_page}/>
				</div>
			) : (
				<div className="react-media-library__tabs__item">
					<div>
						<FileUpload/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReactMediaLibraryTabs;


