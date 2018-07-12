import React, { Component } from "react";
import { Layout } from "antd";
import "./MainComponent.css";
import MainMenu from "./MainMenu/MainMenu";
import MainContent from "./MainContent/MainContent";

class MainComponent extends Component {
  render() {
    return (
      <Layout className="main-component">
        <MainMenu />
        <MainContent />
      </Layout>
    );
  }
}

export default MainComponent;
