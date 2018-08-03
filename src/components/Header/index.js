import React from 'react';
import { Row, Column } from 'react-foundation';

export default class Header extends React.Component {
  render(){
    return (
      <div className="header">
        <a href="https://www.redballoon.com.au" className="logo svg-logo">
          <svg className="svg-logo-white-dims"><use xlinkHref="/giftguide/img/sprite.symbol.svg#logo-white"/></svg>
        </a>
        <p className="slogan">The Gift Guide</p>
      </div>
    )
  }
}
