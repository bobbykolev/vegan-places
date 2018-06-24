import React from 'react';
import {PropTypes} from 'prop-types';

class PlaceDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {item} = this.props;

        return (
            <div className="place-details">
                <header>
                    <div className="place-main-img" style={{'background': 'url("' + item.imageUrl + '") center center / cover'}}/>
                    <h2>{item.name}</h2>
                    <div className={'circle-rating rating-color-'+item.priority}>{5 - item.priority}</div>
                </header>
                <section>
                    <div></div>
                    <div></div>
                    <div></div>
                </section>
            </div>
        );
    }
}

PlaceDetails.propTypes = {};

export default PlaceDetails;