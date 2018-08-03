import React from 'react';
import { Link } from 'react-router-dom';

import Interchange from '../../components/Interchange';

export default class Experience extends React.Component {

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/img/result-hero-${size}.jpg)`}} />
    )
  }

  render() {
    return (
      <div>
        <section className="hero-wrapper">
          <div className="hero-text text-center">
            <p className="subheading"></p>
            <p className="title">Helicopter Flight Over Sydney  20 Minutes</p>
            <div className="subtitle show-for-medium"></div>
          </div>
          <div className="hero has-image">
            <div className="color-overlay"></div>
            <Interchange small={this.renderBanner('s')} medium={this.renderBanner('m')} large={this.renderBanner('l')} />
          </div>
        </section>
        <form className="order-form">
          <div className="row">
            <div className="small-6 columns">
              <span className="result-counter">QTY</span>
            </div>
            <div className="small-6 columns text-right">
              <span className="unit-price">$179</span>
              <select className="quantity-selector">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <hr />
            <div className="row">
              <div className="small-6 columns">
                <span className="subtotal">Subtotal</span>
              </div>
              <div className="small-6 columns text-right">
                <span className="total">$179</span>
              </div>
            </div>
            <div className="row">
              <div className="small-12 medium-6 columns">
                <div className="datepicker-wrapper">
                  <input type="text" placeholder="Select date"/>
                    <svg className="calendar-icon svg-calendar-dims"><use xlinkHref="assets/img/sprite.symbol.svg#calendar"></use></svg>
                </div>
              </div>
              <div className="small-12 medium-6 columns">
                <select>
                  <option value="1">01:00pm – Available</option>
                  <option value="2">02:00pm – Available</option>
                  <option value="3">03:00pm – Available</option>
                  <option value="4">04:00pm – Available</option>
                  <option value="5">05:00pm – Available</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="columns small-12 medium-6">
                <input type="submit" name="button_1" className="button primary first" value="INSTANT BOOK THIS DATE"/>
              </div>
              <hr className="or-separator"/>
                <div className="columns small-12 medium-6">
                  <input type="submit" name="button_2" className="button primary hollow" value="BUY EXPERIENCE"/>
                </div>
            </div>
        </form>
        <div className="booking-features row">
          <div className="small-12  medium-4 columns">
            <svg className="svg-check-dims"><use xlinkHref="assets/img/sprite.symbol.svg#check"></use></svg>
            <h4 className="features-title">Quick and Easy Booking</h4>
          </div>
          <div className="small-12  medium-4 columns">
            <svg className="svg-check-dims"><use xlinkHref="assets/img/sprite.symbol.svg#check"></use></svg>
            <h4 className="features-title">Our Price Guarantee</h4>
          </div>
          <div className="small-12  medium-4 columns end">
            <svg className="svg-check-dims"><use xlinkHref="assets/img/sprite.symbol.svg#check"></use></svg>
            <h4 className="features-title">3.5 Mil Experiences sold</h4>
          </div>
        </div>
        <div className="wishlist-section row">
          <div className="small-12 columns">
            <a href="#" className="button  hollow wishlist-btn">
              <svg className="svg-heart-dims"><use xlinkHref="assets/img/sprite.symbol.svg#heart"></use></svg>
              <span>Add to wishlist</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}