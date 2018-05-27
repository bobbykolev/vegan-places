import React from 'react';
import {PropTypes} from 'prop-types';
import ListItem from 'react-md/lib/Lists/ListItem';
import Common from "../../utils/Common";

class LangControl extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    changeLang (lang) {
        Common.getChangeLang(lang);
    }

    render() {
        return (
            <ListItem
                className={'inline-menu-item'}
                key={this.props.item.lang}
                active={Common.getActiveLang() === this.props.item.lang }
                primaryText={this.props.item.name}
                onClick={this.changeLang.bind(this, this.props.item.lang)}
            />
        );
    }
}

LangControl.propTypes = {};

export default LangControl;