// assets
import { IconSettings } from '@tabler/icons';

// constant
const icons = { IconSettings };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'settings',
    type: 'group',
    children: [
        {
            id: 'site-settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default other;
