import React, { useContext, useState } from "react";
import { Tabs, TabsProps } from "antd";
import FileUpload from "../FileUpload/FileUpload";
import FileLibrary from "../FileLibrary/FileLibrary";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

const ReactMediaLibraryTabs: React.FC = () => {
  const { type } = useContext(ReactMediaLibraryContext);
  const [currentTab, setCurrentTab] = useState<"common" | "personal">("common");

  const handleTabChange = (activeKey: string) => {
    setCurrentTab(activeKey as "common" | "personal");
  };

  const attachmentTabsItems: TabsProps["items"] = [
    {
      label: "Thư viện chung",
      key: "common",
      children: <FileLibrary listType="common" />, // Sử dụng loại dữ liệu chung
    },
    {
      label: "Thư viện cá nhân",
      key: "personal",
      children: <FileLibrary listType="personal" />, // Sử dụng loại dữ liệu cá nhân
    },
  ];

  const materialTabsItems: TabsProps["items"] = [
    {
      label: "Thư viện chung",
      key: "material",
      children: <FileLibrary listType="material" />, // Sử dụng loại dữ liệu chung
    },
  ];

  //   if (fileUploadCallback) {
  //     tabsItems.push({
  //       label: "Tải lên",
  //       key: "upload",
  //       children: <FileUpload />,
  //     });
  //   }

  return (
    <Tabs
      defaultActiveKey={currentTab}
      onChange={handleTabChange}
      type="card"
      className="react-media-library__tabs"
      items={type === "attachment" ? attachmentTabsItems : materialTabsItems}
    />
  );
};

export default ReactMediaLibraryTabs;
