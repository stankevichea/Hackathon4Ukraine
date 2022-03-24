import React from "react";
import { useField } from "formik";

import "./index.scss";
import { FormattedMessage } from "react-intl";

const NamedTextArea = ({ labelId, ...props }) => {
  const [field] = useField(props);

  const { name, value, onChange } = field;

  return (
    <>
      <div className="textarea-wrapper">
        <div className="label">
          <FormattedMessage id={labelId} />
        </div>
        <textarea
          className="input"
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};
export default NamedTextArea;
