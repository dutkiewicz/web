import React from 'react';
import { Formik } from 'formik';
import { FormProvider } from '../../context/FormContext';

import Registration from './Registration';
import { FIELD_GENDER, FIELD_NAME } from '../../constants';

const RegistrationContainer = () => {
  const initialValues = {
    [FIELD_GENDER]: null,
    [FIELD_NAME]: '',
    term1: false,
    term2: false
  };

  const handleSubmit = () => null;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {props => (
        <FormProvider formProps={props}>
          <Registration />
        </FormProvider>
      )}
    </Formik>
  );
};

export default RegistrationContainer;
