import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import ReactMediaLibraryTabs from "../ReactMediaLibraryTabs/ReactMediaLibraryTabs";
import { FileLibraryListItem, ReactMediaLibraryProps } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";
import FileLibraryCard from "../FileLibraryCard/FileLibraryCard";
import { FileLibrarySelectedItems } from "../FileLibrarySelectedItems";

const { Title } = Typography;

const ReactMediaLibrary: React.FC<ReactMediaLibraryProps> = ({
  defaultSelectedItemIds,
  modalTitle = "Media Library",
  sortProperty = "created_at",
  sortAscending = false,
  isOpen = false,
  multiSelect = false,
  fileLibraryList = [],
  libraryCardComponent = (item) => <FileLibraryCard {...item} />,
  selectedItemsComponent = () => <FileLibrarySelectedItems />,
  acceptedTypes = ["image/*", "video/*", "audio/*"],
  onClose,
  fileUploadCallback,
  finishUploadCallback,
  filesSelectCallback,
  filesDeleteCallback,
  topBarComponent,
}: ReactMediaLibraryProps): ReactElement => {
  const [selectedItems, setSelectedItems] = useState<
    Array<FileLibraryListItem>
  >([]);
  const filterDefaultSelected = fileLibraryList.filter((item) =>
    defaultSelectedItemIds?.includes(item.id)
  );

  useEffect(() => {
    if (defaultSelectedItemIds?.length) {
      setSelectedItems(filterDefaultSelected);
    } else {
      setSelectedItems([]);
    }
  }, [fileLibraryList, defaultSelectedItemIds]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <ReactMediaLibraryContext.Provider
      value={{
        selectedItems: selectedItems,
        setSelectedItems: setSelectedItems,
        multiSelect: multiSelect,
        fileLibraryList: fileLibraryList,
        fileUploadCallback: fileUploadCallback,
        finishUploadCallback: finishUploadCallback,
        filesSelectCallback: filesSelectCallback,
        filesDeleteCallback: filesDeleteCallback,
        libraryCardComponent: libraryCardComponent,
        selectedItemsComponent: selectedItemsComponent,
        topBarComponent: topBarComponent,
        sortProperty: sortProperty,
        sortAscending: sortAscending,
        acceptedTypes: acceptedTypes,
        defaultSelectedItemIds: filterDefaultSelected.map((item) => item.id),
      }}
    >
      <Modal
        title={modalTitle}
        visible={isOpen}
        onCancel={onClose}
        footer={null}
      >
        <ReactMediaLibraryTabs />
      </Modal>
    </ReactMediaLibraryContext.Provider>
  );
};

export default ReactMediaLibrary;
