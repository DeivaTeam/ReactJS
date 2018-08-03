import React from 'react';
import Helmet from 'react-helmet';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import Routes from '../Routes';
import Footer from '../components/Footer';

import '../utils/notification';

// Force default defer to `false` until Helmet works out a bug on IE11
// See: https://github.com/nfl/react-helmet/issues/336
Helmet.defaultProps.defer = false;

const isTouch = ("ontouchstart" in window) || (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2;


@connect(state => ({step: state.wizard.step}))
export default class MainViewContainer extends React.Component {
  render() {
    return (
      <div className={isTouch ? 'touch' : 'no-touch'}>
        <Helmet defaultTitle="RedBalloon Gift Guide"
                titleTemplate="%s - RedBalloon Gift Guide"
        />
        <div className={`page-wrapper ${this.props.step}`}>
          <Routes />
        </div>
        <Footer />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}
