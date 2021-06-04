import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import CheckoutForm from "./CheckoutForm";


test("renders without error", () => {
    render(<CheckoutForm />)
})

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />);
    const header = screen.queryByText(/checkout form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    render (<CheckoutForm />);
    
    const firstName = screen.getByLabelText("First Name:");
    const lastName = screen.getByLabelText("Last Name:");
    const address = screen.getByLabelText("Address:");
    const city = screen.getByLabelText("City:");
    const state = screen.getByLabelText("State:");
    const zip = screen.getByLabelText("Zip:");
    const button = screen.getByRole("button");

    userEvent.type(firstName, "Zachary");
    userEvent.type(lastName, "Cooremans");
    userEvent.type(address, "1234 Some Street");
    userEvent.type(city, "Round Rock");
    userEvent.type(state, "Texas");
    userEvent.type(zip, "12345");
    userEvent.click(button);

    const success = screen.getByTestId(/successmessage/i);
    expect(success).toBeInTheDocument();
});
