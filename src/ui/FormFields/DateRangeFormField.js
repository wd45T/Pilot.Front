import React from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const zeroTime = moment('00:00:00', 'HH:mm:ss');
const defaultValueZeroTime = {
    defaultValue: [zeroTime, zeroTime]
};
const { RangePicker } = DatePicker;

const DateRangeFormField = ({
    form,
    label,
    dataKey,
    showZeroTime = false,
    className = '',
    ...dateProps
}) => (
    <Form.Item label={label}>
        {form.getFieldDecorator(dataKey)(
            <RangePicker
                className={`app-form-field ${className}`}
                showTime={showZeroTime ? defaultValueZeroTime : undefined}
                format="DD.MM.YYYY HH:mm:ss"
                {...dateProps}
            />
        )}
    </Form.Item>
);

export default DateRangeFormField;
