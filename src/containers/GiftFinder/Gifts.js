import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Colors } from 'react-foundation';
import GiftCard from '../../components/GiftCard';
import Header from '../../components/Header';
import WizardProgress from '../../components/WizardProgress';
import { wizardActions } from '../../redux/modules/wizard';
import {
  trackPageView
} from '../../utils/tracking';

import BUDGETS, { vouchers } from '../../data/budgets';

@autobind
class Gifts extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      visible: 9,
      resultsArray: []
    }

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.seeMoreProductsClicked();
    this.setState({
      visible: this.state.visible + 9
    })
  }

  componentWillMount() {
    this.setState({
      resultsArray: this.props.results
    });
    if (!this.props.selections.budget){
      this.props.history.push('/');
    } else {
      this.props.loadResults(this.props.selections).then(res => {
        this.props.productListViewed(this.getHeader());
        return res;
      });

      this.props.setStep('gifts');
    }
  }

  componentDidMount() {
    trackPageView();
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleVoucherClick(e, budget) {
    e.preventDefault();
    const { selections } = this.props;
    const { tracking, value } = budget;
    const href = `https://www.redballoon.com.au/product/${tracking.friendlyURL}`;
    const header = this.getHeader();

    this.props.completeSelection([{ value }]);
    this.props.productClicked(tracking, header);

    setTimeout(() => window.location.href = href, 500);

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.subscribe();
  }

  subscribe() {
    const { email } = this.state;
    if(email) {
      this.props.signup(email);
    }
  }

  renderBanner(size) {
    return (
      <div className="bg-image" style={{backgroundImage: `url(/img/result-hero-${size}.jpg)`}} />
    )
  }

  getHeader() {
    const { results, selections } = this.props;

    if(!results.length) return null;

    else if(['girlfriend', 'wife', 'mum', 'girl'].includes(selections.relation)) {
      return 'Gifts for her!';
    } else if (['couple', 'family'].includes(selections.relation)) {
      return 'Gifts for them!';
    }
    return 'Gifts for him!';
  }

  renderForm() {
    return (
      <form className="voucher-form-wrapper" onSubmit={this.handleSubmit}>
        <div className="voucher-form">
          <div className="row small-up-12 large-up-2">
            <div className="column">
              <div className="email-wrapper">
                <input
                  name="email"
                  onChange={this.onChange}
                  type="email" id="email"
                  placeholder="Email address"/>
              </div>
            </div>
            <div className="column text-center">
              <button className="button red-button">Submit and claim $10</button>
            </div>
          </div>
          <div className="row">
            <div className="column text-center">
              <p className="rb-terms">By submitting your details you consent to receiving our RedBalloon Insiders newsletter and other direct marketing communications <br className="show-for-large-up" /> and to the use of your personal information in accordance with our <a href="https://help.redballoon.com.au/hc/en-us/articles/202214850-Privacy-Copyright">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column wizard-button text-center">
            <button className="button blue-button progress-button has-width" onClick={this.props.skipSignup}>No thanks, show me the gifts!</button>
          </div>
        </div>
      </form>
    )
  }

  renderGifts() {
    const { selections, results, loading } = this.props;
    const budget = BUDGETS.find(b => b.value === selections.budget);
    const header = this.getHeader();

    this.state.resultsArray = results.slice(0, this.state.visible);

    const gifts = this.state.resultsArray.map((gift, index) => (
      <GiftCard gift={gift}
        index={index}
        selections={selections}
        key={gift.objectID}
        header={header}
        completeSelection={this.props.completeSelection}
        productClicked={this.props.productClicked} />
      )
    );

    const noGiftsMessage = !loading && !results.length && <p className="text-center">We didn’t find quite the right gift in our guide.<br className="hide-for-small-only" /> <a href="https://www.redballoon.com.au/search">Try our full search with over 4,000 options here!</a></p>;


    const seeMoreLink = results.length
      && (results.length !== this.state.visible)
      && (results.length > 9)
      && (this.state.visible !== 54)
      ? <div className="see-more-products"><a onClick={this.loadMore}>See more products</a></div> : null;

    return (
      <div>
        <div className="result-block-grid">
          <div className="row medium-up-2 large-up-3 gift-boxes">
            {gifts}
            {noGiftsMessage}
          </div>
          <div className="row result-block-see-more">
            {seeMoreLink}
          </div>
          <div className="gift-voucher-wrapper">
            <div>
              <h4>Can't decide?</h4>
              <p>Let them choose!</p>
            </div>
            <a className="gift-voucher-cta-wrapper"
              href={vouchers[budget.voucher]}
              onClick={e => this.handleVoucherClick(e, budget)}>
              <h3 className="gift-voucher-name">Gift Voucher</h3>
              <h1 className="gift-voucher-value">${budget.voucher}</h1>
              <h3 className="gift-voucher-cta">ADD TO CART</h3>
            </a>
          </div>
          <div className="back-wrapper">
            <Button className="blue-hollow-button has-width" onClick={() => this.props.history.push('/find/budget')}>Go Back</Button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Helmet title="Gifts" />
        <section className="hero-wrapper">
          <div className="hero">
            <Header />
            <div className="row">
              <WizardProgress />
            </div>
          </div>
          { this.props.showResults ? (
            <div className="hero-text row text-center">
              <button className="back chevron-hollow show-for-large" onClick={() => this.props.history.push('/find/budget')}>
                <svg className="svg-chevron-left-dims"><use xlinkHref="/giftguide/img/sprite.symbol.svg#chevron-left"/></svg> Back
              </button>
              <p className="title">{this.getHeader()}</p>
              <p>Click your favourites and 'add to wishlist' to save and decide later!</p>
            </div>
          ) : (
            <div className="hero-text text-center">
              <p className="title">Claim $10 off your next gift!</p>
            </div>
          )}
        </section>
        { this.props.showResults ? this.renderGifts() : this.renderForm()}
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


export default connect(mapStateToProps, mapDispatchToProps)(Gifts);
