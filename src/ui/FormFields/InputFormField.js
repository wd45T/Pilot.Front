import React from 'react';
import { Form, Input } from 'antd';

const InputFormField = ({
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
      validateFirst: true,
    })(<Input {...inputProps} />)}
  </Form.Item>
);

export default InputFormField;
