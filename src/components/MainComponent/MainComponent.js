import React, { Component } from "react";
import { Layout } from "antd";
import "./MainComponent.css";
import MainMenu from "./MainMenu/MainMenu";
import MainContent from "./MainContent/MainContent";
const { Header } = Layout;

class MainComponent extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <MainMenu />
        <Layout>
          <Header style={{ background: "#fff", padding: 0, height: 0 }} />
          <MainContent />
          {/* <Footer style={{ textAlign: "center", height: 0 }}>
            IG ©2018 Created by Vagiz Akhmetov
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default MainComponent;
