import { createContext } from "react";
import { ReactMediaLibraryContextType } from "../../types";

const reactMediaLibraryDefaultContext: ReactMediaLibraryContextType = {
  type: "material",
  fileLibraryList: [],
  commonFileLibraryList: [],
  personalFileLibraryList: [],
  materialFileLibraryList: [],
  selectedItems: [],
  setSelectedItems: () => {},
  commonFileUploadCallback: async () => false,
  personalFileUploadCallback: async () => false,
  materialFileUploadCallback: async () => false,
  filesSelectCallback: () => {},
  // sortProperty: "create",
  sortAscending: false,
  multiSelect: false,
  defaultSelectedItemIds: [],
};

export const ReactMediaLibraryContext =
  createContext<ReactMediaLibraryContextType>(reactMediaLibraryDefaultContext);
