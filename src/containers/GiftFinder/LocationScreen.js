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

import LOCATIONS from '../../data/locations';

@autobind
class LocationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: {}
    }

    this.title = 'Where would you like to take them?';
  }

  componentWillMount() {
      this.setState({
        value: this.props.selections.location
      });
      this.props.setStep('location');
  }

  componentDidMount() {
    trackPageView();
  }

  setValue(value, msg) {
    if (value === this.state.value) {
      this.setState({ value: '' });
    } else {
      this.props.setSelection('location', value);
      this.setState({ value });
      const toast = noti();
      toast.remove('loc');
      toast.show({ content: msg || value, key: 'loc'});      
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
    toast.remove('loc');
    this.props.history.push('/find/personality');
    this.props.completeSelection([{ value: this.state.value }]);
  }

  render() {
    return (
      <div>
        <Helmet title="Where" />
          <section className="hero-wrapper">
          <div className="hero">
            <Header />
            <div className="row">
              <WizardProgress />
            </div>
          </div>
          <div className="hero-text row text-center">
            <p className="title">{this.title}</p>
          </div>

        </section>
        <div className="rect-block-grid">
          <div className="row large-up-4 small-up-2">
            { LOCATIONS.map(l =>
              <div className={cx("rect-block-wrapper column", {selected: l.value == this.state.value})} key={l.value} onClick={() => this.goNext(l.value, l.toast)}>
                <div className={cx("rect-block", {active: l.value == this.state.value})}>
                  <p className="text-center rect-block-title">{l.label}</p>
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


export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
