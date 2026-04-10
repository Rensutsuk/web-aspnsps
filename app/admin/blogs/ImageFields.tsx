'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { UploadButton, UploadDropzone } from '@/app/uploadthing/components'

export function FeaturedImageField({ initialUrl }: { initialUrl?: string | null }) {
  const [url, setUrl] = useState<string>(initialUrl ?? '')

  const previewUrl = useMemo(() => (url && url.trim().length > 0 ? url.trim() : null), [url])

  return (
    <div className="space-y-3">
      {previewUrl ? (
        <div className="relative w-full max-w-xl aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={previewUrl} alt="Featured image" fill className="object-cover" />
        </div>
      ) : null}

      <input type="hidden" name="featuredImage" value={url} />

      <div className="flex flex-wrap items-center gap-3">
        <UploadButton
          endpoint="blogImage"
          onClientUploadComplete={(res) => {
            const nextUrl = res?.[0]?.url
            if (nextUrl) setUrl(nextUrl)
          }}
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setUrl('')}
          disabled={!previewUrl}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export function ContentImagesField() {
  const [urls, setUrls] = useState<string[]>([])

  return (
    <div className="space-y-3">
      <UploadDropzone
        endpoint="blogImages"
        onClientUploadComplete={(res) => {
          const nextUrls = (res ?? []).map((x) => x.url).filter(Boolean)
          if (nextUrls.length > 0) setUrls(nextUrls)
        }}
      />

      {urls.length > 0 ? (
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-base">Uploaded URLs</h3>
            <div className="space-y-2">
              {urls.map((u) => (
                <input key={u} className="input input-bordered w-full" readOnly value={u} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
