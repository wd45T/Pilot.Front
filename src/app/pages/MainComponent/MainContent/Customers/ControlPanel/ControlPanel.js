import React, { Component } from "react";
import { Button, Tooltip, Modal } from "antd";
import { Link } from "react-router-dom";
import "./ControlPanel.css";
const confirm = Modal.confirm;

export default class ControlPanel extends Component {
  state = {};
  handleMenuClick = () => {};

  showDeleteConfirm = () => {
    confirm({
      title: "Вы точно хотите удалить клиента?",
      content: "Точно-точно?",
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {},
      onCancel() {}
    });
  };
  render() {
    const { selectedRowKeys } = this.props;
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="top-bar">
        <Tooltip placement="bottomLeft" title="Добавить нового клиента">
          <Link to="customers/newCustomer">
            <Button className="button" type="primary" icon="plus" />
          </Link>
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Редактировать данные клиента">
          <Link to="customers/customer1">
            <Button className="button" icon="edit" disabled={!hasSelected} />
          </Link>
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Удалить клиента">
          <Button
            className="button"
            type="danger"
            icon="delete"
            disabled={!hasSelected}
            onClick={this.showDeleteConfirm}
          />
        </Tooltip>
      </div>
    );
  }
}
