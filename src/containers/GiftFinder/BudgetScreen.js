import React from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-foundation';
import { autobind } from 'core-decorators';
import Header from '../../components/Header';
import scroll from '../../utils/scroll';
import WizardProgress from '../../components/WizardProgress';
import { wizardActions } from '../../redux/modules/wizard';
import {
  trackPageView
} from '../../utils/tracking';

import noti from '../../utils/notification';
import BUDGETS from '../../data/budgets';

@autobind
class BudgetScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }

    this.title = 'How much would you like to spend?';
  }

  componentWillMount() {
    if (!Object.keys(this.props.selections.personality).length){
      this.props.history.push('/');
    } else {
      this.setState({
        value: this.props.selections.budget
      });
      this.props.setStep('budget');
    }
  }

  componentDidMount() {
    trackPageView();
  }

  setValue(value, msg) {
    if (value === this.state.value) {
      this.setState({ value: '' });
    } else {
      this.props.setSelection('budget', value);
      this.setState({ value });
      const toast = noti();
      toast.remove('budget');
      toast.show({ content: msg || value, key: 'budget'});      
    }
  }

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/img/result-hero-${size}.jpg)`}} />
    )
  }

  goNext(selectedValue,selectedToast) {
    this.setValue(selectedValue, selectedToast);
    const toast = noti();
    toast.remove('budget');
    this.props.history.push('/find/gifts');
    this.props.completeSelection([{ value: this.state.value }]);
  }

  render() {
    return (
      <div>
        <Helmet title="Budget" />
         <section className="hero-wrapper">
          <div className="hero">
            <Header />
            <div className="row">
              <WizardProgress />
            </div>
          </div>
          <div className="hero-text row text-center">
            <button className="back chevron-hollow show-for-large" onClick={() => this.props.history.push('/find/personality')}>
              <svg className="svg-chevron-left-dims"><use xlinkHref="/giftguide/img/sprite.symbol.svg#chevron-left"/></svg> Back
            </button>
            <p className="title">{this.title}</p>
          </div>
        </section>
        <div className="rect-block-grid">
          <div className="row medium-up-3 small-up-1">
            { BUDGETS.map(b =>
              <div className={cx("rect-block-wrapper column", {selected: b.value == this.state.value})} key={b.value} onClick={() => this.goNext(b.value, b.toast)}>
                <div className={cx("rect-block", {active: b.value == this.state.value})}>
                  <p className="text-center rect-block-title">{b.label}</p>
                </div>
              </div>
            )}         
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.wizard;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    wizardActions,
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen)
