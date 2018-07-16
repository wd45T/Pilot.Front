import React, { Component } from "react";
import { Layout, Menu, Icon, Modal, Badge } from "antd";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import routes from "./routes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const { Content, Sider } = Layout;

class App extends Component {
  state = {
    selectedRoutes: "",
    menuItems: [],
    routerComponents: [],
    collapsed: false
  };

  componentDidMount() {
    const availableRoutes = this.getAvailableRoutes(routes);
    this.setState({
      selectedRoutes: [this.props.location.pathname],
      availableRoutes,
      menuItems: this.getMenuItems(availableRoutes),
      routerComponents: this.getRouterComponents(availableRoutes)
    });
  }

  getAvailableRoutes = (routes, parentRoute) => {
    const { auth } = this.props;
    const result = [];

    routes.forEach(route => {
      if (route.admin && !auth.user.admin) return;

      const newRoute = { ...route };

      if (parentRoute) {
        newRoute.alias = `${parentRoute.alias}-${route.alias}`;
        newRoute.to = parentRoute.to + route.to;
      }

      if (newRoute.routes) {
        newRoute.routes = this.getAvailableRoutes(newRoute.routes, newRoute);
      }

      result.push(newRoute);
    });

    return result;
  };

  getMenuItems = (routes, parentRoute) =>
    routes.map(route => {
      if (!route.text) return null;

      if (route.routes) {
        return (
          <Menu.SubMenu
            key={route.to}
            title={
              <React.Fragment>
                <Icon type={route.icon} />
                <span>{route.text}</span>
              </React.Fragment>
            }
          >
            {this.getMenuItems(route.routes, route)}
          </Menu.SubMenu>
        );
      }

      let menuItemContent = (
        <React.Fragment>
          {route.icon && <Icon type={route.icon} />}
          <span>{route.text}</span>
        </React.Fragment>
      );

      if (route.to) {
        menuItemContent = (
          <Link className="route-link" to={route.to}>
            {menuItemContent}
          </Link>
        );
      }

      return (
        <Menu.Item className="menu-item" key={route.to}>
          {menuItemContent}
        </Menu.Item>
      );
    });

  getRouterComponents = (routes, parentRoute) => {
    let result = [];

    routes.forEach(route => {
      if (!route.to) return;

      result.push(
        <Route
          key={route.to}
          exact={route.exact}
          path={route.to}
          component={route.component}
        />
      );

      if (route.routes)
        result = result.concat(this.getRouterComponents(route.routes, route));
    });

    return result;
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { menuItems, routerComponents, selectedRoutes, collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={200}
          className="app-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          trigger={null}
        >
          <Icon
            onClick={this.toggle}
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
          />
          <Menu
            onSelect={this.selectMenu}
            // selectedKeys={selectedRoutes}
            mode="inline"
            theme="dark"
          >
            <Menu.Divider />
            {menuItems}
            {/* <Menu.SubMenu
              key="profile"
              title={
                <span>
                  <Icon type="user" />
                  <span>Профиль</span>
                </span>
              }
            >
              <Menu.Item key="changePassword">Изменить пароль</Menu.Item>
            </Menu.SubMenu>
            <Menu.Divider />
            <Menu.Item key="logout" onClick={this.showLogoutConfirm}>
              <Icon type="logout" />
              <span>Выход</span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Content className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              {routerComponents}
              <Route path="/" component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
