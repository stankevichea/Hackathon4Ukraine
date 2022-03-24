import { Form, Formik } from "formik";
import { FormattedMessage } from "react-intl";
import NamedInput from "../../../shared/components/NamedInput";
import NamedTextArea from "../../../shared/components/NamedTextArea";
import CheckBoxGroup from "../../../shared/components/CheckBoxGroup";
import validation from "../validation";
import "../styles/index.scss";

//TODO
const AddArticle = ({
  handleSubmit = (e) => console.log(e),
  tagList = [],
}) => {
  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: "",
          title: "",
          tags: [],
          article: "",
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <NamedInput labelId="want_help.add_article.form.name" name="name" />
          <NamedInput labelId="want_help.add_article.form.title" name="title" />

          <CheckBoxGroup
            labelId="want_help.add_article.form.tags"
            name="tags"
            values={tagList}
          />

          <NamedTextArea
            labelId="want_help.add_article.form.article"
            name="article"
          />

          <button type="submit" className="send_button">
            <FormattedMessage id="common.button.send" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddArticle;
