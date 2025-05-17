'use client'

import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'

// Register blocks ONCE globally
if (typeof window !== 'undefined') {
  LR.registerBlocks(LR)
}

type Props = {
  onUpload: (cdnUrl: string) => any
}

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ctxRef.current) return

    const handleUpload = async (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.cdnUrl) {
        const result = await onUpload(detail.cdnUrl)
        if (result) {
          router.refresh()
        }
      }
    }

    ctxRef.current.addEventListener('file-upload-success', handleUpload)

    return () => {
      ctxRef.current?.removeEventListener('file-upload-success', handleUpload)
    }
  }, [onUpload, router])

  return (
    <div suppressHydrationWarning>
      <lr-config
        ctx-name="my-uploader"
        pubkey="a9428ff5ff90ae7a64eb"
      />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
      />
      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxRef}
      />
    </div>
  )
}

export default UploadCareButton
