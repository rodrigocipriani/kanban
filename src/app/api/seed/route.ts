import { NextRequest, NextResponse } from 'next/server'

import GetColumnsController from '@/backend/features/Column/GetColumnsController'
import seed from './seed'

export async function GET(req: NextRequest) {
  await seed()

  return NextResponse.json({ message: 'seeded' })
}
