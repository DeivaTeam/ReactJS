import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import cx from 'classnames';

const btnClass = 'progress-btn clear';
const stepsBack = {
  location: '/',
  personality: 'location',
  budget: 'personality',
  gifts: 'budget'
};

@withRouter
@connect(state => state.wizard)
@autobind
class WizardProgress extends React.Component {

  onStepClick(e, selected, prev) {
    const { selections } = this.props;
    const previousVal = selections[prev];
    const hasPreviousSelected = prev !== 'personality' ? (!!previousVal) : !!(Object.keys(previousVal).length);
    if(!hasPreviousSelected) {
      e.preventDefault();
    }
  }

  hasValue(key) {
    const val = this.props.selections[key];
    if(!val) return false;
    else if(val instanceof Object) {
      return Object.keys(val).length > 0;
    } else {
      return true;
    }
  }

  render() {
    const { history, step } = this.props;
    return (
      <div className="progress-indicator clearfix">
        <div className="hide-for-large back-button">
          <button className="back hollow" onClick={() => history.push(stepsBack[step])}>
            <svg className="svg-arrow-left-dims">
              <use xlinkHref="/giftguide/img/sprite.symbol.svg#arrow-left"></use>
            </svg>
          </button>
        </div>
        <div className="progress-wrapper clearfix">
          <div className="indicator float-left">
            <Link
              to="/find/location"
              className={cx(btnClass, { available: this.hasValue('relation') })}
              activeClassName="active"
              onClick={e => this.onStepClick(e, 'location', 'relation')}
            >
              <div className="indicator-wrapper">
                <div className="indicator-no">1</div>
                <span className="indicator-name">Where</span>
              </div>
            </Link>
          </div>
          <span className="indicator-separator float-left"></span>
          <div className="indicator float-left">
            <Link
              to="/find/personality"
              className={cx(btnClass, { available: this.hasValue('location') })}
              activeClassName="active"
              onClick={e => this.onStepClick(e, 'personality', 'location')}
            >
              <div className="indicator-wrapper">
                <div className="indicator-no">2</div>
                <span className="indicator-name">Personality</span>
              </div>
            </Link>
          </div>
          <span className="indicator-separator float-left"></span>
          <div className="indicator float-left">
            <Link
              to="/find/budget"
              className={cx(btnClass, { available: this.hasValue('personality') })}
              activeClassName="active"
              onClick={e => this.onStepClick(e, 'budget', 'personality')}
            >
              <div className="indicator-wrapper">
                <div className="indicator-no">3</div>
                <span className="indicator-name">Budget</span>
              </div>
            </Link>
          </div>
          <span className="indicator-separator float-left"></span>
          <div className="indicator float-left">
            <Link
              to="/find/gifts"
              className={cx(btnClass, { available: this.hasValue('budget') })}
              activeClassName="active"
              onClick={e => this.onStepClick(e, 'gifts', 'budget')}
            >
              <div className="indicator-wrapper">
                <div className="indicator-no">4</div>
                <span className="indicator-name">Gifts</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(WizardProgress);
