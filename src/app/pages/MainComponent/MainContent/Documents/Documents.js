import React, { Component } from "react";
import { Layout } from "antd";
import "./Documents.css";
const { Content } = Layout;

class Documents extends Component {
  render() {
    return (
      <Content>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          Documents
        </div>
      </Content>
    );
  }
}
export default Documents;
