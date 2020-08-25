import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheet/styles.css";

import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeesList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/employees"]} component={EmployeesList} />
        <Route exact path="/add" component={AddEmployee} />
      </Switch>
    </Router>
  )
}

export default App;
