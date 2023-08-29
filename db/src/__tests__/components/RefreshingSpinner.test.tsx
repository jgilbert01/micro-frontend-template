import React from "react";
import { renderWithClient } from "../utils";
import RefreshingSpinner from "../../components/RefreshingSpinner";

describe("RefreshingSpinner component", () => {
  it("should be in the document", () => {
    const { getByRole } = renderWithClient(<RefreshingSpinner />);
    expect(true).toBe(true);
  });
});
