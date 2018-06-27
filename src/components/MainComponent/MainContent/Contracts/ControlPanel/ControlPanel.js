import React, { Component } from "react";
import { Button, Tooltip, Modal, Menu, Dropdown, Icon } from "antd";
import "./ControlPanel.css";
const confirm = Modal.confirm;

export default class ControlPanel extends Component {
  state = {};
  handleMenuClick = () => {
    const data = {
      city: "string",
      com1: "string",
      dir1: "string",
      citizen: "string",
      inn: "string",
      kpp: "string",
      bank: "string",
      ra: "string",
      ka: "string",
      bik: "string",
      yAdres: "string",
      pAdres: "string",
      cirtizenReg: "string",
      citipzenP: "string",
      ciptizePasport: "string",
      ciwtizePaspwortNuwmber: "string",
      citaizePaspsorDadte: "string",
      citsizePassportIsssued: "string",
      citizeTel: "string"
    };
    fetch("http://wd45dev-001-site1.itempurl.com/api/Reports", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(function(response) {
        return response.blob();
      })
      .then(function(myBlob) {
        const objectURL = URL.createObjectURL(myBlob);
        const link = document.createElement("a");
        if (typeof link.download === "undefined") {
          window.location = objectURL;
        } else {
          link.href = objectURL;
          link.download = "Договор1.docx";

          document.body.appendChild(link);

          link.click();
          link.remove();
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  showDeleteConfirm = () => {
    confirm({
      title: "Вы точно хотите удалить сделку?",
      content: "Точно-точно?",
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {},
      onCancel() {}
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
              openCursomerModal("add");
            }}
          />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Редактировать сделку">
          <Button
            className="button"
            icon="edit"
            disabled={!hasSelected}
            onClick={() => {
              openCursomerModal("edit");
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
