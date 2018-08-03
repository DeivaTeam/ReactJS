import React from 'react';
import { Link } from 'react-router-dom';
import Interchange from '../../components/Interchange';
import { trackPageView } from '../../utils/tracking';

export default class LandingPage extends React.Component {

  componentDidMount() {
    trackPageView();
  }

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/giftguide/img/home-hero-md1-${size}.jpg)`}} />
    )
  }

  render() {
    return (
      <div className="home-hero-wrapper hero-wrapper">
        <div className="home-hero collapse">
          <Interchange
            small={this.renderBanner('s')}
            medium={this.renderBanner('m')}
            large={this.renderBanner('l')}
          />
            <div className="bg-image-overlay"></div>
            <a href="https://www.redballoon.com.au" className="logo svg-logo">
              <svg className="svg-logo-white-dims"><use xlinkHref="/giftguide/img/sprite.symbol.svg#logo-white"/></svg>
            </a>
            <div className="hero-text landing text-center">
            <p className="title">The Gift Guide</p>
            <p className="subtitle">Let us help you find the<br className="small-only" /> perfect gift in minutes.</p>
          </div>
          <div className="proceed-button">
            <Link to="/find/location" className="button red-button has-width">Get Started</Link>
          </div>
        </div>
      </div>
    )
  }
}
