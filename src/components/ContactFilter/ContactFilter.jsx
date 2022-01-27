import React from "react";
import PropTypes from "prop-types";
const ContactFilter = ({ value, onChange }) => (
  <label>
    Filter
    <input type="text" value={value} onChange={onChange}></input>
  </label>
);

ContactFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
