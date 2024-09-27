import React, { ReactElement, useContext, useMemo, useState } from "react";
import FileLibraryPager from "../FileLibraryPager/FileLibraryPager";
import { FileLibraryListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";
import { FileLibraryPagination } from "../../../types/components/FileLibrary";
import FileUpload from "../FileUpload/FileUpload"; // Import FileUpload component
import { FaUpload } from "react-icons/fa";
interface FileLibraryProps {
  listType: "common" | "personal"; // Thêm props để chọn loại danh sách
}

const FileLibrary: React.FC<FileLibraryProps> = ({
  listType,
}): ReactElement => {
  const {
    selectedItems,
    setSelectedItems,
    sortProperty,
    sortAscending,
    multiSelect,
    commonFileLibraryList,
    personalFileLibraryList,
    defaultSelectedItemIds,
    libraryCardComponent,
    topBarComponent,
    selectedItemsComponent,
    filesSelectCallback,
  } = useContext(ReactMediaLibraryContext);

  const [isUploadVisible, setIsUploadVisible] = useState<boolean>(false); // State để hiển thị FileUpload

  // Lấy dữ liệu phù hợp dựa vào listType
  const fileLibraryList =
    listType === "common" ? commonFileLibraryList : personalFileLibraryList;

  const fileLibraryListSorted = useMemo(() => {
    if (fileLibraryList) {
      return [...fileLibraryList].sort(sortArray);
    }
    return [];
  }, [fileLibraryList, sortArray]);

  const itemsPerPage = 12;
  const firstItemIndex = defaultSelectedItemIds?.length
    ? fileLibraryListSorted.findIndex(
        (item) => item.id === defaultSelectedItemIds[0]
      )
    : 0;
  const initialPage = Math.ceil((firstItemIndex + 1) / itemsPerPage);
  const [page, setPage] = useState<number>(initialPage);

  function sortArray(
    a: FileLibraryListItem,
    b: FileLibraryListItem
  ): -1 | 0 | 1 {
    try {
      let valA: any = sortProperty && a[sortProperty] ? a[sortProperty] : 0;
      let valB: any = sortProperty && b[sortProperty] ? b[sortProperty] : 0;

      if (typeof valA === "string") valA = valA.toUpperCase();
      if (typeof valB === "string") valB = valB.toUpperCase();

      if (sortAscending) {
        return valA < valB ? -1 : 1;
      } else {
        return valA > valB ? -1 : 1;
      }
    } catch {
      return 0;
    }
  }

  function onSelect(item: FileLibraryListItem) {
    const foundIndex = selectedItems.findIndex(
      (element) => element.id === item.id
    );
    if (multiSelect) {
      const newSelectedItems = [...selectedItems];
      if (foundIndex > -1) {
        newSelectedItems.splice(foundIndex, 1);
      } else {
        newSelectedItems.push(item);
      }
      setSelectedItems(newSelectedItems);
    } else {
      if (foundIndex > -1) {
        setSelectedItems([]);
      } else {
        setSelectedItems([item]);
      }
    }
  }

  function renderList(): ReactElement[] {
    if (!fileLibraryList) return [];

    const arrayStart = (page - 1) * itemsPerPage;
    let arrayEnd = arrayStart + itemsPerPage;
    if (arrayEnd > fileLibraryList.length) {
      arrayEnd = fileLibraryList.length;
    }

    return fileLibraryListSorted
      .slice(arrayStart, arrayEnd)
      .map((element: FileLibraryListItem, index: number) => {
        const isSelected: boolean = !!selectedItems.find(
          (item) => item.id === element.id
        );
        return (
          <li
            key={index}
            className={`react-media-library__file-library__list__item ${
              isSelected && "is-selected"
            }`}
            onClick={() => onSelect(element)}
          >
            {libraryCardComponent?.(element)}
          </li>
        );
      });
  }

  const handleOnUpload = () => {
    setIsUploadVisible(true); // Hiển thị component FileUpload
  };

  const handleOnBack = () => {
    setIsUploadVisible(false); // Ẩn component FileUpload
  };

  if (isUploadVisible) {
    // Nếu isUploadVisible là true, hiển thị component FileUpload
    return <FileUpload onBack={handleOnBack} module={listType} />;
  }

  return (
    <div
      className={`react-media-library__file-library ${
        selectedItems.length > 0 && "has-selected"
      }`}
    >
      {/* Nút Upload */}
      <div
        className="nav-button"
        style={{
          marginRight: "20px",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleOnUpload}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#227eff", // Màu nền
            border: "none",
            color: "white", // Màu chữ
            padding: "10px 20px", // Khoảng cách padding
            fontSize: "13px", // Kích thước chữ
            cursor: "pointer",
            borderRadius: "2px", // Bo góc nút
          }}
        >
          <FaUpload style={{ marginRight: "8px" }} />{" "}
          {/* Thêm icon trước chữ */}
          Tải lên
        </button>
      </div>

      {topBarComponent && (
        <div className="react-media-library__file-library__top-bar">
          {topBarComponent()}
        </div>
      )}

      <div className="react-media-library__file-library__row">
        <div className="react-media-library__file-library__main">
          {fileLibraryList?.length ? (
            <ul className="react-media-library__file-library__list">
              {renderList()}
            </ul>
          ) : (
            <p className="react-media-library__file-library__empty">
              No files available. Please upload a file.
            </p>
          )}

          <div className="react-media-library__file-library__footer">
            {selectedItems.length === 0 &&
              defaultSelectedItemIds &&
              defaultSelectedItemIds.length > 0 && (
                <div className="react-media-library__file-library__footer__actions">
                  <button
                    type="button"
                    className="react-media-library__file-library__footer__actions__deselect"
                    onClick={() =>
                      filesSelectCallback && filesSelectCallback([])
                    }
                  >
                    Deselect File{defaultSelectedItemIds.length > 1 ? "s" : ""}
                  </button>
                </div>
              )}
          </div>
        </div>

        {selectedItems.length > 0 && selectedItemsComponent?.()}
      </div>
    </div>
  );
};

export default FileLibrary;
