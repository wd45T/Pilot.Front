import React, { Component } from "react";
import { Layout, Table } from "antd";
import "./Customers.css";
import reqwest from "reqwest";
import ControlPanel from "./ControlPanel/ControlPanel";

const { Content, Header } = Layout;

const columns = [
  {
    title: "Наименование",
    dataIndex: "fullName",
    sorter: true,
    // render: name => `${name.first} ${name.last}`,
    width: "25%"
  },
  {
    title: "Тип",
    dataIndex: "typeEnterprise",
    sorter: true,
    width: "10%",
    filters: [
      { text: "Юр. лицо", value: "LLC" },
      { text: "ИП", value: "Individual" }
    ]
  },
  {
    title: "ФИО руководителя",
    dataIndex: "managerName",
    sorter: true,
    width: "20%"
  },
  {
    title: "ИНН",
    dataIndex: "inn",
    sorter: true,
    width: "10%"
  },
  {
    title: "Телефон/факс",
    dataIndex: "phoneFax",
    sorter: true,
    width: "15%"
  },
  {
    title: "Эл. адрес",
    dataIndex: "email",
    width: "20%"
  }
];

class Customers extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    selectedRowKeys: [], // Check here to configure the default column
    isModalVisible: false,
    loadingModal: false
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };
  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: "http://wd45dev-001-site1.itempurl.com/api/Enterprise",
      // url: "https://randomuser.me/api",
      method: "get",
      // data: {
      //   results: 10,
      //   ...params
      // },
      type: "json"
    }).then(result => {
      this.setState({
        loading: false,
        data: result.data
      });
    });
  };
  componentDidMount() {
    this.fetch();
  }

  onSelectRow = () => {
    // this.setState({ selectedRowKeys });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  onRow = record => {
    return {
      onClick: () => {
        this.setState({ selectedRowKeys: [record.registered] });
      }, // click row
      onMouseEnter: () => {} // mouse enter row
    };
  };
  handleOk = () => {
    this.setState({ loadingModal: true });
    setTimeout(() => {
      this.setState({ loadingModal: false, isModalVisible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      type: "radio",
      onChange: this.onSelectChange,
      onSelect: this.onSelectRow
    };

    return (
      <Layout>
        <Header>
          <ControlPanel selectedRowKeys={selectedRowKeys} />
        </Header>
        <Content>
          <Table
            className="customers__table"
            columns={columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={loading}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
            onRow={this.onRow}
            locale={{
              emptyText: "Нет данных",
              filterConfirm: "Да",
              filterReset: "Сброс"
            }}
          />
        </Content>
      </Layout>
    );
  }
}

export default Customers;
