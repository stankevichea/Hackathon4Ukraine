import { Form, Formik } from "formik";
import { FormattedMessage } from "react-intl";
import NamedInput from "../../../shared/components/NamedInput";
import NamedTextArea from "../../../shared/components/NamedTextArea";
import CheckBoxGroup from "../../../shared/components/CheckBoxGroup";
import validation from "../validation";
import "../styles/index.scss";

//TODO
const JoinUs = ({
  handleSubmit = (e) => console.log(e),
  skillList = [],
  langList = [],
}) => {
  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: "",
          dob: "",
          skills: [],
          languages: [],
          fewWords: "",
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <NamedInput labelId="want_help.join_us.form.name" name="name" />
          <NamedInput labelId="want_help.join_us.form.dob" name="dob" />

          <CheckBoxGroup
            labelId="want_help.join_us.form.skills"
            name="tags"
            values={skillList}
          />
          <CheckBoxGroup
            labelId="want_help.join_us.form.languages"
            name="languages"
            values={langList}
          />

          <NamedTextArea
            labelId="want_help.join_us.form.few_words"
            name="fewWords"
          />

          <button type="submit" className="send_button">
            <FormattedMessage id="common.button.send" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default JoinUs;
