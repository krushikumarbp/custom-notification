import React from 'react';
import { HTMLSourceProps } from '../../common/contentEditorTypes';
import IconSource from '../../common/svg/IconSource';

const HTMLSource: React.FC<HTMLSourceProps> = ({ toggleSource }) => {
  return (
    <div className="ce-toolbar--html-source">
      <button className="ce-toolbar--html-source-btn" type="button" onClick={toggleSource}>
        <IconSource size={22} />
      </button>
    </div>
  );
};

export default HTMLSource;
