import React from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const DatePickerFormField = ({
  form,
  label,
  dataKey,
  className = '',
  formItemLayout,
  validationRules,
  initialValue = moment(),
  ...dateProps
}) => (
  <Form.Item {...formItemLayout} label={label}>
    {form.getFieldDecorator(dataKey, {
      initialValue,
      rules: dateProps.disabled || dateProps.readOnly ? [] : validationRules,
    })(
      <DatePicker
        allowClear={false}
        format="DD.MM.YYYY"
        placeholder="дд:мм:гггг"
        className={`app-form-field ${className}`}
        {...dateProps}
      />
    )}
  </Form.Item>
);

export default DatePickerFormField;
