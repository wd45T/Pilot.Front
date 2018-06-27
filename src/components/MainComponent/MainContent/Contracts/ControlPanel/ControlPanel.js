<<<<<<< HEAD
import React, { Component } from 'react';
import { Button, Tooltip, Modal, Menu, Dropdown, Icon } from 'antd';
import './ControlPanel.css';
=======
import React, { Component } from "react";
import { Button, Tooltip, Modal } from "antd";
import "./ControlPanel.css";
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
const confirm = Modal.confirm;

export default class ControlPanel extends Component {
  state = {};
<<<<<<< HEAD
  handleMenuClick = () => {
    const link = document.createElement('a');
    link.href = 'http://wd45dev-001-site1.itempurl.com/api/User/b&cxg';
    link.download = 'Договор1';

    document.body.appendChild(link);

    link.click();
    link.remove();
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Вы точно хотите удалить сделку?',
      content: 'Точно-точно?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {},
      onCancel() {},
=======
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
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
    });
  };
  render() {
    const { selectedRowKeys, openCursomerModal } = this.props;
    const hasSelected = selectedRowKeys.length > 0;
<<<<<<< HEAD
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleMenuClick}>
          Договор
        </Menu.Item>
        <Menu.Item key="2">Акт</Menu.Item>
        <Menu.Item key="3">Счет</Menu.Item>
      </Menu>
    );
=======
    // const menu = (
    //   <Menu onClick={this.handleMenuClick}>
    //     <Menu.Item key="1">Договор</Menu.Item>
    //     <Menu.Item key="2">Акт</Menu.Item>
    //     <Menu.Item key="3">Счет</Menu.Item>
    //   </Menu>
    // );
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
    return (
      <div className="top-bar">
        <Tooltip placement="bottomLeft" title="Добавить новую сделку">
          <Button
            className="button"
            type="primary"
            icon="plus"
            onClick={() => {
<<<<<<< HEAD
              openCursomerModal('add');
=======
              openCursomerModal("add");
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
            }}
          />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Редактировать сделку">
          <Button
            className="button"
            icon="edit"
            disabled={!hasSelected}
            onClick={() => {
<<<<<<< HEAD
              openCursomerModal('edit');
=======
              openCursomerModal("edit");
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
            }}
          />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Удалить сделку">
          <Button
            className="button"
            type="danger"
            icon="delete"
            disabled={!hasSelected}
            onClick={this.showDeleteConfirm}
          />
        </Tooltip>
<<<<<<< HEAD
        <Dropdown overlay={menu} disabled={!hasSelected}>
          <Button>
            Скачать <Icon type="down" />
          </Button>
        </Dropdown>
=======
        {/* <Dropdown overlay={menu} disabled={!hasSelected}>
          <Button>
            Скачать <Icon type="down" />
          </Button>
        </Dropdown> */}
>>>>>>> bf9035eb34e44c5589a370ad65451282a7d407f1
      </div>
    );
  }
}

// ControlPanel.propTypes = {
//     selectedRowKeys: React.PropTypes.,
//   };
