import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import { useHistory } from 'react-router-dom';
import { signInWithEmail } from '../../firebase/firebase';
const Login = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 style={{ fontSize: '5.25rem' }}>
            <span className="text-primary">&lt;&gt;</span>
            <br />
            Code<span className="text-primary">Zap</span>
          </h1>
          <br />
          <b style={{ fontSize: '1.3rem' }}>
            By Indian Society for Technical Education VIT
          </b>
        </div>
        <div className="col-lg-6">
          <div className="container">
            <div className="row">
              <div className="card text-left shadow text-center primary-styled-border col-10 offset-1">
                <img className="card-img-top" src="" alt="" />
                <div className="card-body">
                  <h4 className="card-title">LOGIN</h4>
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    validationSchema={Yup.object({
                      email: Yup.string().email().required(),
                      password: Yup.string().min(6).required(),
                    })}
                    onSubmit={async (
                      { email, password },
                      { setSubmitting }
                    ) => {
                      console.log(email, password);
                      try {
                        const user = await signInWithEmail(email, password);
                        console.log(user);
                        console.log('here');
                        history.push('/');
                        //   props.
                      } catch (err) {
                        setSubmitting(false);
                      }
                    }}
                    render={({ touched, errors }) => {
                      return (
                        <Form className={`d-flex flex-column ${styles.form}`}>
                          <div>
                            {touched.email && errors.email ? errors.email : ''}
                            <Field
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="Email"
                              required
                            />
                          </div>
                          <div>
                            {touched.password && errors.password
                              ? errors.password
                              : ''}
                            <Field
                              className="form-control"
                              type="password"
                              name="password"
                              id=""
                              placeholder="Password"
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ alignSelf: 'center' }}
                          >
                            CodeZap!
                          </button>
                        </Form>
                      );
                    }}
                  ></Formik>
                  <hr />
                  <h4 className="card-title">SIGN UP NOW</h4>
                  <button className="btn btn-primary">Sign Up!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
