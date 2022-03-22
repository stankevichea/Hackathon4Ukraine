import * as Yup from 'yup';

export default Yup.object({
  company_name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  description: Yup.string().required("Required"),
});
