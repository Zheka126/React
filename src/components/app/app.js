import React, {Component} from "react";

import Header from "../header/header";
import RandomPlanet from "../randomPlanet/randomPlanet";
import ErrorIndicator from "../errorIndicator/errorIndicator";
import SwapiService from "../../services/swapiService";
import DummySwapiService from "../../services/DummySwapiService";
import {SwapiServiceProvider} from "../swapiServiceContext/swapiServiceContext";
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage,
} from "../pages/index";

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import {StarshipDetails} from "../sw-components";
import "./app.css";

export default class App extends Component {
  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({isLoggedIn: true});
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      console.log(Service.name);

      return {
        swapiService: new Service(),
      };
    });
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {
    const {isLoggedIn} = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <SwapiServiceProvider value={this.state.swapiService}>
        <Router>
          <div className='stardb-app'>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <Switch>
              <Route path='/' render={() => <h2>Welcome to StarDB</h2>} exact />
              <Route path='/people/:id?' component={PeoplePage} />
              <Route path='/planets' component={PlanetsPage} />
              <Route path='/starships' component={StarshipsPage} exact />
              <Route
                path='/starships/:id'
                render={({match}) => {
                  const {id} = match.params;
                  return <StarshipDetails itemId={id} />;
                }}
              />
              <Route
                path='/login'
                render={() => (
                  <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                )}
              />
              <Route
                path='/secret'
                render={() => <SecretPage isLoggedIn={isLoggedIn} />}
              />
              <Redirect to='/'/>
            </Switch>
          </div>
        </Router>
      </SwapiServiceProvider>
    );
  }
}
