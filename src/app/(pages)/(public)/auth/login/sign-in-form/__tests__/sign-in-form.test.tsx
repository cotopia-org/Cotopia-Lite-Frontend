import { fireEvent, render, screen } from "@testing-library/react";
import SignInForm from "..";

describe("Testing sign in form component", () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  it("To be sure about rendering all components", () => {
    const usernameInput = screen.getByPlaceholderText(/Enter the username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter the password/i);
    const submitButton = screen.getByRole("button", {
      name: /Login/i,
    });
    const registerLink = screen.getByRole("link", {
      name: /Register/i,
    });
    const forgetPasswordLink = screen.getByRole("link", {
      name: /I don't remember my password/i,
    });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    expect(forgetPasswordLink).toBeInTheDocument();
  });

  it("To be sure submit button is disabled when user left empty username and password fields", () => {
    const usernameInput = screen.getByPlaceholderText(/Enter the username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter the password/i);
    const submitButton = screen.getByRole("button", {
      name: /Login/i,
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

    expect(submitButton).toBeDisabled();
  });
});
