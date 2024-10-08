import { FileLibraryListItem } from "../../../../types";

export const storiesDefaultCommonFileLibraryList: Array<FileLibraryListItem> = [
  {
    id: 1,
    uuid: "1",
    filename: "document_2024.pdf",
    original_filename: "project_plan.pdf",
    extension: "pdf",
    thumbnail_path: "/thumbnails/document_2024.png",
    path: "/files/document_2024.pdf",
    module: "documents",
    mime_type: "application/pdf",
    file_type: "document",
    size: 1048576,
    thumbnail_url:
      "https://crmapi.cani.digital/api/v1/attachments/download?uuid=9d216e50-11d0-445a-91bb-2ca657b10278&thumbnail=1&signature=c7efc1a018df70f283947bbcc0cfb4258856f522e887073221de45c2cecf200d",
    path_url: "https://example.com/files/document_2024.pdf",
    created_by: "user1",
    created_at: "2024-09-26T10:00:00Z",
  },
  // {
  //   id: 2,
  //   uuid: "2",
  //   filename: "profile_picture.jpg",
  //   original_filename: "avatar.jpg",
  //   extension: "jpg",
  //   thumbnail_path: "/thumbnails/profile_picture.png",
  //   path: "/images/profile_picture.jpg",
  //   module: "images",
  //   mime_type: "image/jpeg",
  //   file_type: "image",
  //   size: 524288,
  //   thumbnail_url: "https://example.com/thumbnails/profile_picture.png",
  //   path_url: "https://example.com/images/profile_picture.jpg",
  //   created_by: "user2",
  //   created_at: "2024-09-25T14:30:00Z",
  // },
  // {
  //   id: 3,
  //   uuid: "3",
  //   filename: "presentation_2024.pptx",
  //   original_filename: "company_overview.pptx",
  //   extension: "pptx",
  //   thumbnail_path: "/thumbnails/presentation_2024.png",
  //   path: "/files/presentation_2024.pptx",
  //   module: "presentations",
  //   mime_type:
  //     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  //   file_type: "presentation",
  //   size: 2097152,
  //   thumbnail_url: "https://example.com/thumbnails/presentation_2024.png",
  //   path_url: "https://example.com/files/presentation_2024.pptx",
  //   created_by: "user3",
  //   created_at: "2024-09-24T09:15:00Z",
  // },
  // {
  //   id: 4,
  //   uuid: "4",
  //   filename: "sales_data.xlsx",
  //   original_filename: "sales_q3_2024.xlsx",
  //   extension: "xlsx",
  //   thumbnail_path: "/thumbnails/sales_data.png",
  //   path: "/files/sales_data.xlsx",
  //   module: "spreadsheets",
  //   mime_type:
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   file_type: "spreadsheet",
  //   size: 1572864,
  //   thumbnail_url: "https://example.com/thumbnails/sales_data.png",
  //   path_url: "https://example.com/files/sales_data.xlsx",
  //   created_by: "user4",
  //   created_at: "2024-09-23T12:45:00Z",
  // },
];

export const storiesDefaultPersonalFileLibraryList: Array<FileLibraryListItem> =
  [
    {
      id: 1,
      filename: "document_2024.pdf",
      original_filename: "project_plan.pdf",
      extension: "pdf",
      thumbnail_path: "/thumbnails/document_2024.png",
      path: "/files/document_2024.pdf",
      module: "documents",
      mime_type: "application/pdf",
      file_type: "document",
      size: 1048576,
      thumbnail_url:
        "https://www.loudegg.com/wp-content/uploads/2020/10/Mickey-Mouse.jpg",
      path_url:
        "https://www.loudegg.com/wp-content/uploads/2020/10/Mickey-Mouse.jpg",
      created_by: "user1",
      created_at: "2024-09-26T10:00:00Z",
    },
    {
      id: 2,
      filename: "profile_picture.jpg",
      original_filename: "avatar.jpg",
      extension: "jpg",
      thumbnail_path: "/thumbnails/profile_picture.png",
      path: "/images/profile_picture.jpg",
      module: "images",
      mime_type: "image/jpeg",
      file_type: "image",
      size: 524288,
      thumbnail_url: "https://example.com/thumbnails/profile_picture.png",
      path_url: "https://example.com/images/profile_picture.jpg",
      created_by: "user2",
      created_at: "2024-09-25T14:30:00Z",
    },
    {
      id: 3,
      filename: "presentation_2024.pptx",
      original_filename: "company_overview.pptx",
      extension: "pptx",
      thumbnail_path: "/thumbnails/presentation_2024.png",
      path: "/files/presentation_2024.pptx",
      module: "presentations",
      mime_type:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      file_type: "presentation",
      size: 2097152,
      thumbnail_url: "https://example.com/thumbnails/presentation_2024.png",
      path_url: "https://example.com/files/presentation_2024.pptx",
      created_by: "user3",
      created_at: "2024-09-24T09:15:00Z",
    },
  ];
