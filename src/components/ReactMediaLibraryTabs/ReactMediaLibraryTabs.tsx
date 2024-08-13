import React, { useContext, useState } from "react";
import { Tabs, TabsProps } from 'antd';
import FileUpload from "../FileUpload/FileUpload";
import FileLibrary from "../FileLibrary/FileLibrary";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

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

	// Construct the tabs items here, filtering out undefined entries immediately
	const tabsItems: TabsProps['items'] = []; // Explicitly define the type to match expected type

	if (filesSelectCallback) {
		tabsItems.push({
			label: "Browse Files",
			key: "browse",
			children: <FileLibrary />
		});
	}
	if (fileUploadCallback) {
		tabsItems.push({
			label: "Upload File",
			key: "upload",
			children: <FileUpload />
		});
	}

	return (
		<Tabs
			defaultActiveKey={currentTab}
			onChange={handleTabChange}
			type="card"
			className="react-media-library__tabs"
			items={tabsItems}
		/>
	);
};

export default ReactMediaLibraryTabs;
