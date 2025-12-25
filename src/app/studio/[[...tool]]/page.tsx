'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Configuration pour Vercel
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
