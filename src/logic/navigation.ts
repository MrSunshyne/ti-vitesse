import { MenuItem } from '@/types'
import { HomeIcon } from '@heroicons/vue/outline'

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