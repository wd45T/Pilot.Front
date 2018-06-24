import React, { Component } from "react";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Input,
  message
} from "antd";
import "./Customer.css";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class CustomerForm extends Component {
  state = {
    loading: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    return (
      <div className="customer">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Наименование">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Введите наименование!"
                }
              ]
            })(<Input size="large" placeholder="Введите наименование!" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Тип" hasFeedback>
            {getFieldDecorator("select", {
              rules: [
                {
                  required: true,
                  message: "Выберите тип клиента!"
                }
              ]
            })(
              <Select placeholder="Выберите тип клиента!">
                <Option value="ul"> Юридическое лицо </Option>
                <Option value="ip"> Индивидуальный предприниматель </Option>
                <Option value="fl"> Физическое лицо </Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="ФИО руководителя">
            {getFieldDecorator("fio", {
              rules: [
                {
                  required: true,
                  message: "Введите ФИО!"
                }
              ]
            })(<Input placeholder="Введите ФИО!" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Должность руководителя">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="В лице руководителя">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Основание">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="ИНН">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="КПП">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="ОГРН">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Юридический адрес">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Почтовый адрес">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Телефон/факс">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Эл. адрес">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Полное наименование банка">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Адрес банка">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="БИК">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Корреспондирующий счет">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Расчетный счет">
            <Input />
          </FormItem>
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
