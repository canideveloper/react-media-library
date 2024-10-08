import { ReactElement } from "react";

export interface FileLibraryListItem {
  id?: number;
  uuid?: string;
  filename: string;
  original_filename: string;
  extension: string;
  thumbnail_path: string;
  path: string;
  module: string;
  mime_type: string;
  file_type: string;
  size: number;
  thumbnail_url: string;
  path_url: string;
  token?: string;

  /** Any other properties that you put in will be returned in the item data in the select, delete, & render component callbacks. **/
  [key: string]: any;
}

export interface FileLibraryPagination {
  /** Current page number. **/
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface FileLibraryProps {
  type?: "attachment" | "material";

  materialFileLibraryList?: Array<FileLibraryListItem>;

  /** Full list of items to render in the browse tab. **/
  fileLibraryList: Array<FileLibraryListItem>;

  /** Full list of common items to render in the browse tab. **/
  commonFileLibraryList?: Array<FileLibraryListItem>;

  /** Full list of personal items to render in the browse tab. **/
  personalFileLibraryList?: Array<FileLibraryListItem>;

  /** Property name to sort by. **/
  sortProperty?: "title" | "filename" | "size" | "created_at";
  /** Control to invert the sort selection. **/
  sortAscending?: boolean;
  /** Component to render for each selectable item in the browse tab. **/
  libraryCardComponent?: (item: FileLibraryListItem) => ReactElement;
  /** Component to render at the top of the modal browse tab. Mostly used for custom search bars / filters. **/
  topBarComponent?: () => ReactElement;
  /** Component to render on the side with an array of selected items. **/
  selectedItemsComponent?: () => ReactElement;
  /** Function that gets called when the user submits their file selection. Leave empty to disable the browse tab. **/
  filesSelectCallback?: (items: Array<FileLibraryListItem>) => void;
  /** Function that gets called when the user deletes their file selection. **/
  filesDeleteCallback?: (items: Array<FileLibraryListItem>) => void;
  /** Allows the user to select multiple items to submit or delete. **/
  multiSelect?: boolean;
  /** Default item(s) to be selected if ID is provided. **/
  defaultSelectedItemIds?: Array<string | number>;
}

// export interface FileLibraryPaginationProps {
//     /** Pagination object to render. **/
//     pagination: FileLibraryPagination;
//     /** Function that gets called when the user clicks on a page number. **/
//     onPageChange: (page: number) => void;
//     onItemsPerPageChange: (itemsPerPage: number) => void;
//
// }
