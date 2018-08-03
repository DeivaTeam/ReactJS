import React from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-foundation';
import { autobind } from 'core-decorators';
import scroll from '../../utils/scroll';
import Header from '../../components/Header';
import WizardProgress from '../../components/WizardProgress';
import { wizardActions } from '../../redux/modules/wizard';
import noti from '../../utils/notification';
import {
  trackPageView
} from '../../utils/tracking';

import PERSONALITIES from '../../data/personalities';

@autobind
class PersonalityScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: {}
    }

    this.title = 'How would you describe him? Select up to three options.';
  }

  componentWillMount() {
    if (!this.props.selections.location){
      this.props.history.push('/');
    } else {
      this.setState({
        value: this.props.selections.personality
      });
      this.props.setStep('personality');
    }
  }

  componentDidMount() {
    trackPageView();
  }

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/img/result-hero-${size}.jpg)`}} />
    )
  }

  constructStateForTracking() {
    const { value } = this.state;
    let array = [];

    Object.keys(value).map(key => array.push({ value: key }));

    return array;
  };

  goNext() {
    const toast = noti();
    toast.remove('trait');
    this.props.history.push('/find/budget');
    this.props.completeSelection(this.constructStateForTracking());
  }

  setPersonality(p, msg) {
    const { value } = this.state;
    const count = Object.keys(value).length;

    if(value[p]) {
      delete value[p];
    } else if(count < 3) {
      value[p] = true;
    } else {
      const lastKey = Object.keys(value)[2];
      delete value[lastKey];
      value[p] = true;
    }

    this.props.setSelection('personality', value);

    this.setState({ value }, () => {
      if(Object.keys(value).length === 3) {
        const toast = noti();
        toast.remove('trait');
        toast.show({ content: msg || p, key: 'trait'});
      }
      const anchor = document.querySelector('.proceed-button');
      scroll.animateScroll(anchor);
    });
  }

  render() {
    return (
      <div>
        <Helmet title="Personality" />
        <section className="hero-wrapper">
            <div className="hero">
              <Header />
              <div className="row">
                <WizardProgress />
              </div>
          </div>
          <div className="hero-text row text-center">
            <button className="back chevron-hollow show-for-large" onClick={() => this.props.history.push('/find/location')}>
              <svg className="svg-chevron-left-dims"><use xlinkHref="/giftguide/img/sprite.symbol.svg#chevron-left"/></svg> Back
            </button>
            <p className="title">{this.title}</p>
          </div>
        </section>
        <div className="rect-block-grid">
          <div className="row large-up-3 small-up-1">
            { PERSONALITIES.map(p =>
              <div className={cx("rect-block-wrapper column", { selected: this.state.value[p.value]})} key={p.value} onClick={() => this.setPersonality(p.value, p.toast)}>
                <div className={cx("rect-block", { active: this.state.value[p.value]})}>
                  <p className="text-center rect-block-title">{p.label}</p>
                </div>
              </div>
            )}
            <div className="proceed-button wizard-button clearfix">
              <Button className="has-width" disabled={!Object.keys(this.state.value).length} onClick={this.goNext}>Next</Button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityScreen);
