import {createDrawerNavigator} from 'react-navigation-drawer';

import { createAppContainer } from 'react-navigation';

import homeStack from './homeStack';
import RevStack from './revPageStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: homeStack,
    },
    RevPage : {
        screen: RevStack,
    }
});


export default createAppContainer(RootDrawerNavigator);