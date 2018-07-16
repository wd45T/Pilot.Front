import React, { Component } from "react";
import { Layout, Button } from "antd";
// import "./Documents.css";
import { Link } from "react-router-dom";
const { Content } = Layout;

export default class PageNotFound extends Component {
  render() {
    return (
      <Content>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <h1>Страница не найдена</h1>
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </Content>
    );
  }
}
