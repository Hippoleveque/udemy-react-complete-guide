import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greetings from "./Greetings";

describe("Greetings", () => {
  test("renders Hello World", () => {
    render(<Greetings />);

    const helloWorldEl = screen.getByText("Hello World", { exact: false });
    expect(helloWorldEl).toBeInTheDocument();
  });

  test("renders Original when the button is not clicked", () => {
    render(<Greetings />);

    const helloWorldEl = screen.getByText("Original", { exact: false });
    expect(helloWorldEl).toBeInTheDocument();
  });

  test("renders Changed when the button is clicked", () => {
    render(<Greetings />);

    const buttonEl = screen.getByRole("button");
    userEvent.click(buttonEl);
    const helloWorldEl = screen.getByText("Changed", { exact: false });

    expect(helloWorldEl).toBeInTheDocument();
  });

});
