import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';

import store from '../store/index.js';
import { countMessages } from '../store/messagesSlice.js';
import { setActiveChannel } from '../store/userSlice.js';

const handleActiveChannel = (channel) => {
  const { dispatch } = store;
  const { messages } = store.getState().messagesStore;
  const channelMessages = messages.filter((el) => el.channelId === channel.id);
  dispatch(countMessages({ count: channelMessages.length }));
  dispatch(setActiveChannel({ channel }));
};

const renderRemovableChannel = (
  channel,
  setModalInfo,
  activeChannel,
  t,
) => {
  const buttonClasses = 'd-flex rounded-0 text-start';
  const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;

  return (
    <li key={channel.id}>
      <Dropdown className={buttonClasses}>
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={buttonVariant}
          onClick={() => handleActiveChannel(channel)}
        >
          #
          {' '}
          {filter.clean(channel.name)}
        </Button>

        <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic">
          <span className="visually-hidden">{t('channels.menu')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'remove', item: channel }))}>{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'rename', item: channel }))}>{t('channels.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const Channel = ({ setModalInfo }) => {
  const channels = useSelector((state) => state.channelsStore.channels);
  const activeChannel = useSelector((state) => state.userStore.activeChannel);
  const { t } = useTranslation();

  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel.id ? 'btn-secondary' : ''}`;
    const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;
    if (channel.removable) {
      return renderRemovableChannel(
        channel,
        setModalInfo,
        activeChannel,
        t,
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
