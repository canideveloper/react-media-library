import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Card, Image, Typography } from "antd";
import formatBytes from "../../utils/formatBytes";
import { FileLibraryListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

const { Title, Text } = Typography;

const FileLibraryCard: React.FC<FileLibraryListItem> = (
  props: FileLibraryListItem
): ReactElement => {
  const { selectedItems } = useContext(ReactMediaLibraryContext);
  const isSelected: boolean = !!selectedItems?.find(
    (element) => element.id === props.id
  );

  const [imageSrc, setImageSrc] = useState<string | null>(null); // State để lưu URL blob của ảnh

  // Giả sử bạn có hàm để xác định khi nào cần token
  const requiresToken = (url: string) => {
    // Ví dụ kiểm tra nếu url có chứa một chuỗi nhất định hoặc thuộc API yêu cầu token
    return url.includes("https://crmapi.cani.digital/api/v1/attachments/"); // Thay thế logic này bằng logic thực tế của bạn
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

  return (
    <Card
      hoverable
      className={`react-media-library__file-library-card ${
        isSelected ? "is-active" : ""
      }`}
      style={{
        borderColor: isSelected ? "#1890ff" : undefined,
        height: 200, // Chiều cao cố định cho card
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "none", // Ẩn phần tràn của nội dung
      }}
      bodyStyle={{
        padding: "12px", // Padding bên trong của card
        flex: "1 1 auto", // Để nội dung có thể co dãn
      }}
      cover={
        imageSrc && (
          <Image
            alt={props.filename}
            src={imageSrc}
            preview={false}
            style={{
              height: "100px", // Chiều cao cố định của hình ảnh
              width: "100%", // Hình ảnh chiếm toàn bộ chiều rộng card
              objectFit: "contain", // Đảm bảo hình ảnh vừa khít mà không bị méo
            }}
          />
        )
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 1 auto", // Nội dung có thể co dãn
        }}
      >
        {props.original_filename && (
          <Title
            level={2}
            className="react-media-library__file-library-card__title"
            style={{
              margin: "0 0 8px 0",
              textAlign: "center",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {props.original_filename}
          </Title>
        )}
        <ul className="react-media-library__file-library-card__list">
          {props.filename && (
            <li className="react-media-library__file-library-card__list__item">
              <Text
                style={{
                  fontSize: "0.875rem", // Kích thước nhỏ hơn cho text
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.filename}
              </Text>
            </li>
          )}
          {props.size && (
            <li className="react-media-library__file-library-card__list__item">
              <Text
                style={{
                  fontSize: "0.875rem",
                }}
              >
                {formatBytes(props.size)}
              </Text>
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default FileLibraryCard;
