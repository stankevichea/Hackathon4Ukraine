import * as Yup from "yup";

export default Yup.object({
  name: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  article: Yup.string().required("Required"),
});
