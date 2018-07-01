import React, { Component } from "react";
import "./MainContent.css";
import { Switch, Route } from "react-router-dom";
import Customers from "./Customers/Customers";
import Customer from "./Customers/Customer/Customer";
import Documents from "./Documents/Documents";
import Contracts from "./Contracts/Contracts";
import PageNotFound from "./PageNotFound/PageNotFound";

class MainContent extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Customers} />
        <Route exact path="/customers" component={Customers} />
        <Route path="/customers/newCustomer" component={Customer} />
        <Route path="/customers/customer1" component={Customer} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/documents" component={Documents} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
export default MainContent;
