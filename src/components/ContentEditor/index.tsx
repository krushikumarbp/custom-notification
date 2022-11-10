import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/commonHooks';
import Draft, { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useNavigate } from 'react-router-dom';
import { toolbarOptions } from './Toolbar/toolbarOptions';
import DynamicFieldsDropdown from './Toolbar/DynamicFieldsDropdown';
import NotificationService from '../../services/NotificationService';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './contentEditor.css';
import HTMLSource from './Toolbar/HtmlSource';
import DocumentDownload from './Toolbar/DocumentDownload';
import { DynamicFieldResponseType, AddNewNotificationRequestType } from '../common/commonTypes';
import ModalComponent from '../NotificationModal';
import { clearNotificationState, initialState } from '../../redux/notification/notificationSlice';
import NotificationLoader from '../NotificationLoader';
interface ContentEditorProps {
  dynamicList: DynamicFieldResponseType[];
  notificationContent: string;
  notificationId: number | null;
  updateNotificationData: AddNewNotificationRequestType;
  isModal: boolean;
  handleClose: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  dynamicList,
  notificationContent,
  notificationId,
  updateNotificationData,
  isModal,
  handleClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSourceVisible, setIsSourceVisible] = useState<boolean>(false);
  const [htmlSource, setHtmlSource] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const [editorState, setEditorState] = useState<Draft.EditorState>(EditorState.createEmpty());
  useEffect(() => {
    if (notificationContent) {
      const contentBlock = htmlToDraft(notificationContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [notificationContent]);

  const _setHtmlSource = (value: string) => {
    setHtmlSource(value);
  };

  const _handleSourceChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    _setHtmlSource(value);
  };

  const _onEditorStateChange = (es: Draft.EditorState) => {
    setEditorState(es);
  };

  const _setIsSourceVisible = () => {
    if (isSourceVisible) {
      const contentBlock = htmlToDraft(htmlSource);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    } else {
      const sourceValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setHtmlSource(sourceValue);
    }
    setIsSourceVisible(!isSourceVisible);
  };

  const _setExportToWord = () => {
    _exportToWord(`word-content-${new Date().toJSON().slice(0, 10)}`);
  };

  const _exportToWord = (filename: string = ''): void => {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = '</body></html>';
    var html = preHtml + draftToHtml(convertToRaw(editorState.getCurrentContent())) + postHtml;

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);
    const nav = window.navigator as any;

    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  };

  const dynamicListOptions = dynamicList.map((item) => ({
    ...item,
    value: item.dynamicFieldsTag,
    label: item.dynamicFieldsName,
  }));

  const getNotificationMesage = (): string => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const sendNotification = (): void => {
    handleClose();
    setIsLoader(true);
    if (notificationId) {
      const updateNotification = {
        ...updateNotificationData,
        notificationId: notificationId,
        notificationContent: getNotificationMesage(),
      };
      NotificationService.updateNotification(updateNotification)
        .then((res) => {
          dispatch(clearNotificationState(initialState));
          navigate(-1);
        })
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      const addNotification = { ...updateNotificationData, notificationContent: getNotificationMesage() };
      NotificationService.addNewNotification(addNotification)
        .then((res) => {
          dispatch(clearNotificationState(initialState));
          navigate(-1);
        })
        .finally(() => {
          setIsLoader(false);
        });
    }
  };

  return (
    <div className="cs-editor-wrapper">
      <Editor
        editorState={editorState}
        wrapperClassName="ce-wrapper"
        editorClassName={isSourceVisible ? 'ce-editor hide' : 'ce-editor'}
        onEditorStateChange={_onEditorStateChange}
        toolbarClassName={isSourceVisible ? 'cs-toolbar disabled' : 'cs-toolbar'}
        toolbar={toolbarOptions}
        toolbarCustomButtons={[
          <DynamicFieldsDropdown options={dynamicListOptions} />,
          <HTMLSource toggleSource={_setIsSourceVisible} />,
          <DocumentDownload exportToWord={_setExportToWord} />,
        ]}
      />
      {isSourceVisible && (
        <div className="cw-source">
          <textarea onChange={_handleSourceChange} value={htmlSource} className="cw-source--textarea" />
        </div>
      )}
      
      <ModalComponent
        isModal={isModal}
        handleClose={handleClose}
        sendNotification={sendNotification}
        notificationSubject={updateNotificationData?.notificationSubject}
        notificationMessage={getNotificationMesage()}
      />
      <NotificationLoader isLoader={isLoader} />
    </div>
  );
};

export default ContentEditor;
