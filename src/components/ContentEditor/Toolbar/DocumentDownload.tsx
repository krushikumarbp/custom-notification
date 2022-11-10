import React from 'react';
import { DocumentDownloadProps } from '../../common/contentEditorTypes';
import IconMsWord from '../../common/svg/IconMsWord';

const DocumentDownload: React.FC<DocumentDownloadProps> = ({ exportToWord }) => {
  return (
    <div className="ce-toolbar">
      <button className="ce-toolbar--document-download-btn" type="button" onClick={exportToWord}>
        <IconMsWord size={40} />
      </button>
    </div>
  );
};
export default DocumentDownload;
