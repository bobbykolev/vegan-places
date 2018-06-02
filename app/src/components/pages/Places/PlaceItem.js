import React from 'react';
import {PropTypes} from 'prop-types';
import {Paper} from 'react-md/lib/Papers';

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
                className="place-item"
            >
                <div className='place-thumb' style={{'background': 'url("' + item.imageUrl + '") center 0% / cover'}}
                     onMouseOver={this.onMouseOverFn}
                     onMouseLeave={this.onMouseLeaveFn}
                     onClick={this.openDetails}></div>
                <div className="place-item--details">
                    <div className="place-title">
                        {item.name}
                    </div>
                    <div>
                        <a className="item-with-icon" href={'tel:' + item.phone[0]}>
                            <i className="material-icons">phone</i>
                            {item.phone[0]}
                        </a>
                    </div>
                </div>
            </Paper>
        );
    }
}

PlaceItem.propTypes = {};

export default PlaceItem;