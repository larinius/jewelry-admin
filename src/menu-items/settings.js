// assets
import { IconSettings } from '@tabler/icons';

// constant
const icons = { IconSettings };

// ==============================|| SETTINGS PAGE & MENU ITEMS ||============================== //

const other = {
    id: 'settings',
    type: 'group',
    children: [
        {
            id: 'site-settings',
            title: 'Settings',
            type: 'item',
            url: '/settings/list',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default other;
