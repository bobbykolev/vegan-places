import React from 'react';
import {PropTypes} from 'prop-types';
import {Paper} from 'react-md/lib/Papers';
import Common from "../../../utils/Common";

class PlaceItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            depth: 1
        };

        this.onMouseOverFn = this.onMouseOverFn.bind(this);
        this.onMouseLeaveFn = this.onMouseLeaveFn.bind(this);
        this.openDetails = this.openDetails.bind(this);
    }

    onMouseOverFn() {
        this.setState({
            depth: 3
        });
    }

    onMouseLeaveFn() {
        this.setState({
            depth: 1
        });
    }

    openDetails() {
        this.props.openDetails();
    }

    render() {
        const {item} = this.props;

        return (
            <Paper
                zDepth={this.state.depth}
                className="place-item">
                <div className="place-item--header">
                    <div className="place-thumb" style={{'background': 'url("' + item.imageUrl + '") center center / cover'}}
                         onMouseOver={this.onMouseOverFn}
                         onMouseLeave={this.onMouseLeaveFn}
                         onClick={this.openDetails}/>
                </div>
                <div className="place-item--details">
                    <div className="place-item--title" onMouseOver={this.onMouseOverFn} onMouseLeave={this.onMouseLeaveFn}>
                        <div title="Vegan Rating" className={"veg-icon veg-icon-" + item.priority}/>
                        {item.name}
                    </div>
                    <div className="place-item--phone">
                        <a className="item-with-icon" href={'tel:' + item.phone[0]}>
                            <i className="material-icons">phone</i>
                            {item.phone[0]}
                        </a>
                    </div>
                </div>
                <div className="place-item--footer">
                    <div>
                        <div className={item.isOpen ? 'open-label':'close-label'}>{item.isOpen ? Common.getTranslation('common.openText'): Common.getTranslation('common.closeText')}</div>
                    </div>
                    <a target="_blank" title="Directions" href={Common.getDirectionsLink(item)}><i className="material-icons">directions</i></a>
                </div>
            </Paper>
        );
    }
}

PlaceItem.propTypes = {
    openDetails: PropTypes.func,
    item: PropTypes.object
};

export default PlaceItem;