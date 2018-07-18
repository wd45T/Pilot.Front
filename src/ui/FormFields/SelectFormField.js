import React from 'react';
import { Form, Select } from 'antd';
import { Observer } from 'mobx-react';

const filterSelectOption = (input, option) =>
  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const SelectFormField = ({
  form,
  options,
  label,
  dataKey,
  validationRules = [],
  optionKey = 'id',
  optionLabel = 'name',
  className = '',
  formItemLayout,
  initialValue = '',
  ...selectProps
}) => (
  <Observer>
    {() => (
      <Form.Item label={label} className="app-form-field" {...formItemLayout}>
        {form.getFieldDecorator(dataKey, {
          initialValue,
          rules: !selectProps.disabled ? validationRules : [],
        })(
          <Select
            showSearch
            allowClear
            className={`app-form-field ${className}`}
            filterOption={filterSelectOption}
            {...selectProps}
          >
            {options.map((o) => (
              <Select.Option key={o[optionKey]} value={o[optionKey]}>
                {o[optionLabel]}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    )}
  </Observer>
);

export default SelectFormField;
