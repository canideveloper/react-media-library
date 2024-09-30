import React, { useContext, useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import FileLibrary from "../FileLibrary/FileLibrary";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

interface ReactMediaLibraryTabsProps {
  onTabChange?: (tab: string) => void;
}

const ReactMediaLibraryTabs: React.FC<ReactMediaLibraryTabsProps> = ({
  onTabChange,
}) => {
  const { type } = useContext(ReactMediaLibraryContext);
  const [currentTab, setCurrentTab] = useState<"common" | "personal">("common");
  const [isMounted, setIsMounted] = useState(false);

  const handleTabChange = (activeKey: string) => {
    setCurrentTab(activeKey as "common" | "personal");
  };

  useEffect(() => {
    if (isMounted) {
      onTabChange && onTabChange(currentTab);
    } else {
      setIsMounted(true);
    }
  }, [currentTab]);

  useEffect(() => {
    // Call onTabChange immediately when the component mounts for the first time
    onTabChange && onTabChange(currentTab);
  }, []);

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
      label: "Tài liệu",
      key: "material",
      children: <FileLibrary listType="material" />, // Sử dụng loại dữ liệu chung
    },
  ];

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
