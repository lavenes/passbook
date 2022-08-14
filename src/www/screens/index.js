import { HomeScreen } from './Home';
import { SettingsScreen } from './Settings';

import { ProductMarket } from './Product';
import { TicketInformation } from './Product/Information/Ticket';
import { ItemInformation } from './Product/Information/Item';
import { ProductCategoryList } from './Product/Category/List';

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
        }
    }
}

export default Screens;