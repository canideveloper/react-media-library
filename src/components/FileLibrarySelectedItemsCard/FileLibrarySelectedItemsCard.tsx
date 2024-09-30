import React, { ReactElement, useContext, useEffect, useState } from "react";
import { FileLibraryListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

const FileLibrarySelectedItemsCard: React.FC<FileLibraryListItem> = (
  props: FileLibraryListItem
): ReactElement => {
  const { selectedItems, setSelectedItems } = useContext(
    ReactMediaLibraryContext
  );
  const [imageSrc, setImageSrc] = useState<string | null>(null); // State để lưu trữ URL blob của ảnh

  // Giả sử bạn có một hàm để xác định khi nào cần token
  const requiresToken = (url: string) => {
    // Ví dụ kiểm tra nếu url có chứa một chuỗi nhất định hoặc thuộc API yêu cầu token
    return url.includes("attachments"); // Thay thế logic này bằng logic thực tế của bạn
  };

  // Giả sử bạn có hàm để lấy token (nếu cần)
  const token = props.token; // Thay thế logic này bằng logic thực tế của bạn

  useEffect(() => {
    async function fetchImage() {
      if (props.thumbnail_url) {
        try {
          let response;
          if (requiresToken(props.thumbnail_url)) {
            // Nếu yêu cầu token, thêm header Authorization
            response = await fetch(props.thumbnail_url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl); // Lưu URL blob vào state
          } else {
            setImageSrc(props.thumbnail_url); // Lưu URL blob vào state
          }
        } catch (error) {
          console.error("Error fetching the image", error);
        }
      }
    }

    fetchImage();

    // Cleanup function để hủy URL blob khi component unmount
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [props.thumbnail_url]);

  function onRemove() {
    const newSelectedItems = [...selectedItems];
    const foundIndex = newSelectedItems.findIndex(
      (element) => element.id === props.id
    );
    if (foundIndex > -1) {
      newSelectedItems.splice(foundIndex, 1);
    }
    setSelectedItems(newSelectedItems);
  }

  return (
    <div className="react-media-library__file-library-selected-items-card">
      {imageSrc && (
        <img
          className="react-media-library__file-library-selected-items-card__image"
          src={imageSrc}
          alt={props.filename}
        />
      )}
      <div className="react-media-library__file-library-selected-items-card__info">
        <div className="react-media-library__file-library-selected-items-card__title">
          {props.filename}
        </div>
        <div className="react-media-library__file-library-selected-items-card__file-name">
          {props.original_filename}
        </div>
      </div>
      <div className="react-media-library__file-library-selected-items-card__actions">
        <button
          type="button"
          title="Remove from selected list"
          onClick={onRemove}
        >
          <span className="icon-close" />
        </button>
      </div>
    </div>
  );
};

export default FileLibrarySelectedItemsCard;
