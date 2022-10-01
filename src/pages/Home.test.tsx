import {render, screen} from '@testing-library/react';
import {timesTwo, MyComponent} from "./Home";

describe("all testing for Home", () => {
  test("Multiplies by two", () => {
    expect(timesTwo(4)).toBe(8);
  });

  test("Hello Worldが描画されている", () => {
    render(<MyComponent/>);
    screen.debug();
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  });
});
