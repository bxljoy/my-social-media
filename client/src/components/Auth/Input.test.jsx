import { render, screen, logRoles } from "@testing-library/react";
import Input from "./Input";

test("renders Input component", () => {
  const { container } = render(<Input />);
  logRoles(container);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});
