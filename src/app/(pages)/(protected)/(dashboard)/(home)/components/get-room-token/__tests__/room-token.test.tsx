import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import GetRoomToken from "../get-room-token";

const MockComponent = () => (
  <GetRoomToken onSetToken={(token) => console.log("token", token)} />
);

describe("Insert Room Token Tests", () => {
  it("renders all components", () => {
    render(<MockComponent />);
    const heading = screen.getByText(/Insert Room Token/i);
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /For the trial version, creating and adding tokens will be entered manually./i
    );
    expect(description).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Enter the token");
    expect(input).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /Enter/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("to be sure submit is not working when input field is empty", () => {
    render(<MockComponent />);
    const input = screen.getByPlaceholderText("Enter the token");

    const button = screen.getByRole("button", {
      name: /Enter/i,
    });

    //Make the input empty
    fireEvent.change(input, {
      target: {
        value: "",
      },
    });

    expect(button).toBeDisabled();
  });

  it("to be sure submit is enabled when input field is filled", async () => {
    render(<MockComponent />);

    const input = screen.getByPlaceholderText("Enter the token");
    act(() => {
      fireEvent.change(input, {
        target: {
          value: "sample-token",
        },
      });
    });

    const button = screen.getByRole("button", {
      name: /Enter/i,
    });

    expect(button).not.toBeDisabled();
  });

  it("to be sure callback function onSetToken fired", async () => {
    const mockFunction = jest.fn();

    render(<GetRoomToken onSetToken={mockFunction} />);
    const input = screen.getByPlaceholderText("Enter the token");

    const button = screen.getByRole("button", {
      name: /Enter/i,
    });

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "sample-token",
        },
      });

      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledWith("sample-token");
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });
});
