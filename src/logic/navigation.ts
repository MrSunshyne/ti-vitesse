import {
    HomeIcon,
} from '@heroicons/vue/outline'
import { RenderFunction } from 'vue'

interface MenuItem {
    name: string;
    path: string;
    icon: RenderFunction;
}

const menu: MenuItem[] = [
    { path: "/", name: "Home", icon: HomeIcon },
    {
        name: '404',
        path: '/xkcd',
        icon: HomeIcon
    },
    { path: "/about", name: "About", icon: HomeIcon },
    { path: "/charts", name: "Charts", icon: HomeIcon }
]

export default menu