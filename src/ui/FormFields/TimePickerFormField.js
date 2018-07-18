import React from 'react';
import { Form, TimePicker } from 'antd';
import moment from 'moment';

const TimePickerFormField = ({
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
            rules:
                dateProps.disabled || dateProps.readOnly ? [] : validationRules,
        })(
            <TimePicker
                allowEmpty={false}
                format="HH:mm:ss"
                placeholder="чч:мм:сс"
                className={`app-form-field ${className}`}
                {...dateProps}
            />
        )}
    </Form.Item>
);

export default TimePickerFormField;
