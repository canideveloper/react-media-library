import React, { ReactElement } from "react";
import { FileUploadListProps, FileUploadListItem } from "../../../types";

export enum FileUploadStatus {
  FAILED = "failed",
  PROCESSING = "processing",
  SUCCESS = "success",
}

function renderIcon(status: FileUploadStatus): ReactElement {
  switch (status) {
    case FileUploadStatus.FAILED:
      return <span className="icon-failed" />;
    case FileUploadStatus.PROCESSING:
      return <span className="icon-processing" />;
    case FileUploadStatus.SUCCESS:
      return <span className="icon-success" />;
  }
}

function renderBadge(status: FileUploadStatus): ReactElement {
  switch (status) {
    case FileUploadStatus.FAILED:
      return (
        <div className="react-media-library__file-upload-result__list__item__badge--failed">
          Thất bại
        </div>
      );
    case FileUploadStatus.PROCESSING:
      return (
        <div className="react-media-library__file-upload-result__list__item__badge--processing">
          Đang tải
        </div>
      );
    case FileUploadStatus.SUCCESS:
      return (
        <div className="react-media-library__file-upload-result__list__item__badge--success">
          Thành công
        </div>
      );
  }
}

const FileUploadResult: React.FC<FileUploadListProps> = (
  props: FileUploadListProps
): ReactElement => {
  function renderList(): ReactElement[] {
    return props.fileUploadList.map(
      (element: FileUploadListItem, index: number) => {
        return (
          <li
            key={index}
            className={`react-media-library__file-upload-result__list__item status-${element.status}`}
          >
            {renderIcon(element.status)}
            <div className="react-media-library__file-upload-result__list__item__filename">
              {element.filename}
            </div>
            {renderBadge(element.status)}
          </li>
        );
      }
    );
  }

  return (
    <div className="react-media-library__file-upload-result">
      <h3>Các tệp đã tải lên</h3>
      <ul className="react-media-library__file-upload-result__list">
        {renderList()}
      </ul>
    </div>
  );
};

export default FileUploadResult;
