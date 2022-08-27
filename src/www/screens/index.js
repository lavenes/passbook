import { HomeScreen } from './Home';
import { SettingsScreen } from './Settings';
import { Permisstion } from './Permisstion';
import { ProductMarket } from './Product';
import { TicketInformation } from './Product/Information/Ticket';
import { ItemInformation } from './Product/Information/Item';
import { ProductCategoryList } from './Product/Category/List';
import { NFTCreateScreen } from './Product/Create';

import { QRScanScreen } from './QRScan';

import { ProfileScreen } from './Profile';

const Screens =  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    Product: {
        Market: ProductMarket,
        Information: {
            Ticket: TicketInformation,
            Item: ItemInformation
        },
        Category: {
            List: ProductCategoryList
        },
        NFT: {
            Create: NFTCreateScreen
        }
    },
    QRScan: QRScanScreen,
    Profile: ProfileScreen,
    Permisstion: Permisstion
}

export default Screens;