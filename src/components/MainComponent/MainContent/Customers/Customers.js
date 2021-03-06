import React, { Component } from "react";
import { Layout, Table, Modal, Button } from "antd";
import "./Customers.css";
import reqwest from "reqwest";
import ControlPanel from "./ControlPanel/ControlPanel";
import WrappedLogin from "./CustomerFeilds/CustomerFeilds";

const { Content } = Layout;

const columns = [
  {
    title: "Имя",
    dataIndex: "name",
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: "20%"
  },
  {
    title: "Пол",
    dataIndex: "gender",
    filters: [{ text: "М", value: "male" }, { text: "Ж", value: "female" }],
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

class Customers extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    selectedRowKeys: [], // Check here to configure the default column
    isModalVisible: false,
    loadingModal: false,
    isNewCustomerAddModal: true
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
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 10,
        ...params
      },
      type: "json"
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
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

  openCursomerModal = e => {
    this.setState({
      isModalVisible: true,
      isNewCustomerAddModal: e === "add"
    });
  };

  render() {
    const {
      loading,
      selectedRowKeys,
      isModalVisible,
      loadingModal,
      isNewCustomerAddModal
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      type: "radio",
      onChange: this.onSelectChange,
      onSelect: this.onSelectRow
    };

    return (
      <Content>
        <ControlPanel
          selectedRowKeys={selectedRowKeys}
          openCursomerModal={this.openCursomerModal}
        />
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
        />
        <Modal
          visible={isModalVisible}
          title={
            isNewCustomerAddModal
              ? "Добавление нового клиента"
              : "Данные клиента"
          }
          confirmLoading={loadingModal}
          maskClosable={false}
          width="900px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Отмена
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loadingModal}
              onClick={this.handleOk}
            >
              {loadingModal ? "Сохранение" : "Сохранить"}
            </Button>
          ]}
        >
          <WrappedLogin />
        </Modal>
      </Content>
    );
  }
}

export default Customers;
