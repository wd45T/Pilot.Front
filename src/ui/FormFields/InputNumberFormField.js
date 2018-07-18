import React from 'react';
import { Form, InputNumber } from 'antd';

const InputNumberFormField = ({
  form,
  label,
  dataKey,
  validationRules = [],
  className = '',
  initialValue = '',
  formItemLayout,
  ...inputProps
}) => (
  <Form.Item
    label={label}
    className={`app-form-field ${className}`}
    {...formItemLayout}
  >
    {form.getFieldDecorator(dataKey, {
      initialValue,
      rules: inputProps.disabled || inputProps.readOnly ? [] : validationRules,
      //   validateFirst: true,
    })(<InputNumber {...inputProps} />)}
  </Form.Item>
);

export default InputNumberFormField;
