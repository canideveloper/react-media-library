import { FileLibraryListItem, ReactMediaLibraryProps } from "../../../../types";
import ReactMediaLibrary from "../ReactMediaLibrary";
import React, { useEffect, useState } from "react";
import { ReactMediaLibraryStory, storiesDefaultPrimaryArgs } from "./_defaults";
import { useArgs } from "@storybook/preview-api";
import {
  storiesDefaultCommonFileLibraryList,
  storiesDefaultPersonalFileLibraryList,
} from "./_storiesDefaultFileLibraryList";

export const Primary: ReactMediaLibraryStory = (
  args: ReactMediaLibraryProps
) => {
  const [fileLibraryList, setFileLibraryList] = useState<
    Array<FileLibraryListItem>
  >([]);
  const [commonFileLibraryList, setCommonFileLibraryList] = useState<
    Array<FileLibraryListItem>
  >(storiesDefaultCommonFileLibraryList); // Khởi tạo với dữ liệu mặc định
  const [personalFileLibraryList, setPersonalFileLibraryList] = useState<
    Array<FileLibraryListItem>
  >(storiesDefaultPersonalFileLibraryList); // Khởi tạo với dữ liệu mặc định
  const [myChosenItem, setMyChosenItem] = useState<FileLibraryListItem>();
  const [{ isOpen }, updateArgs] = useArgs<ReactMediaLibraryProps>();

  useEffect(() => {
    void fetchAssets();
  }, []);

  /** Simulate async loading of assets. **/
  async function fetchAssets(): Promise<void> {
    // Dữ liệu đã được gán sẵn từ mảng mặc định, không cần phải tải lại từ fetch
    // Bạn có thể thay đổi dữ liệu nếu cần tải từ API hoặc nguồn khác

    // Chọn ngẫu nhiên một item từ danh sách chung
    if (commonFileLibraryList.length > 0) {
      const myRandomItem: FileLibraryListItem =
        commonFileLibraryList[
          Math.floor(Math.random() * commonFileLibraryList.length)
        ];
      setMyChosenItem(myRandomItem);
    }
  }

  return (
    <React.Fragment>
      <button onClick={() => updateArgs({ isOpen: true })}>
        Open Media Library
      </button>

      {myChosenItem && (
        <div>
          <p>
            <strong>My selected file</strong>
          </p>

          <div
            style={{
              width: "20rem",
            }}
          >
            <img
              src={myChosenItem.thumbnail_url}
              alt={myChosenItem.filename}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>

          <p>
            Title: {myChosenItem.filename}
            <br />
            Filename: {myChosenItem.original_filename}
          </p>
        </div>
      )}

      <ReactMediaLibrary
        {...args}
        isOpen={isOpen}
        onClose={() => updateArgs({ isOpen: false })}
        fileLibraryList={fileLibraryList} // Tổng hợp cả hai loại file
        commonFileLibraryList={commonFileLibraryList} // Danh sách file "Chung"
        personalFileLibraryList={personalFileLibraryList} // Danh sách file "Cá nhân"
        defaultSelectedItemIds={[myChosenItem?.id || ""]}
        filesSelectCallback={(items) => {
          setMyChosenItem(items[0]);
          updateArgs({ isOpen: false });
        }}
      />
    </React.Fragment>
  );
};

Primary.args = {
  ...storiesDefaultPrimaryArgs,
  isOpen: false,
  fileLibraryList: [], // Dữ liệu sẽ được tải và phân loại trong hàm fetchAssets nếu cần
  commonFileLibraryList: storiesDefaultCommonFileLibraryList, // Truyền dữ liệu "Chung"
  personalFileLibraryList: storiesDefaultPersonalFileLibraryList, // Truyền dữ liệu "Cá nhân"
};
