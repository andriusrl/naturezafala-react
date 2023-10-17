import React from "react"
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../../routes/Home";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<Home />);
  expect(true).toBeTruthy();
});

// describe("Jest", () => {
//   it("should work", () => {
//     expect(1).toBe(1);
//   });

//   it("should work 2", () => {
//     expect(2).toBe(2);
//   });
// });
