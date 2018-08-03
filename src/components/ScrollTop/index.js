import React from 'react';
import { withRouter } from 'react-router';
import SmoothScroll from 'smooth-scroll';

const scroll = new SmoothScroll();


class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scroll.animateScroll( 60 );
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop)