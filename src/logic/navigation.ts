import { HomeIcon } from '@heroicons/vue/outline'
import type { MenuItem } from '@/types'

const menu: MenuItem[] = [
  { path: '/', name: 'Home', icon: HomeIcon },
  {
    name: '404',
    path: '/xkcd',
    icon: HomeIcon,
  },
  { path: '/about', name: 'About', icon: HomeIcon },
  { path: '/charts', name: 'Charts', icon: HomeIcon },
]

export default menu
