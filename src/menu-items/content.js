// assets
import { IconFile } from '@tabler/icons';

// constant
const icons = {
    IconFile
};

// ==============================|| CONTENT PAGES MENU ITEMS ||============================== //

const content = {
    id: 'content',
    title: 'Site content',
    type: 'group',
    children: [
        {
            id: 'Pages',
            title: 'Pages',
            type: 'collapse',
            icon: icons.IconFile,

            children: [
                {
                    id: 'home',
                    title: 'Home',
                    type: 'item',
                    url: '/pages/home',
                    target: true
                },
                {
                    id: 'about',
                    title: 'About us',
                    type: 'item',
                    url: '/pages/about',
                    target: true
                },
                {
                    id: 'contacts',
                    title: 'Contacts',
                    type: 'item',
                    url: '/pages/contacts',
                    target: true
                }
            ]
        }
    ]
};

export default content;
