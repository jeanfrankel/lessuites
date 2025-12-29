import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getLqip(image: any): string | undefined {
  return image?.asset?.metadata?.lqip
}
