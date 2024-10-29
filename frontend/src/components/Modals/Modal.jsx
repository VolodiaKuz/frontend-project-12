import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const Modal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  switch (modalInfo.type) {
    case 'add':
      return <AddChannelModal hideModal={hideModal} modalInfo={modalInfo} />;
    case 'remove':
      return <RemoveChannelModal hideModal={hideModal} modalInfo={modalInfo} />;
    case 'rename':
      return <RenameChannelModal hideModal={hideModal} modalInfo={modalInfo} />;
    default:
      return null;
  }
};

export default Modal;
