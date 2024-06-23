import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "..";

describe("Testing sign up form component", () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  it("To be sure about rendering all components", () => {
    const usernameInput = screen.getByPlaceholderText(/Enter the username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter the password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(
      /Enter the confirm password/i
    );
    const submitButton = screen.getByRole("button", {
      name: /Register/i,
    });
    const loginLink = screen.getByRole("link", {
      name: /Have an account/i,
    });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it("To be sure submit button is disabled when user left empty username and password fields", () => {
    const usernameInput = screen.getByPlaceholderText(/Enter the username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter the password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(
      /Enter the confirm password/i
    );
    const submitButton = screen.getByRole("button", {
      name: /Register/i,
    });

    //fill empty the user input
    fireEvent.change(usernameInput, {
      target: {
        value: "",
      },
    });

    //fill empty the password input
    fireEvent.change(passwordInput, {
      target: {
        value: "",
      },
    });

    //fill empty the confirm password input
    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "",
      },
    });

    expect(submitButton).toBeDisabled();
  });
});
