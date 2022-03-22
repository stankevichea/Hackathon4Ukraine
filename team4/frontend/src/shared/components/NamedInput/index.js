import React from "react";
import { Field, useField } from "formik";

import "./index.scss";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

const NamedInput = ({ labelId, ...props }) => {
  const [field, meta] = useField(props);

  const { name, value, onChange } = field;
  const { touched, error } = meta;

  const labelClasses = classNames("label", { error: touched && error });

  return (
    <div className="input-wrapper">
      <div className={labelClasses}>
        <FormattedMessage id={labelId} />
      </div>
      <Field
        className="input"
        name={name}
        value={value}
        onChange={onChange}
      ></Field>
    </div>
  );
};
export default NamedInput;
