import React, { ReactElement, useContext } from "react";
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
        props.thumbnail_url && (
          <Image
            alt={props.filename}
            src={props.thumbnail_url}
            preview={false}
            style={{
              height: "100px", // Chiều cao cố định của hình ảnh
              width: "100%", // Hình ảnh chiếm toàn bộ chiều rộng card
              objectFit: "cover", // Đảm bảo hình ảnh vừa khít mà không bị méo
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
