import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./mui-theme";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends React.Component {
  state = {
    searchTerm: "",
  };

  handleSubmit = async (searchTerm) => {
    this.setState({ searchTerm });
    this.props.history.push("/");
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header onSearchSubmit={this.handleSubmit} />
        <Switch>
          <Route
            exact
            from="/"
            render={(routeProps) => <Home {...routeProps} />}
          />
        </Switch>
      </ThemeProvider>
    );
  }
}
export default withRouter(App);
