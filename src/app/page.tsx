import { ThemeSwitch } from '@/design-system/theme/theme-switch'
import BoardContainer from '@/frontend/features/Board/BoardContainer'

export default function Home() {
  return (
    <div>
      <ThemeSwitch />
      <BoardContainer />
    </div>
  )
}
