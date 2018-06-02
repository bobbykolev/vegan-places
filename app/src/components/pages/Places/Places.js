import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions';
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

    getPlaces() {
        this.props.actions.getPlaces();
    }

    openDetails() {

    }

    renderItems() {
        return this.props.places.map(item => {
            return <PlaceItem item={item} key={item.id} openDetails={this.openDetails.bind(this)}/>;
        });
    }

    render() {
        return (
            <div className="places-items">
                {/*Common.getTranslation(this.page + 'title')*/}
                {this.renderItems()}
            </div>
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