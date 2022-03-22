import { Form, Formik } from "formik";
import { FormattedMessage } from "react-intl";
import NamedInput from "../../../shared/components/NamedInput";
import NamedTextArea from "../../../shared/components/NamedTextArea";
import CheckBoxGroup from "../../../shared/components/CheckBoxGroup";
import validation from "../validation";
import "../styles/index.scss";

//TODO
const AddOrganization = ({
  handleSubmit = (e) => console.log(e),
  tagList = [],
}) => {
  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          company_name: "",
          address: "",
          email: "",
          phone: "",
          tags: [],
          description: "",
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <NamedInput
            labelId="want_help.add_org.form.company_name"
            name="company_name"
          />
          <NamedInput labelId="want_help.add_org.form.address" name="address" />
          <NamedInput labelId="want_help.add_org.form.phone" name="phone" />
          <NamedInput labelId="want_help.add_org.form.email" name="email" />

          <CheckBoxGroup
            labelId="want_help.add_org.form.tags"
            name="tags"
            values={tagList}
          />

          <NamedTextArea
            labelId="want_help.add_org.form.description"
            name="description"
          />

          <button type="submit" className="send_button">
            <FormattedMessage id="common.button.send" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddOrganization;
