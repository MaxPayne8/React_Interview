import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value, // Dynamically set the `name` property to name entered in input box
    });
  };

  return [values, handleChange];
}

export default useForm;

// initialValues: The initial state of the form inputs. For example, { name: '', email: '' }.
// useState: Initializes values with initialValues and provides setValues to update this state.
// handleChange: Updates the form state when an input changes.
// It uses e.target.name to identify which input has changed and e.target.value to get the new value.
