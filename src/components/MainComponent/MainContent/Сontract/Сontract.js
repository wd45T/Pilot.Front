import React, { Component } from "react";
import { Button, Layout, Tooltip, Modal, Form, Input, Radio } from "antd";
import reqwest from "reqwest";

const { Content } = Layout;
const FormItem = Form.Item;

class Сontract extends Component {
  state = {
    isModalVisible: false,
    saving: false
  };

  openCursomerModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleOk = () => {
    this.setState({
      saving: true
    });

    setTimeout(() => {
      this.setState({
        saving: false
      });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  downloadContract = (params = {}) => {
    fetch("http://wd45dev-001-site1.itempurl.com/api/Reports").then(
      response => {
        console.log("response", response);
      }
    );

    reqwest({
      url: "http://wd45dev-001-site1.itempurl.com/api/Reports",
      method: "post",
      data: {
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
        urlImage:
          "https://pp.userapi.com/c627630/v627630522/33701/GzccYfftTQA.jpg"
      }
      // type: "json"
    }).then(result => {
      console.log("result.data", result.data);
      // this.setState({
      //   bankData: result.data,
      //   isBankFieldsVisible: true
      // });
      // result.data &&
      //   this.props.form.setFieldsValue({
      //     fullNameBank: result.data.fullNameBank || "",
      //     addressBank: result.data.addressBank || "",
      //     bik: result.data.bik || "",
      //     correspondingAccount: result.data.correspondingAccount || ""
      //   });
    });
  };

  componentDidMount() {
    console.log("downloadContract");
    this.downloadContract();
  }

  render() {
    const { isModalVisible, saving } = this.state;
    return (
      <Content>
        <div style={{ padding: "10px" }}>
          {/* <Tooltip placement="bottomLeft" title="Создать расписание">
            <Button
              className="button"
              type="primary"
              icon="plus"
              onClick={() => {
                this.openCursomerModal("add");
              }}
            />
          </Tooltip> */}
          {/* <СontractCreateForm
            wrappedComponentRef={this.saveFormRef}
            isModalVisible={isModalVisible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            saving={saving}
          /> */}
        </div>
      </Content>
    );
  }
}

export default Сontract;
