import { render, screen } from "@testing-library/react";
import CotopiaInput from "..";

describe("Cotopia Input tests", () => {
  it("Show hint text when has hint text", () => {
    render(<CotopiaInput helperText='Sample Hint Text' />);

    const hintText = screen.getByText(/Sample Hint Text/i);

    expect(hintText).toBeInTheDocument();
  });
});
