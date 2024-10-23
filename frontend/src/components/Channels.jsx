import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
// import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const handleActiveChannel = (channel, setActiveChannel, setactiveChannelName) => {
  setActiveChannel(channel.id);
  setactiveChannelName(channel.name);
};

const renderRemovableChannel = (
  channel,
  activeChannel,
  setActiveChannel,
  setactiveChannelName,
  setModalInfo,
) => {
  const buttonClasses = 'w-100 rounded-0 text-start';
  const buttonVariant = `${channel.id === activeChannel ? 'secondary' : 'light'}`;
  // const notify = () => toast.success("тостер");
  // Добавить проверку плохих слов

  return (
    <li key={channel.id}>
      <Dropdown className={buttonClasses}>
        <Button
          variant={buttonVariant}
          onClick={() => handleActiveChannel(channel, setActiveChannel, setactiveChannelName)}
        >
          #
          {' '}
          {filter.clean(channel.name)}
        </Button>

        <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'remove', item: channel }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'rename', item: channel }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const renderChannels = (
  channels,
  activeChannel,
  setActiveChannel,
  setactiveChannelName,
  setModalInfo,
) => {
  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel ? 'btn-secondary' : ''}`;
    const buttonVariant = `${channel.id === activeChannel ? 'secondary' : 'light'}`;
    if (channel.removable) {
      return renderRemovableChannel(
        channel,
        activeChannel,
        setActiveChannel,
        setactiveChannelName,
        setModalInfo,
      );
    }
    const channelHtml = (
      <li key={channel.id}>
        <Button
          variant={buttonVariant}
          className={buttonClasses}
          onClick={() => handleActiveChannel(channel, setActiveChannel, setactiveChannelName)}
        >
          #
          {' '}
          {channel.name}
        </Button>
      </li>
    );
    return channelHtml;
  });
  return channelsHtml;
};

const renderModal = ({ modalInfo, hideModal }) => {
  console.log('it works');
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

const Channels = ({
  channels, activeChannel, setActiveChannel, setactiveChannelName,
}) => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <PlusSquare onClick={() => setModalInfo({ type: 'add', item: true })} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {renderChannels(
          channels,
          activeChannel,
          setActiveChannel,
          setactiveChannelName,
          setModalInfo,
        )}
      </ul>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default Channels;
