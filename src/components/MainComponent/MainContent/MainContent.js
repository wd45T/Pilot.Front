import React, {
  Component
} from "react";
import "./MainContent.css";
import {
  Switch,
  Route
} from "react-router-dom";
import Customers from "./Customers/Customers";
import Customer from "./Customers/Customer/Customer";
import Documents from "./Documents/Documents";
import Contracts from "./Contracts/Contracts";

class MainContent extends Component {
  render() {
    return ( <
      Switch >
      <
      Route exact path = "/"
      component = {
        Customers
      }
      />{" "} <
      Route exact path = "/customers"
      component = {
        Customers
      }
      />{" "} <
      Route path = "/customers/1"
      component = {
        Customer
      }
      />{" "} <
      Route path = "/contracts"
      component = {
        Contracts
      }
      />{" "} <
      Route path = "/documents"
      component = {
        Documents
      }
      />{" "} <
      /Switch>
    );
  }
}
export default MainContent;