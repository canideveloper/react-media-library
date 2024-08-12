import React, { ReactElement, useContext, useMemo, useState } from "react";
import { List, Layout, Button, Typography, Empty } from "antd";
import FileLibraryPager from "../FileLibraryPager/FileLibraryPager";
import { FileLibraryListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

const { Content, Sider } = Layout;
const { Text } = Typography;

const FileLibrary: React.FC = (): ReactElement => {
  const {
    selectedItems,
    setSelectedItems,
    sortProperty,
    sortAscending,
    multiSelect,
    fileLibraryList,
    defaultSelectedItemIds,
    libraryCardComponent,
    topBarComponent,
    selectedItemsComponent,
    filesSelectCallback,
  } = useContext(ReactMediaLibraryContext);

  const fileLibraryListSorted = useMemo(() => {
    return [...fileLibraryList].sort(sortArray);
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
          <List.Item
            key={index}
            className={`react-media-library__file-library__list__item ${
              isSelected && "is-selected"
            }`}
            onClick={() => onSelect(element)}
          >
            {libraryCardComponent?.(element)}
          </List.Item>
        );
      });
  }

  return (
    <Layout
      className={`react-media-library__file-library ${
        selectedItems.length > 0 && "has-selected"
      }`}
    >
      {topBarComponent && (
        <div className="react-media-library__file-library__top-bar">
          {topBarComponent()}
        </div>
      )}

      <Layout>
        <Content>
          {fileLibraryList?.length ? (
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={fileLibraryListSorted.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              )}
              renderItem={(item) => (
                <List.Item onClick={() => onSelect(item)}>
                  {libraryCardComponent?.(item)}
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No files available. Please upload a file." />
          )}

          {fileLibraryList?.length > itemsPerPage && (
            <FileLibraryPager
              count={fileLibraryList.length}
              page={page}
              pagerCallback={(number: number) => setPage(number)}
              itemsPerPage={itemsPerPage}
            />
          )}

          {selectedItems.length === 0 &&
            defaultSelectedItemIds &&
            defaultSelectedItemIds.length > 0 && (
              <div className="react-media-library__file-library__footer__actions">
                <Button
                  type="default"
                  onClick={() => filesSelectCallback && filesSelectCallback([])}
                >
                  Deselect File
                  {defaultSelectedItemIds.length > 1 ? "s" : ""}
                </Button>
              </div>
            )}
        </Content>

        {selectedItems.length > 0 && (
          <Sider width={300}>{selectedItemsComponent?.()}</Sider>
        )}
      </Layout>
    </Layout>
  );
};

export default FileLibrary;
