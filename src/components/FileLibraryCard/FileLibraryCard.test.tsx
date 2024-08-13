import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import FileLibraryCard from "./FileLibraryCard";

describe("Running Test for FileLibraryCard", () => {
  test("Check title is displaying", () => {
    render(
      <FileLibraryCard
        title={"My custom title"}
        size={1575684}
        createdAt={new Date()}
        thumbnailUrl={"https://loremflickr.com/640/360"}
        description={"This is what a selectable card will look like."}
        fileName={"my-favorite-image.jpg"}
        id={0}
        filename={"my-favorite-image"}
        original_filename={""}
        extension={""}
        thumbnail_path={""}
        path={""}
        module={""}
        mime_type={""}
        file_type={""}
        thumbnail_url={""}
        path_url={""}
      />
    );
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "my-favorite-image";
      })
    ).toBeInTheDocument();
  });
});
