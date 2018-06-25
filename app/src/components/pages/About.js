import React from 'react';
import {PropTypes} from 'prop-types';
import Common from "../../utils/Common";

class About extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.page = 'page.about.';
  }

  render() {
    return (
        <div>{Common.getTranslation(this.page+'title')}</div>
    );
  }
}

About.propTypes = {};

export default About;