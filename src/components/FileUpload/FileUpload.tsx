import React, { ReactElement, useContext, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import FileUploadResult, {
  FileUploadStatus,
} from "../FileUploadResult/FileUploadResult";
import { FileUploadListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

interface FileUploadProps {
  module: string; // Module của file
  onBack: () => void; // Prop để xử lý sự kiện Back
}

const FileUpload: React.FC<FileUploadProps> = ({
  module,
  onBack,
}): ReactElement => {
  const {
    type,
    commonFileUploadCallback,
    personalFileUploadCallback,
    materialFileUploadCallback,
    finishUploadCallback,
    acceptedTypes,
  } = useContext(ReactMediaLibraryContext);
  const [fileUploadList, setFileUploadList] = useState<
    Array<FileUploadListItem>
  >([]);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
  };
  // Convert accepted types if provided
  if (acceptedTypes && acceptedTypes.length > 0) {
    dropzoneOptions.accept = {};
    for (const type of acceptedTypes) {
      dropzoneOptions.accept[type] = [];
    }
  }
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  async function onDrop(acceptedFiles: Array<File>): Promise<void> {
    // Prepend uploaded file list with new upload items
    let newFileUploadList: Array<FileUploadListItem> = acceptedFiles
      .map((element: File) => {
        return {
          filename: element.name,
          status: FileUploadStatus.PROCESSING,
        };
      })
      .concat(fileUploadList);
    setFileUploadList(newFileUploadList);

    // Loop through new upload items
    for (const index in acceptedFiles) {
      const file = acceptedFiles[index];
      let result = false;
      if (type === "attachment") {
        if (module === "common" && commonFileUploadCallback) {
          result = await commonFileUploadCallback(file);
        } else if (personalFileUploadCallback) {
          result = await personalFileUploadCallback(file);
        }
      } else if (materialFileUploadCallback) {
        result = await materialFileUploadCallback(file);
      }
      newFileUploadList = [...newFileUploadList];
      newFileUploadList[index].status = result
        ? FileUploadStatus.SUCCESS
        : FileUploadStatus.FAILED;
      setFileUploadList(newFileUploadList);
    }

    finishUploadCallback?.(newFileUploadList);

    // Kiểm tra nếu tất cả các file đã hoàn tất (không còn file nào ở trạng thái PROCESSING)
    const allUploadsFinished = newFileUploadList.every(
      (file) =>
        file.status === FileUploadStatus.SUCCESS ||
        file.status === FileUploadStatus.FAILED
    );

    if (allUploadsFinished) {
      // Gọi hàm onBack để quay lại màn hình trước đó
      onBack();
    }
  }

  return (
    <React.Fragment>
      {/* Nút Back */}
      <div
        className="nav-button"
        style={{
          marginLeft: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={onBack}
          className="react-media-library__file-upload__back"
        >
          <FaArrowLeft style={{ marginLeft: "8px" }} /> Quay lại
        </button>
      </div>
      {/* Tải lên thư mục chung hoặc cá nhân tuỳ theo module */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h2>Tải lên thư mục {module === "common" ? "chung" : "cá nhân"}</h2>
      </div>

      {/* Hiển thị khu vực Drop */}
      <div
        className={`react-media-library__file-upload ${
          isDragActive && "is-drag-active"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Kéo thả file vào đây</p>
        ) : (
          <p>Thả file vào đây hoặc click để chọn file</p>
        )}
      </div>
      {fileUploadList.length > 0 && (
        <FileUploadResult fileUploadList={fileUploadList} />
      )}
    </React.Fragment>
  );
};

export default FileUpload;
