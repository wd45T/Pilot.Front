import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./MainMenu.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;

class MainMenu extends Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link to="/customers">
              <Icon type="team" />
              <span>Клиенты</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/contracts">
              <Icon type="solution" />
              <span>Сделки</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <Link to="/documents">
              <Icon type="file" />
              <span>Документы</span>
            </Link>
          </Menu.Item> */}
          {/* <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>*/}
        </Menu>
      </Sider>
    );
  }
}
export default MainMenu;
