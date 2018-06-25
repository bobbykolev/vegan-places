import React from 'react';
import {PropTypes} from 'prop-types';
import Common from "../../utils/Common";

class PlacesMap extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.page = 'page.map.';
    }

    render() {
        return (
            <div>{Common.getTranslation(this.page+'title')}</div>
        );
    }
}

PlacesMap.propTypes = {};

export default PlacesMap;