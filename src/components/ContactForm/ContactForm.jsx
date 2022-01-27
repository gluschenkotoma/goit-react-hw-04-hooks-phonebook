import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import s from './ContactForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ErrorText = styled.p`
  color: red;
`;

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name can contain only letters, ', - and space. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc."
    )
    .required(),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number should contain only numbers and it also could contain spaces, dash, parenthesis and startts with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values);

    console.log(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <div>
              <Field
                className={s.fieldInput}
                name="name"
                type="text"
                placeholder="Name"
              />
              <FormError name="name" />
            </div>
          </div>
          <div>
            <label htmlFor="number">Phone number:</label>
            <div>
              <Field
                className={s.fieldInput}
                name="number"
                type="text"
                placeholder="number"
              />
              <FormError name="number" />
            </div>
          </div>
          <button className={s.button} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

// Formik -компонент обертка
// initialValues={{ name: '', ... }}
// onSubmit={(values, actions) -
// values: {name: '', age: '', email: ''} обьект собраных значений
// actions:   ProductReviewForm.jsx:20 actions: {resetForm: ƒ, validateForm: ƒ, validateField: ƒ, setErrors: ƒ, setFieldError: ƒ, …}
// actions ->полезные методы || свой метод
// validationSchema={schema}- валидация схемы
// ErrorMessage- показывает где сработала валидация с ошибками
