"use client"

import { useRandomImg } from "@/hooks/use-random-img"
import { cn } from "@/lib/utils"
import { CheckCircle2Icon, ExternalLinkIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Link from "next/link"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { FormError } from "@/components/form/form-error"

interface FormImagePickerProps {
  name: string
  errors?: Record<string, string[] | undefined>
}

export const FormImagePicker = ({ name, errors }: FormImagePickerProps) => {
  const { pending } = useFormStatus()

  const { images, isLoading } = useRandomImg({})
  const [imgId, setImgId] = useState<string>()

  const [parent] = useAutoAnimate()

  const onSelectImg = (id: string) => {
    if (pending) return
    setImgId(id)
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div ref={parent}>
      <div className="grid grid-cols-3 gap-1 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={cn(
              "cursor-pointer relative border-2 rounded-md aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 pointer-events-none",
              img.id === imgId && "border-black shadow-md hover:opacity-100"
            )}
            onClick={() => onSelectImg(img.id)}
          >
            <input
              type="radio"
              id={name}
              name={name}
              className="hidden"
              checked={img.id === imgId}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
              readOnly
            />

            <Image
              src={img.urls.thumb}
              alt="Unsplash image"
              fill
              className="object-cover rounded-md"
            />

            <Link
              title={`Image by ${img.user.name}`}
              href={img.links.html}
              target="_blank"
              className="absolute -top-5 w-full backdrop-blur text-[10px] rounded-t-md bg-black z-10 flex items-center text-white opacity-0 group-hover:opacity-100 p-1 hover:underline"
            >
              <span className="truncate">{img.user.name}</span>

              <ExternalLinkIcon className="h-3 w-3 ml-1 shrink-0" />
            </Link>

            {img.id === imgId && (
              <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                <CheckCircle2Icon className="h-6 w-6 text-white drop-shadow" />
              </div>
            )}
          </div>
        ))}
      </div>

      <FormError id={name} errors={errors} />
    </div>
  )
}
