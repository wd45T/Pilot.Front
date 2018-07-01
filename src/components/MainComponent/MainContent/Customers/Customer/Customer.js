import React, { Component } from "react";
import { Form, Select, Button, Input, message } from "antd";
import "./Customer.css";
import reqwest from "reqwest";
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
    { label: "Почтовый адрес", name: "mailingAddress", type: "string" }
  ],
  ip: [
    { label: "Полное наименование", name: "name", type: "string" },
    { label: "В лице руководителя", name: "leaderPerson", type: "string" },
    { label: "Основание", name: "base", type: "string" },
    { label: "ОГРН", name: "ogrn", type: "string" }
  ],
  fl: [{ label: "Паспорт", name: "pasport", type: "string" }],
  bank: [
    {
      label: "Полное наименование банка",
      name: "fullNameBank",
      type: "string"
    },
    { label: "Адрес банка", name: "addressBank", type: "string" },
    {
      label: "Корреспондирующий счет",
      name: "correspondingAccount",
      type: "string"
    }
    // { label: "Расчетный счет", name: "rs", type: "string" }
  ]
};

class CustomerForm extends Component {
  state = {
    loading: false,
    customerType: "",
    bankData: {},
    isBankFieldsVisible: false
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

  getField = (fieldData, values = {}) => {
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
  onChangeBik = event => {
    const bik = event.target.value;
    if (bik.length === 9) {
      this.getBankData({ bik: bik });
    }
  };

  getBankData = (params = {}) => {
    // this.setState({});
    reqwest({
      url: "http://wd45dev-001-site1.itempurl.com/api/Bank/GetByBIK",
      method: "get",
      data: {
        ...params
      },
      type: "json"
    }).then(result => {
      this.setState({
        bankData: result.data,
        isBankFieldsVisible: true
      });
      result.data &&
        this.props.form.setFieldsValue({
          fullNameBank: result.data.fullNameBank || "",
          addressBank: result.data.addressBank || "",
          bik: result.data.bik || "",
          correspondingAccount: result.data.correspondingAccount || ""
        });
    });
  };

  componentDidMount() {}

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, customerType, bankData, isBankFieldsVisible } = this.state;

    const commonFields = fieldsData.common.map(fieldData =>
      this.getField(fieldData)
    );

    const additionalFields =
      customerType &&
      fieldsData[customerType].map(fieldData => this.getField(fieldData));

    const bankFields = (
      <div>
        <FormItem {...formItemLayout} label="БИК" key="bik">
          {getFieldDecorator("bik", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input onChange={this.onChangeBik} />)}
        </FormItem>
        {isBankFieldsVisible &&
          fieldsData["bank"].map(fieldData =>
            this.getField(fieldData, bankData)
          )}
      </div>
    );

    const bankFieldsShow = customerType === "ul" || customerType === "ip";

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
          {bankFieldsShow && bankFields}
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
