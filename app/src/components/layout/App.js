import React from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch} from "react-router-dom";
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Common from "../../utils/Common";
import NavLink from './NavLink';
import LangControl from './LangControl';
import Footer from './Footer';
import Places from '../pages/Places/Places';
import About from '../pages/About';
import FourOhFour from '../pages/FourOhFour';
import PlacesMap from "../pages/PlacesMap";

const navItems = [
    {
        exact: true,
        label: Common.getTranslation('nav.home'),
        to: '/home',
        icon: 'home',
    },
    {
        exact: true,
        label: Common.getTranslation('nav.map'),
        to: '/map',
        icon: 'location_on',
    },
    {
        exact: true,
        label: Common.getTranslation('nav.about'),
        to: '/about',
        icon: 'info',
    }
];

const langItem = [
    {
        name: 'en',
        lang: 'en'
    },
    {
        name: 'бг',
        lang: 'bg'
    }
];

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderNavItems () {
        let result = navItems.map(props => <NavLink {...props} key={props.to} />);
        result.push({ divider: true, key:2 });
        result.push(<LangControl key={3} item={langItem[0]} />);
        result.push(<LangControl key={4} item={langItem[1]} />);

        return result;
    }

    render() {
        return (
            <div>
                <NavigationDrawer
                    drawerTitle=" "
                    className={'main-nav'}
                    toolbarTitle={''}
                    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                    tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                    desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                    navItems={this.renderNavItems()}
                    persistentIcon={<div className="menu-btn"></div>}
                    temporaryIcon={<div className="menu-btn"></div>}
                >
                    <Switch>
                        <Route exact path="/" component={Places}/>
                        <Route path="/home" component={Places}/>
                        <Route path="/about" component={About}/>
                        <Route path="/map" component={PlacesMap}/>
                        <Route component={FourOhFour}/>
                    </Switch>
                    <Footer/>
                </NavigationDrawer>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;