'use client'

import { useActionState, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { UploadResultState } from '@/app/uploadthing/components'

export function FeaturedImageField({ initialUrl }: { initialUrl?: string | null }) {
  const [file, setFile] = useState<File | null>(null)
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)
  const [clear, setClear] = useState(false)

  useEffect(() => {
    if (!file) {
      setFilePreviewUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setFilePreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const previewUrl = useMemo(() => {
    if (filePreviewUrl) return filePreviewUrl
    if (clear) return null
    return initialUrl && initialUrl.trim().length > 0 ? initialUrl.trim() : null
  }, [filePreviewUrl, clear, initialUrl])

  return (
    <div className="space-y-3">
      {previewUrl ? (
        <div className="relative w-full max-w-xl aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={previewUrl} alt="Featured image" fill className="object-cover" />
        </div>
      ) : null}

      <input type="hidden" name="featuredImageExisting" value={initialUrl ?? ''} />
      <input type="hidden" name="featuredImageClear" value={clear ? 'true' : 'false'} />

      <label className="form-control w-full max-w-xl">
        <div className="label">
          <span className="label-text">Upload new image</span>
        </div>
        <input
          type="file"
          name="featuredImageFile"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => {
            const next = e.target.files?.[0] ?? null
            setFile(next)
            setClear(false)
          }}
        />
      </label>

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={clear}
          onChange={(e) => {
            const next = e.target.checked
            setClear(next)
            if (next) setFile(null)
          }}
        />
        <span className="label-text">Clear featured image</span>
      </label>
    </div>
  )
}

export function ContentImagesUploader({
  action,
}: {
  action: (prevState: UploadResultState, formData: FormData) => Promise<UploadResultState>
}) {
  const [state, formAction, pending] = useActionState(action, { urls: [] })

  return (
    <div className="space-y-3">
      <form action={formAction} className="space-y-3">
        <input type="file" name="files" accept="image/*" multiple className="file-input file-input-bordered w-full" />
        <button className="btn btn-primary btn-sm" type="submit" disabled={pending}>
          Upload Images
        </button>
      </form>

      {state.error ? <div className="alert alert-error">{state.error}</div> : null}

      {state.urls.length > 0 ? (
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-base">Uploaded URLs</h3>
            <div className="space-y-2">
              {state.urls.map((u) => (
                <input key={u} className="input input-bordered w-full" readOnly value={u} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
