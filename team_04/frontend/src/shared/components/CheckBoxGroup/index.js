import React from "react";
import { Field } from "formik";

import "./index.scss";
import { FormattedMessage } from "react-intl";

const CheckBoxGroup = ({ labelId, name, values }) => {
  return (
    <div className="checkbox-group-wrapper">
      <div className="label">
        <FormattedMessage id={labelId} />
      </div>
      <div className="checkbox-list" role="group">
        {values &&
          values.map(({ id, label }) => (
            <div className="checkbox" key={id}>
              <label>
                <Field type="checkbox" name={name} value={id.toString()} />
                {label}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CheckBoxGroup;
