import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <FormContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormContext;
