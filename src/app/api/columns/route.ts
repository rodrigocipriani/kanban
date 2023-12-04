import { NextRequest, NextResponse } from 'next/server'

import GetColumnsController from '@/backend/features/Column/GetColumnsController'

export async function GET(req: NextRequest) {
  const user = await new GetColumnsController().execute()

  return NextResponse.json(user)
}
