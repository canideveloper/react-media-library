import { FileLibraryListItem, ReactMediaLibraryProps } from "../../../../types";
import ReactMediaLibrary from "../ReactMediaLibrary";
import React, { ReactElement, useContext } from "react";
import { ReactMediaLibraryStory, storiesDefaultPrimaryArgs } from "./_defaults";
import { ReactMediaLibraryContext } from "../../../context/ReactMediaLibraryContext";
import { useArgs } from "@storybook/preview-api";

const CustomLibraryCard: React.FC<FileLibraryListItem> = (
  props: FileLibraryListItem
): ReactElement => {
  const { selectedItems } = useContext(ReactMediaLibraryContext);
  const isSelected: boolean = !!selectedItems.find(
    (element) => element.id === props.id
  );

  return (
    <div
      style={{
        backgroundColor: isSelected ? "skyblue" : "white",
      }}
    >
      <h5>{props.title}</h5>
      <p>This is custom content for {props.fileName} that I wish to display.</p>
    </div>
  );
};
export const CustomCard: ReactMediaLibraryStory = (
  args: ReactMediaLibraryProps
) => {
  const [{}, updateArgs] = useArgs<ReactMediaLibraryProps>();

  return (
    <React.Fragment>
      <button onClick={() => updateArgs({ isOpen: true })}>
        Open Media Library
      </button>
      <ReactMediaLibrary
        {...args}
        onClose={() => updateArgs({ isOpen: false })}
      />
    </React.Fragment>
  );
};
CustomCard.args = {
  ...storiesDefaultPrimaryArgs,
  libraryCardComponent: (item) => <CustomLibraryCard {...item} />,
};
