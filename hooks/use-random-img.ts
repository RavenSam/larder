"use client"

import { unsplash } from "@/lib/unsplash"
import { useEffect, useState } from "react"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { defaultImages } from "@/contants/images"

interface useRandomImgProps {
  count?: number
}

export const useRandomImg = ({ count = 9 }: useRandomImgProps) => {
  const [images, setImages] = useState<Random[]>(defaultImages)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count,
        })

        if (result && result.response) {
          const imgs = result.response as Random[]
          setImages(imgs)
        } else {
          console.error("Failed to get images from unsplash")
        }
      } catch (error) {
        console.error(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [count])

  return { images, isLoading }
}
