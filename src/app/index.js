import React from "react";
import { render } from "react-dom";
import moment from "moment";
import { LocaleProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import ruRu from "antd/lib/locale-provider/ru_RU";

import App from "./App";

import "./style.less";

moment.locale("ru");

render(
  <BrowserRouter>
    <LocaleProvider locale={ruRu}>
      <App />
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
