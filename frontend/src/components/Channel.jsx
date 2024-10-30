import { Button, Dropdown } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { countMessages } from '../store/messagesSlice.js';
import store from '../store/index.js';
import { setActive } from '../store/channelsSlice.js';

const handleActiveChannel = (channel) => {
  const { dispatch } = store;
  dispatch(setActive({ channel }));
  const { messages } = store.getState().messagesStore;
  const test = messages.filter((el) => el.channelId === channel.id);
  dispatch(countMessages({ count: test.length }));
};

const renderRemovableChannel = (
  channel,
  setModalInfo,
  activeChannel,
) => {
  const buttonClasses = 'd-flex rounded-0 text-start';
  const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;

  return (
    <li key={channel.id}>
      <Dropdown className={buttonClasses}>
        <Button
          className="w-100 text-start text-truncate rounded-0"
          variant={buttonVariant}
          onClick={() => handleActiveChannel(channel)}
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

const Channel = ({ setModalInfo }) => {
  const channels = useSelector((state) => state.channelsStore.channels);
  const activeChannel = useSelector((state) => state.channelsStore.activeChannel);

  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel.id ? 'btn-secondary' : ''}`;
    const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;
    if (channel.removable) {
      return renderRemovableChannel(
        channel,
        setModalInfo,
        activeChannel,
      );
    }
    const channelHtml = (
      <li key={channel.id}>
        <Button
          variant={buttonVariant}
          className={buttonClasses}
          onClick={() => handleActiveChannel(channel)}
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

export default Channel;
