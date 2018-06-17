import React from 'react';
import {PropTypes} from 'prop-types';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import TextField from 'react-md/lib/TextFields/TextField';
import Common from "../utils/Common";

class PlacesFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="main-filters">
                <SelectField
                    id="towns-filter"
                    name="towns-filter"
                    label={Common.getTranslation('common.townLabel')}
                    itemLabel="name"
                    itemValue="id"
                    menuItems={this.props.towns}
                    value={this.props.selectedTown.id}
                    onChange={this.props.updateSelectedTown}
                    className=""
                    dropdownIcon={<i className="material-icons">keyboard_arrow_down</i>} />
                <SelectField
                    id="vplace-filter"
                    name="vplace-filter"
                    label={Common.getTranslation('common.vTypeLabel')}
                    itemLabel="name"
                    itemValue="id"
                    menuItems={this.props.vTypes}
                    value={this.props.selectedVType.id}
                    onChange={this.props.updateVType}
                    className=""
                    dropdownIcon={<i className="material-icons">keyboard_arrow_down</i>} />
                <TextField
                    id="filter-search"
                    label={Common.getTranslation('common.filterSearchLabel')}
                    className="filter-search"
                    autoCapitalize="none"
                    value={this.props.searchStr}
                    onChange={this.props.onSearchChange}/>
            </div>
        );
    }
}

PlacesFilters.propTypes = {};

export default PlacesFilters;