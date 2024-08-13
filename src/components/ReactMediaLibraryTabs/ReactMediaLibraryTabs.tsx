import React, { useContext, useState } from "react";
import { Tabs } from 'antd';
import FileUpload from "../FileUpload/FileUpload";
import FileLibrary from "../FileLibrary/FileLibrary";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";
// import 'antd/dist/antd.css'; // Importing Ant Design styles

const { TabPane } = Tabs;

const ReactMediaLibraryTabs: React.FC = () => {
	const {
		fileUploadCallback,
		filesSelectCallback
	} = useContext(ReactMediaLibraryContext);
	const [currentTab, setCurrentTab] = useState<"upload" | "browse">((filesSelectCallback || !fileUploadCallback) ? "browse" : "upload");

	const handleTabChange = (activeKey: string) => {
		if (activeKey === "upload" || activeKey === "browse") {
			setCurrentTab(activeKey);
		}
	};

	return (
		<Tabs
			defaultActiveKey={currentTab}
			onChange={handleTabChange}
			type="card"
			className="react-media-library__tabs"
		>
			{filesSelectCallback && (
				<TabPane tab="Browse Files" key="browse">
					<FileLibrary />
				</TabPane>
			)}
			{fileUploadCallback && (
				<TabPane tab="Upload File" key="upload">
					<FileUpload />
				</TabPane>
			)}
		</Tabs>
	);
};

export default ReactMediaLibraryTabs;
