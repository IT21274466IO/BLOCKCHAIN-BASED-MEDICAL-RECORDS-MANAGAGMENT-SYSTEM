
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  dob: Yup.string().required('Date of birth is required'),
});

export default signupSchema;
