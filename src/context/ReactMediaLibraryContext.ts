import { createContext } from "react";
import { ReactMediaLibraryContextType } from "../../types";

const reactMediaLibraryDefaultContext: ReactMediaLibraryContextType = {
  fileLibraryList: [],
  commonFileLibraryList: [],
  personalFileLibraryList: [],
  selectedItems: [],
  setSelectedItems: () => {},
  commonFileUploadCallback: async () => false,
  personalFileUploadCallback: async () => false,
  filesSelectCallback: () => {},
  // sortProperty: "create",
  sortAscending: false,
  multiSelect: false,
  defaultSelectedItemIds: [],
};

export const ReactMediaLibraryContext =
  createContext<ReactMediaLibraryContextType>(reactMediaLibraryDefaultContext);
