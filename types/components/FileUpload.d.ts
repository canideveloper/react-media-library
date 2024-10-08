import { FileUploadStatus } from "../../src/components/FileUploadResult/FileUploadResult";

export interface FileUploadProps {
  /** Promise that gets called for every file the user attempts to upload. Return `true` or `false` depending on success. Leave empty to disable the upload tab. **/
  commonFileUploadCallback?: (file: File) => Promise<boolean>;

  personalFileUploadCallback?: (file: File) => Promise<boolean>;

  materialFileUploadCallback?: (file: File) => Promise<boolean>;

  /** Function that gets called once all the file upload promises have finished. **/
  finishUploadCallback?: (uploadFiles: Array<FileUploadListItem>) => void;
  /** List of accepted [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) types. Pass empty array to accept all. **/
  acceptedTypes?: Array<string>;
}

export interface FileUploadListItem {
  filename: string;
  //   original_filename: string;
  //   extension: string;
  //   thumbnail_path: string;
  //   path: string;
  //   module: string;
  //   file_type: string;
  //   mime_type: string;
  //   size: number;
  //   path_url: string;
  //   thumbnail_url: string;
  status: FileUploadStatus;
}
