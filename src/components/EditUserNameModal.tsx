import React, { type ReactPortal, useState } from 'react';
import ReactDom from 'react-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../styles/EditUserNameModal.css';
import { type User } from '../interfaces/User';
import { updateUserName } from '../UserApiClient';

interface FormValue { username: string }

interface EditPropType {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const EditUserNameModal = ({ setIsModalOpen, user, setUser }: EditPropType): ReactPortal => {
  const [errorApi, setErrorApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (value: FormValue): Promise<void> => {
    setLoading(true);
    await updateUserName(user.id, value.username)
      .then(res => {
        setUser(res);
        setIsModalOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorApi(true);
      })
      .finally(() => setLoading(false));
  };

  return ReactDom.createPortal(
    <>
      <div className="EditUserNameModal__background" onClick={() => setIsModalOpen(false)} />
      <div className="EditUserNameModal__container">
        <Formik
          initialValues={{ username: user.username }}
          onSubmit={(value) => submitForm(value)}
          validationSchema={Yup.object({
            username: Yup.string()
              .required('Username required')
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="EditUserNameModal__container--form">
                <label htmlFor="username">Username:</label>
                <div className="EditUserNameModal__container--form-field">
                  <Field name="username" type="text" />
                  {errorApi && <p className="input-error">Couldn't update username</p>}
                  {errors.username && touched.username ? <p className="input-error">{errors.username}</p> : null}
                </div>
              </div>
              <div className='EditUserNameModal__container--buttons'>
                <button disabled={loading} id="button-cancel" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button disabled={loading} id="button-apply" type="submit">Apply</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>,
    document.getElementById('portal')!
  );
};

export default EditUserNameModal;
