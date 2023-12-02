import { IconProps } from './icons/IconProps'
import { ExitIcon } from './icons/exit'
import { MoonIcon } from './icons/moon'
import { PlusIcon } from './icons/plus'
import { SunIcon } from './icons/sun'
import { TrashIcon } from './icons/trash'

type Props = {
  icon: keyof typeof Icons
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

const sizeClasses = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
  xxl: 'h-12 w-12',
}

export default function Icon({ icon, size = 'md' }: Props) {
  const IconComponent = Icons[icon]
  const sizeClass = sizeClasses[size]

  return <IconComponent className={sizeClass} />
}

export type IconNames = 'moon' | 'sun' | 'exit' | 'plus' | 'trash'

type IconsType = {
  [key in IconNames]: (props: IconProps) => JSX.Element
}

export const Icons: IconsType = {
  moon: (props: IconProps) => <MoonIcon {...props} />,
  sun: (props: IconProps) => <SunIcon {...props} />,
  exit: (props: IconProps) => <ExitIcon {...props} />,
  plus: (props: IconProps) => <PlusIcon {...props} />,
  trash: (props: IconProps) => <TrashIcon {...props} />,
}
