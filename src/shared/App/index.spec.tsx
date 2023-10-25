import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../routes/Home";

describe("Jest", () => {
  it("should work", () => {
    expect(1).toBe(1);
  });

  it("should display elements", () => {
    render(<Home />);

    // screen.debug()

    // const elementWithNatureza = screen.getByText("Natureza Fala");
    const elementWithNatureza = screen.getByText(/Natureza/i);

    expect(elementWithNatureza).toBeInTheDocument();
  });
});
