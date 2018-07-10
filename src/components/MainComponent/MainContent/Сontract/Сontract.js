import React, { Component } from "react";
import {
  Button,
  Layout,
  Form,
  Input,
  Checkbox,
  Table,
  Popconfirm,
  Row,
  Col,
  message
} from "antd";
import EditableCell from "./EditableCell";
import "./EditableCell.css";

const { Content } = Layout;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};

const fieldsData = {
  common: [
    { label: "Номер договора", name: "contractNumber", type: "string" },
    {
      label: "Наименование организации",
      name: "enterprise",
      type: "string"
    },
    {
      label: "В лице руководителя",
      name: "enterprisePerson",
      type: "string"
    },
    { label: "Основание", name: "base", type: "string" },
    { label: "Адрес", name: "sectionAddress", type: "string" },
    { label: "Роль", name: "sectionRole", type: "string" },
    { label: "Площадь", name: "sectionArea", type: "string" },
    { label: "Цена договора", name: "contractPrice", type: "string" }
  ]
};

const validateFields = {
  rules: [
    {
      required: true,
      message: "Поле обязательно"
    }
  ]
};

class СontractForm extends Component {
  state = {
    loading: false,
    hasTable: false,
    tableData: [],
    count: 0
  };

  columns = [
    {
      title: "Вид работ",
      dataIndex: "typeOfWork",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "typeOfWork")}
        />
      )
    },
    {
      title: "Вид пользования",
      dataIndex: "typeOfUse",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "typeOfUse")}
        />
      )
    },
    {
      title: "Расположение",
      dataIndex: "location",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "location")}
        />
      )
    },
    {
      title: "Площадь",
      dataIndex: "area",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "area")}
        />
      )
    },
    {
      title: "Срок выполнения работ",
      dataIndex: "deadline",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "deadline")}
        />
      )
    },
    {
      title: "Стоимость работ, руб",
      dataIndex: "cost",
      width: "15%",
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, "cost")}
        />
      )
    },
    {
      title: "",
      dataIndex: "operation",
      render: (text, record) => {
        return this.state.tableData.length > 1 ? (
          <Popconfirm
            title="Хотите удалить?"
            onConfirm={() => this.onDelete(record.key)}
          >
            <Button icon="delete" type="danger" />
          </Popconfirm>
        ) : null;
      }
    }
  ];

  getField = (fieldData, values = {}) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem
        {...formItemLayout}
        label={fieldData.label}
        key={fieldData.name}
      >
        {getFieldDecorator(fieldData.name, { ...validateFields })(<Input />)}
      </FormItem>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Данные для отправки: ", values);
        const dataToSave = {
          ...values,
          row: [
            [
              "string11",
              "string12",
              "string13",
              "string14",
              "string15",
              "string16"
            ],
            [
              "string21",
              "string22",
              "string23",
              "string24",
              "string25",
              "string26"
            ],
            [
              "string31",
              "string32",
              "string33",
              "string34",
              "string35",
              "string36"
            ]
          ],
          urlImage:
            "https://pp.userapi.com/c627630/v627630522/33701/GzccYfftTQA.jpg"
        };

        const data = {
          contractNumber: "string",
          enterprise: "string",
          enterprisePerson: "string",
          base: "string",
          sectionAddress: "string",
          sectionRole: "string",
          sectionArea: "string",
          contractPrice: "string",
          rows: [
            [
              "string11",
              "string12",
              "string13",
              "string14",
              "string15",
              "string16"
            ],
            [
              "string21",
              "string22",
              "string23",
              "string24",
              "string25",
              "string26"
            ],
            [
              "string31",
              "string32",
              "string33",
              "string34",
              "string35",
              "string36"
            ]
          ],
          urlImage: "http://ruinformer.com/uploads/_pages/15750/zajavlenie1.jpg"
        };
        console.log("dataToSave", dataToSave);
        console.log("data", data);
        this.downloadContract(data);
      }
    });
  };

  downloadContract = data => {
    fetch("http://wd45dev-001-site1.itempurl.com/api/Reports", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: data
    })
      .then(response => {
        return response.blob();
      })
      .then(myBlob => {
        // this.setState({
        //   loading: false
        // });
        const objectURL = URL.createObjectURL(myBlob);
        const link = document.createElement("a");
        if (typeof link.download === "undefined") {
          window.location = objectURL;
        } else {
          link.href = objectURL;
          link.download = "Договор.docx";
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      })
      .catch(error => {
        // this.setState({
        //   loading: false
        // });
        // message.error(error);
      });
  };

  hasTableCheckboxHandler = event => {
    this.setState({
      hasTable: event.target.checked
    });
  };

  handleAdd = () => {
    const { count, tableData } = this.state;
    const newData = {
      key: count,
      typeOfWork: "",
      typeOfUse: "",
      location: "",
      area: "",
      deadline: "",
      cost: ""
    };
    this.setState({
      tableData: [...tableData, newData],
      count: count + 1
    });
  };

  onDelete = key => {
    const tableData = [...this.state.tableData];
    this.setState({ tableData: tableData.filter(item => item.key !== key) });
  };

  onCellChange = (key, dataIndex) => {
    return value => {
      const tableData = [...this.state.tableData];
      const target = tableData.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ tableData });
      }
    };
  };

  componentDidMount() {}

  render() {
    const { loading, hasTable, tableData } = this.state;

    const fields = fieldsData.common.map(fieldData => this.getField(fieldData));

    return (
      <Content>
        <div style={{ padding: "10px" }}>
          <Form onSubmit={this.handleSubmit}>
            {fields}
            <FormItem>
              <Checkbox
                checked={hasTable}
                onChange={this.hasTableCheckboxHandler}
              >
                Объекты
              </Checkbox>
              {hasTable && (
                <Button onClick={this.handleAdd}>Добавить объект</Button>
              )}
            </FormItem>
            {hasTable && (
              <FormItem>
                <Table
                  dataSource={tableData}
                  columns={this.columns}
                  pagination={false}
                  locale={{ emptyText: "Нет объектов" }}
                />
              </FormItem>
            )}
            <Button
              loading={loading}
              type="primary"
              icon="download"
              htmlType="submit"
              className="download-button"
            >
              Скачать
            </Button>
          </Form>
        </div>
      </Content>
    );
  }
}

const Сontract = Form.create()(СontractForm);
export default Сontract;
