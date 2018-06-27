import React, { Component } from 'react';
import { Button, Tooltip, Modal, Menu, Dropdown, Icon } from 'antd';
import './ControlPanel.css';
const confirm = Modal.confirm;

export default class ControlPanel extends Component {
  state = {};
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
    });
  };
  render() {
    const { selectedRowKeys, openCursomerModal } = this.props;
    const hasSelected = selectedRowKeys.length > 0;
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleMenuClick}>
          Договор
        </Menu.Item>
        <Menu.Item key="2">Акт</Menu.Item>
        <Menu.Item key="3">Счет</Menu.Item>
      </Menu>
    );
    return (
      <div className="top-bar">
        <Tooltip placement="bottomLeft" title="Добавить новую сделку">
          <Button
            className="button"
            type="primary"
            icon="plus"
            onClick={() => {
              openCursomerModal('add');
            }}
          />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Редактировать сделку">
          <Button
            className="button"
            icon="edit"
            disabled={!hasSelected}
            onClick={() => {
              openCursomerModal('edit');
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
        <Dropdown overlay={menu} disabled={!hasSelected}>
          <Button>
            Скачать <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

// ControlPanel.propTypes = {
//     selectedRowKeys: React.PropTypes.,
//   };
