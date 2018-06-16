import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Common from "../../../utils/Common";
import PlaceItem from "./PlaceItem";

class Places extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.page = 'pages.home.';
    }

    componentWillMount() {
        this.getPlaces();
    }

    componentWillReceiveProps() {

    }

    componentWillUnmount() {
        this.markerCheck && window.clearInterval(this.markerCheck);
    }

    setOpenMarker() {
        this.markerCheck && window.clearInterval(this.markerCheck);
        this.markerCheck = window.setInterval(() => {
            console.log("[VP] open/close marker refresh", new Date());
            this.updatePlacesMarkers();
        }, 3 * 60 * 1000);
    }

    getPlaces() {
        return this.props.actions.getPlaces().then(()=>{
            this.setOpenMarker();
        });
    }

    updatePlacesMarkers() {
        return this.props.actions.updatePlacesMarkers();
    }

    openDetails() {

    }

    renderItems() {
        return this.props.places.map((item, i) => {
            return (<CSSTransition key={item.id} timeout={100 + (i*50)} classNames="place-item-animated">
                <PlaceItem item={item} openDetails={this.openDetails.bind(this)}/>
            </CSSTransition>);
        });
    }

    render() {
        return (
            <TransitionGroup className="places-items">
                {/*Common.getTranslation(this.page + 'title')*/}
                {this.renderItems()}
            </TransitionGroup>
        );
    }
}

Places.propTypes = {};

function mapStateToProps(state) {
    return {
        places: state.places
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Places);