import React from 'react';
import MediaQuery from 'react-responsive';

import breakpoints from '../../utils/breakpoints';

const Interchnage = ({ small, medium, large }) =>
  <MediaQuery query={breakpoints.large}>
    {(matches) => {
      if(matches) {
        return large;
      } else {
        return (
          <MediaQuery query={breakpoints.medium}>
            {(matches) => {
              if(matches) {
                return medium;
              } else {
                return small;
              }
            }}
          </MediaQuery>
        )
      }
    }}
  </MediaQuery>;

export default Interchnage;