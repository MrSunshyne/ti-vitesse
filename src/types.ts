import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export interface MenuItem {
  name: string
  path: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
}
