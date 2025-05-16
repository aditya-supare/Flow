'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/router'
import '@uploadcare/react-uploader/core.css';

type Props ={
    onUpload?: any
}

LR.registerBlocks(LR)

const UploadCareButton = ({onUpload}: Props) => {
    const router = useRouter()
    const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)


  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.reload()
      }
    }
    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener('file-upload-success', handleUpload);
    }
  
    return () => {
      if (ctxProviderRef.current) {
        ctxProviderRef.current.removeEventListener('file-upload-success', handleUpload);
      }
    };
  }, []);


  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="ee6010dbb2b99057168d"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}${LR.PACKAGE_VERSION}${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC_PACKAGE}`}
      />

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  )
}

export default UploadCareButton