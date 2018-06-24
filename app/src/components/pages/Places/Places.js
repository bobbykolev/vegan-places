import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions';
import Dialog from 'react-md/lib/Dialogs';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Common from "../../../utils/Common";
import PlaceItem from "./PlaceItem";
import PlacesFilters from "../../PlacesFilters";
import PlaceDetails from "./PlaceDetails";

class Places extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            places: [],
            towns: [],
            vTypes: [],
            searchStr: '',
            selectedVType: this.getDefaultAll(),
            selectedTown: this.getDefaultAll(),
            selectedPlace: {},
            visibleDetails: false
        };

        this.page = 'pages.home.';
        this.animationTiming = {
            enter: 0,
            exit: 0
        };
        this.updateResults = this.updateResults.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
    }

    componentWillMount() {
        this.getPlaces();
    }

    componentWillReceiveProps() {
        this.setState({
            places: this.getUpdatedPlaces(this.getAppliedFilters())
        });
    }

    componentWillUnmount() {
        this.markerCheck && window.clearInterval(this.markerCheck);
    }

    setOpenMarker() {
        this.markerCheck && window.clearInterval(this.markerCheck);
        this.markerCheck = window.setInterval(() => {
            console.log("[VP] open/close marker refresh", new Date());
            this.updatePlacesMarkers();
        }, 2 * 60 * 1000);
    }

    getPlaces() {
        return this.props.actions.getPlaces().then(()=>{
            this.setMainData();
            this.setOpenMarker();
        });
    }

    setMainData() {
        this.setState({
            towns: [this.getDefaultAll(), ...Common.getUniqueProps('town', [...this.props.places]).map((item,i)=>{
                return {id: i+1, name: item};
            })],
            vTypes: [this.getDefaultAll(), ...Common.getUniqueProps('vType', [...this.props.places]).map((item,i)=>{
                return {id: i+1, name: item};
            })],
            places: this.getUpdatedPlaces(this.getAppliedFilters())
        });
    }

    getDefaultAll () {
        return {
            id: -1,
            name: Common.getTranslation('common.defaultAll')
        };
    }

    updateSelectedTown(val, index) {
        this.setState({selectedTown: this.state.towns[index]}, this.updateResults);
    }

    updateVType(val, index) {
        this.setState({selectedVType: this.state.vTypes[index]}, this.updateResults);
    }

    onSearchChange(val) {
        this.setState({searchStr: val}, this.updateResults);
    }

    getAppliedFilters() {
        let filters = {};

        if (this.state.selectedTown.id > 0) {
            filters.town = this.state.selectedTown.name;
        }

        if (this.state.selectedVType.id > 0) {
            filters.vType = this.state.selectedVType.name;
        }

        return filters;
    }

    updateResults() {
        this.setState({places: this.getUpdatedPlaces(this.getAppliedFilters())});
    }

    getUpdatedPlaces(filters) {
        let results = [];
        let len = Object.keys(filters).length;
        const {places} = this.props;
        const {searchStr} = this.state;

        if (len) {
            places.forEach((item)=>{
                let index = 0;

                Object.keys(filters).forEach((f)=>{
                    if (item[f] === filters[f]) {
                        index++;
                    }
                });

                if (index === len) {
                    if (searchStr) {
                        if (item.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
                            results.push(Object.assign({}, item));
                        }
                    } else {
                        results.push(Object.assign({}, item));
                    }
                }
            });

            results = Common.sortArray('priority', results);
        } else {
            if (searchStr) {
                let searchedResults = [];

                for(let i = 0; i < places.length; i++){
                    if (places[i].name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
                        searchedResults.push(Object.assign({}, places[i]));
                    }
                }

                results = Common.sortArray('priority', searchedResults);
            } else {
                results = Common.sortArray('priority', places.map(item=>{return Object.assign({}, item);}));
            }
        }

        return results;
    }

    updatePlacesMarkers() {
        return this.props.actions.updatePlacesMarkers();
    }

    openDetails(item) {
        this.setState({visibleDetails: true, selectedPlace: item});
    }

    closeDetails() {
        this.setState({visibleDetails: false, selectedPlace: {}});
    }

    /*renderItems() {
        return this.state.places.map((item) => {
            return (<CSSTransition key={item.id}
                                   timeout={this.animationTiming}
                                   mountOnEnter
                                   unmountOnExit
                                   classNames="place-item-animated">
                <PlaceItem item={item} openDetails={this.openDetails.bind(this)}/>
            </CSSTransition>);
        });
    }*/

    renderItems() {
        return this.state.places.map((item) => {
            return <PlaceItem item={item} openDetails={this.openDetails.bind(this)}/>;
        });
    }

    render() {
        return (
            <div className="page-wrapper">
                <PlacesFilters towns={this.state.towns}
                               selectedTown={this.state.selectedTown}
                               updateSelectedTown={this.updateSelectedTown.bind(this)}
                               vTypes={this.state.vTypes}
                               selectedVType={this.state.selectedVType}
                               updateVType={this.updateVType.bind(this)}
                               searchStr={this.state.searchStr}
                               onSearchChange={this.onSearchChange.bind(this)}>
                </PlacesFilters>
                {/*<TransitionGroup className="places-items">*/}
                <div className="places-items">
                    {this.renderItems()}
                </div>
                {/*</TransitionGroup>*/}
                <Dialog
                    id="details-modal"
                    className={'details-modal'}
                    aria-label="details-modal"
                    visible={this.state.visibleDetails}
                    focusOnMount={false}
                    portal={true}
                    onHide={this.closeDetails}
                >
                    <PlaceDetails
                        item={this.state.selectedPlace}
                        close={this.closeDetails}
                    />
                </Dialog>
            </div>
        );
    }
}

Places.propTypes = {
    actions: PropTypes.object,
    places: PropTypes.array
};

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