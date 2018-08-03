import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import StartHalf from './star_half.svg';
import StartFull from './star_full.svg';
import StarEmpty from './star_empty.svg';

export default class GiftCard extends Component {

  handleClick(e, href) {
    e.preventDefault();
    const { gift, index, selections, header } = this.props;
    this.props.completeSelection([{ value: gift.name }]);
    this.props.productClicked(gift, header, (index + 1));

    setTimeout(() => window.location.href = href, 500);

    return false;
  }

  render() {
    const { gift } = this.props;
    const href = `https://www.redballoon.com.au/product/${gift.friendlyURL}?hideHeader=true&hideFooter=true&showBackButton=true`;

    return (
      <div className="result-block column">
        <a href={href}
        onClick={e => this.handleClick(e, href)}>
          <div className="image-container">
            <img className="banner" src={`//res.cloudinary.com/redballoon/c_fill,f_auto,w_414,h_230/${gift.imageId}`}/>
          </div>
          <div className="info-bar row">
            <div className="columns small-9 large-8 info-left">
              <div className="result-block-title">
                <p>{gift.name}</p>
              </div>
              <div className="result-block-subtitle">
                <p>{gift.shortVenue}</p>
              </div>
              <div className="rating-block clearfix">
                <StarRatingComponent
                  name="rating"
                  starColor="#ffb400"
                  emptyStarColor="#ffb400"
                  editing={false}
                  starCount={5}
                  value={gift.userRating}
                  renderStarIcon={(index, value) => {
                    return  <img src={index <= value ? StartFull : StarEmpty} />;
                  }}
                  renderStarIconHalf={() => <img src={StartHalf} />}
                />
              </div>
            </div>
            <div className="columns small-3 large-4 info-right text-right">
              <div className="price"><span>from</span>${gift.price}</div>
            </div>

          </div>
        </a>
      </div>
    );
  }
}
