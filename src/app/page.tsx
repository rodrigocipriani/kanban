import BoardContainer from '@/frontend/features/Board/BoardContainer'

export default async function Home() {
  // TODO - the first data from columns and tasks should come from here on SSR

  return <BoardContainer />
}
