import React from "react";
import useForm from "../utils/custom-hook/formHook";
const MyForm = () => {
  const [formValues, handleInputChange] = useForm({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-col gap-5 mt-52 "
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          className="border-2 border-black"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          className="border-2 border-black"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

//  Breakdown of MyForm Component:

// useForm({ name: '', email: '' }):

// Initializes the form state with { name: '', email: '' }.
// Returns formValues (e.g., { name: '', email: '' }) and handleInputChange function.
// formValues:

// Holds the current state of the form inputs.
// formValues.name and formValues.email are used to set the value of respective input fields.
// handleInputChange:

// Attached to onChange of each input field.
// Updates the formValues state when the input value changes.
// Uses the name attribute of the input to determine which field to update.
// handleSubmit:

// Handles form submission.
// Prevents the default form submission behavior with e.preventDefault().
// Logs the current form values to the console.
