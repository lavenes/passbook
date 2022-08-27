import { HomeScreen } from './Home';
import { SettingsScreen } from './Settings';
import { ProductMarket } from './Product';
import { TicketInformation } from './Product/Information/Ticket';
import { ItemInformation } from './Product/Information/Item';
import { ProductCategoryList } from './Product/Category/List';
import { NFTCreateScreen } from './Product/Create';
import { Permission } from "./Permission";
import { UserDetail } from "./Permission/UserDetail"

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
    Permission: {
        Permission: Permission,
        UserDetail: UserDetail
    }
}

export default Screens;