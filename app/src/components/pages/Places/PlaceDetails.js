import React from 'react';
import {PropTypes} from 'prop-types';
import {AppGoogleMap} from "../../AppGoogleMap";
import Common from "../../../utils/Common";

class PlaceDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderTime() {
        return this.props.item.workingTime.map((time, index)=>{
            return <div key={index} className="time-line"><span><strong>{Common.getTranslation('common.days.'+index)}</strong>:</span><span>{time ? time + ';' : Common.getTranslation('page.place.restDay')}</span></div>;
        });
    };

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
                    <div className="place-inner-section">
                        {item.description}
                    </div>
                    <div className="place-inner-section">
                        {this.renderTime()}
                    </div>
                    <div className="place-inner-section">
                        {item.town},&nbsp;{item.address},&nbsp;{item.phone && item.phone.length && <a className="item-with-icon" href={'tel:' + item.phone[0]}>
                            <i className="material-icons">phone</i>
                            {item.phone[0]}
                        </a>}
                    </div>
                    <div>
                        {window.google && <AppGoogleMap
                            isMarkerShown
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div style={{ height: '250px' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                            icon={'img/vp_logo'+item.priority+'.png'}
                            latitude={item.latitude || ''}
                            longitude={item.longitude || ''}
                        />}
                    </div>
                </section>
            </div>
        );
    }
}

PlaceDetails.propTypes = {};

export default PlaceDetails;