import React, { Component } from "react";
import { Form, Select, Button, Input, message } from "antd";
import "./Customer.css";
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const fieldsData = {
  common: [
    { label: "ФИО руководителя", name: "fio", type: "string" },
    { label: "ИНН", name: "inn", type: "string" },
    { label: "Юридический адрес", name: "urAddress", type: "string" },
    { label: "Телефон/факс", name: "tel", type: "string" },
    { label: "Эл. адрес", name: "mail", type: "string" }
  ],
  ul: [
    { label: "Полное наименование", name: "name", type: "string" },
    { label: "Должность руководителя", name: "leaderPosition", type: "string" },
    { label: "В лице руководителя", name: "leaderPerson", type: "string" },
    { label: "Основание", name: "base", type: "string" },
    { label: "КПП", name: "kpp", type: "string" },
    { label: "ОГРН", name: "ogrn", type: "string" },
    { label: "Почтовый адрес", name: "mailingAddress", type: "string" },
    { label: "Полное наименование банка", name: "bankName", type: "string" },
    { label: "Адрес банка", name: "bankAddress", type: "string" },
    { label: "БИК", name: "bik", type: "string" },
    { label: "Корреспондирующий счет", name: "ks", type: "string" },
    { label: "Расчетный счет", name: "rs", type: "string" }
  ],
  ip: [
    { label: "Полное наименование", name: "name", type: "string" },
    { label: "В лице руководителя", name: "leaderPerson", type: "string" },
    { label: "Основание", name: "base", type: "string" },
    { label: "ОГРН", name: "ogrn", type: "string" },
    { label: "Полное наименование банка", name: "bankName", type: "string" },
    { label: "Адрес банка", name: "bankAddress", type: "string" },
    { label: "БИК", name: "bik", type: "string" },
    { label: "Корреспондирующий счет", name: "ks", type: "string" },
    { label: "Расчетный счет", name: "rs", type: "string" }
  ],
  fl: [{ label: "Паспорт", name: "pasport", type: "string" }]
};

class CustomerForm extends Component {
  state = {
    loading: false,
    customerType: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Данные для отправки: ", values);
        this.setState({
          loading: true
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
          message.success("Информация о клиенте сохранена!");
        }, 2000);
      }
    });
  };

  selectCustomerType = customerType => {
    this.setState({
      customerType: customerType
    });
  };

  getField = fieldData => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem
        {...formItemLayout}
        label={fieldData.label}
        key={fieldData.name}
      >
        {getFieldDecorator(fieldData.name, {
          // rules: [
          //   {
          //     required: true
          //   }
          // ]
        })(<Input />)}
      </FormItem>
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, customerType } = this.state;

    const commonFields = fieldsData.common.map(fieldData =>
      this.getField(fieldData)
    );
    const additionalFields =
      customerType &&
      fieldsData[customerType].map(fieldData => this.getField(fieldData));

    return (
      <div className="customer">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Тип" hasFeedback>
            {getFieldDecorator("customerType", {
              rules: [
                {
                  required: true,
                  message: "Выберите тип клиента!"
                }
              ]
            })(
              <Select
                placeholder="Выберите тип клиента!"
                onChange={this.selectCustomerType}
              >
                <Option value="ul"> Юридическое лицо </Option>
                <Option value="ip"> Индивидуальный предприниматель </Option>
                <Option value="fl"> Физическое лицо </Option>
              </Select>
            )}
          </FormItem>
          {commonFields}
          {additionalFields}
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Customer = Form.create()(CustomerForm);
export default Customer;
