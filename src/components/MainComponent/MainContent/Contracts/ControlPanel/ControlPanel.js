import React, { Component } from "react";
import { Button, Tooltip, Modal, Menu, Dropdown, Icon } from "antd";
import "./ControlPanel.css";
const confirm = Modal.confirm;

export default class ControlPanel extends Component {
  state = {};
  handleMenuClick = () => {
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
        ["string31", "string32", "string33", "string34", "string35", "string36"]
      ],
      urlImage:
        "https://pp.userapi.com/c627630/v627630522/33701/GzccYfftTQA.jpg"
    };
    fetch("http://wd45dev-001-site1.itempurl.com/api/Reports", {
      headers: {
        "Content-Type": "application/json",
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
            disabled
          />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Редактировать сделку">
          <Button
            className="button"
            icon="edit"
            // disabled={!hasSelected}
            disabled
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
