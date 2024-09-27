import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import ReactMediaLibraryTabs from "../ReactMediaLibraryTabs/ReactMediaLibraryTabs";
import { FileLibraryListItem, ReactMediaLibraryProps } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";
import FileLibraryCard from "../FileLibraryCard/FileLibraryCard";
import { FileLibrarySelectedItems } from "../FileLibrarySelectedItems";
import { FileLibraryPager } from "../FileLibraryPager";

const ReactMediaLibrary: React.FC<ReactMediaLibraryProps> = ({
  type,
  defaultSelectedItemIds,
  modalTitle = "Thư viện đa phương tiện",
  sortProperty = "created_at",
  sortAscending = false,
  isOpen = false,
  multiSelect = false,
  fileLibraryList = [],
  materialFileLibraryList = [],
  commonFileLibraryList = [],
  personalFileLibraryList = [],
  libraryCardComponent = (item) => <FileLibraryCard {...item} />,
  selectedItemsComponent = () => <FileLibrarySelectedItems />,
  acceptedTypes = ["image/*", "video/*", "audio/*"],
  onClose,
  commonFileUploadCallback,
  personalFileUploadCallback,
  finishUploadCallback,
  filesSelectCallback,
  filesDeleteCallback,
  topBarComponent,
  total,
  page,
  itemsPerPage,
  pagerCallback,
}: ReactMediaLibraryProps): ReactElement => {
  const [selectedItems, setSelectedItems] = useState<
    Array<FileLibraryListItem>
  >([]);
  const filterDefaultSelected = fileLibraryList.filter((item) =>
    defaultSelectedItemIds?.includes(item.id)
  );

  useEffect(() => {
    // Asset loads are sometimes async.
    // Need to check the default and reselect if either the file library list or default select list is updated.
    if (defaultSelectedItemIds?.length) {
      setSelectedItems(filterDefaultSelected);
    } else {
      setSelectedItems([]);
    }
  }, [fileLibraryList, defaultSelectedItemIds]);

  function handleModalOnClick(e: MouseEvent) {
    // Prevent event propagation on child elements
    if (e.currentTarget != e.target) return;
    onClose();
  }

  if (!isOpen) {
    return <React.Fragment />;
  }

  return (
    <ReactMediaLibraryContext.Provider
      value={{
        type: type,
        selectedItems: selectedItems,
        setSelectedItems: setSelectedItems,
        multiSelect: multiSelect,
        fileLibraryList: fileLibraryList,
        materialFileLibraryList: materialFileLibraryList,
        commonFileLibraryList: commonFileLibraryList,
        personalFileLibraryList: personalFileLibraryList,
        commonFileUploadCallback: commonFileUploadCallback,
        personalFileUploadCallback: personalFileUploadCallback,
        materialFileUploadCallback: personalFileUploadCallback,
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
      <div className="react-media-library" onClick={handleModalOnClick}>
        <div className="react-media-library__modal">
          <div className="react-media-library__modal__header">
            <h2 className="react-media-library__modal__header__title">
              {modalTitle}
            </h2>
            <div className="react-media-library__modal__header__close">
              <button type="button" onClick={onClose}>
                <span className="icon-close" />
              </button>
            </div>
          </div>
          <div className="react-media-library__modal__body">
            <ReactMediaLibraryTabs />

            <FileLibraryPager
              total={total}
              page={page}
              itemsPerPage={itemsPerPage}
              pagerCallback={pagerCallback}
            />
          </div>
        </div>
      </div>
    </ReactMediaLibraryContext.Provider>
  );
};

export default ReactMediaLibrary;
