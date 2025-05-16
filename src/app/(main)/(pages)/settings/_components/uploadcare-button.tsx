'use client'; // only if using in a React Server Component context
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

type Props = {
  onUpload: (cdnUrl: string) => void;
};

const UploadCareButton = ({ onUpload }: Props) => {
  return (
    <div>
      <FileUploaderRegular
        pubkey="ee6010dbb2b99057168d"
        sourceList="local, camera, facebook, gdrive"
        onUploadComplete={(fileInfo) => {
          const cdnUrl = fileInfo.cdnUrl;
          onUpload(cdnUrl);
        }}
        classNameUploader="uc-dark uc-purple"
      />
    </div>
  );
};

export default UploadCareButton;
