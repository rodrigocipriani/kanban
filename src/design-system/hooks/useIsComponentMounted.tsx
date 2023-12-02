import { useEffect, useState } from 'react'

export default function useIsComponentMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}
