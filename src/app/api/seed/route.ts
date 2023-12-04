import { NextRequest, NextResponse } from 'next/server'
import seed from './seed'

export async function GET(req: NextRequest) {
  await seed()

  return NextResponse.json({ message: 'seeded' })
}
