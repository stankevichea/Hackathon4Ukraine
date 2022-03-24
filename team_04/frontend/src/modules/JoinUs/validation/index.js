import * as Yup from "yup";

export default Yup.object({
  name: Yup.string().required("Required"),
  dob: Yup.number().max(100).min(5).required("Required"),
  fewWords: Yup.string().required("Required"),
});
