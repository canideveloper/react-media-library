import { StoryObj } from "@storybook/react";
import ReactMediaLibrary from "../ReactMediaLibrary";
import { ReactMediaLibraryProps } from "../../../../types";
import convertFileToBase64 from "../../../utils/convertFileToBase64";
import { storiesDefaultCommonFileLibraryList } from "./_storiesDefaultFileLibraryList";
import { storiesDefaultPersonalFileLibraryList } from "./_storiesDefaultFileLibraryList";
import { FileUploadStatus } from "../../FileUploadResult/FileUploadResult";

export type ReactMediaLibraryStory = StoryObj<typeof ReactMediaLibrary>;

export const storiesDefaultPrimaryArgs: ReactMediaLibraryProps = {
  type: "attachment",
  itemsPerPage: 0,
  page: 0,
  pagerCallback(): void {},
  total: 0,
  multiSelect: false,
  isOpen: true,
  onClose: () => {},
  onTabChange(tab) {
    console.log(`Tab changed to ${tab}`);
  },
  commonFileUploadCallback: storiesDefaultFileUploadCallback,
  personalFileUploadCallback: storiesDefaultFileUploadCallback,
  fileLibraryList: [],
  commonFileLibraryList: storiesDefaultCommonFileLibraryList,
  materialFileLibraryList: [],
  personalFileLibraryList: storiesDefaultPersonalFileLibraryList,
  filesSelectCallback: (items: any[]) =>
    alert(`Selected items ${items.map((i) => i.id).join(", ")}`),
  filesDeleteCallback: (items: any[]) =>
    alert(`Deleted items ${items.map((i) => i.id).join(", ")}`),
  finishUploadCallback: (uploadFiles: any[]) =>
    alert(
      `Uploaded ${
        uploadFiles.filter((f) => f.status === FileUploadStatus.SUCCESS).length
      }/${uploadFiles.length} files!`
    ),
};

async function storiesDefaultFileUploadCallback(file: File): Promise<boolean> {
  try {
    const fileBase64 = await convertFileToBase64(file);
    alert(`Upload file ${file.name}\n ${fileBase64}`);
    return true;
  } catch {
    return false;
  }
}
