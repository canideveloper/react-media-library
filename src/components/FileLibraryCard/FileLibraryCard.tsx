import React, { ReactElement, useContext } from "react";
import { Card, Image, Typography } from "antd";
import formatBytes from "../../utils/formatBytes";
import formatDate from "../../utils/formatDate";
import { FileLibraryListItem } from "../../../types";
import { ReactMediaLibraryContext } from "../../context/ReactMediaLibraryContext";

const { Title, Text } = Typography;

const FileLibraryCard: React.FC<FileLibraryListItem> = (
    props: FileLibraryListItem
): ReactElement => {
  const { selectedItems } = useContext(ReactMediaLibraryContext);
  const isSelected: boolean = !!selectedItems?.find(
      (element) => element._id === props._id
  );

  return (
      <Card
          hoverable
          className={`react-media-library__file-library-card ${
              isSelected && "is-active"
          }`}
          cover={
              props.thumbnail_url && (
                  <Image
                      alt={props.filename}
                      src={props.thumbnail_url}
                      preview={false}
                  />
              )
          }
          style={{
            borderColor: isSelected ? "#1890ff" : undefined,
          }}
      >
        {props.original_filename && (
            <Title level={4} className="react-media-library__file-library-card__title">
              {props.original_filename}
            </Title>
        )}
        <ul className="react-media-library__file-library-card__list">
          {props.filename && (
              <li className="react-media-library__file-library-card__list__item">
                <Text>{props.filename}</Text>
              </li>
          )}
          {props.size && (
              <li className="react-media-library__file-library-card__list__item">
                <Text>{formatBytes(props.size)}</Text>
              </li>
          )}
          {/* {props.createdAt && (
          <li className="react-media-library__file-library-card__list__item">
            <Text>{formatDate(props.createdAt)}</Text>
          </li>
        )} */}
        </ul>
      </Card>
  );
};

export default FileLibraryCard;
