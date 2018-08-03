import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';

import LandingPage from './containers/LandingPage';
import RelationshipScreen from './containers/GiftFinder/RelationshipScreen';
import LocationScreen from './containers/GiftFinder/LocationScreen';
import PersonalityScreen from './containers/GiftFinder/PersonalityScreen';
import BudgetScreen from './containers/GiftFinder/BudgetScreen';
import Gifts from './containers/GiftFinder/Gifts';
import Experience from './containers/Experience';
import ScrollTop from './components/ScrollTop';

class Redirect extends React.Component {
  componentWillMount() {
    this.props.history.replace('/');
  }

  render() {
    return null;
  }
}

export default class Routes extends React.Component {
  render(){
    return (
      <BrowserRouter basename="/giftguide">
        <div>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/find/location" component={LocationScreen}/>
            <Route path="/find/personality" component={PersonalityScreen}/>
            <Route path="/find/budget" component={BudgetScreen}/>
            <Route path="/find/gifts" component={Gifts}/>
            <Route path="*" component={Redirect}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
