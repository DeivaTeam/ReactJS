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
import RELATIONS from '../../data/relations';
import { wizardActions } from '../../redux/modules/wizard';
import noti from '../../utils/notification';
import {
  trackPageView
} from '../../utils/tracking';

@autobind
class RelationshipScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }

    this.title = 'Is this gift just for mum or will you be sharing the experience with her?';
  }

  componentWillMount() {
    this.setState({
      value: this.props.selections.relation
    });
    this.props.setStep('relationship');
  }

  componentDidMount() {
    trackPageView();
  }

  setValue(value, msg) {
    if(value === this.state.value) {
      this.setState({ value: '' });
    } else {
      this.setState({ value });
      this.props.setSelection('relation', value);
      const toast = noti();
      toast.remove('relation');
      toast.show({ content: msg || value, key: 'relation'});
      const anchor = document.querySelector('.proceed-button');
      scroll.animateScroll(anchor);
    }
  }

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/img/result-hero-${size}.jpg)`}} />
    )
  }

  goNext() {
    const toast = noti();
    toast.remove('relation');
    this.props.history.push('/find/location');
    this.props.completeSelection([{ value: this.state.value }]);
  }

  render() {
    return (
      <div>
        <Helmet title="Who" />
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
          <div className="row large-up-4 small-up-1 ">
            { RELATIONS.map((r, idx) =>
              <div className={cx("rect-block-wrapper row who-column-align", {selected: r.value == this.state.value})} key={idx} onClick={() => this.setValue(r.value, r.toast)}>
                <div className={cx("rect-block", {active: r.value == this.state.value})}>
                  <p className="text-center rect-block-title">{r.label}</p>
                </div>
              </div>
            ) }
            <div className="proceed-button wizard-button clearfix">
              <Button className="has-width" disabled={!this.state.value} onClick={this.goNext}>Next</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RelationshipScreen);
