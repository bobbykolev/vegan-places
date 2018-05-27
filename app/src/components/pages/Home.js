import React from 'react';
import {PropTypes} from 'prop-types';
import Common from "../../utils/Common";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.page = 'pages.home.';
  }

  render() {
    return (
      <div>{Common.getTranslation(this.page+'title')}</div>
    );
  }
}

Home.propTypes = {};

export default Home;