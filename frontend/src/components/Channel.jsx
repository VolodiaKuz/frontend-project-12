import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector, useDispatch } from 'react-redux';

import { countMessages } from '../store/messagesSlice.js';
import { setActiveChannel } from '../store/channelsSlice.js';

const renderChannelButton = (channel, activeChannel, handleActiveChannel) => {
  const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel.id ? 'btn-secondary' : ''}`;
  const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;
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
};

const renderRemovableChannel = (channel, activeChannel, handleActiveChannel, setModalInfo, t) => {
  const removableChannelbuttonClasses = 'd-flex rounded-0 text-start';
  const removableChannelbuttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;

  return (
    <li key={channel.id}>
      <Dropdown className={removableChannelbuttonClasses}>
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={removableChannelbuttonVariant}
          onClick={() => handleActiveChannel(channel)}
        >
          #
          {' '}
          {filter.clean(channel.name)}
        </Button>

        <Dropdown.Toggle split variant={removableChannelbuttonVariant} id="dropdown-split-basic">
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
  const messages = useSelector((state) => state.messagesStore.messages);
  const activeChannel = useSelector((state) => state.channelsStore.activeChannel);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleActiveChannel = (channel) => {
    const channelMessages = messages.filter((el) => el.channelId === channel.id);
    dispatch(countMessages({ count: channelMessages.length }));
    dispatch(setActiveChannel({ channel }));
  };

  const channelsHtml = channels.map((channel) => (channel.removable
    ? renderRemovableChannel(channel, activeChannel, handleActiveChannel, setModalInfo, t)
    : renderChannelButton(channel, activeChannel, handleActiveChannel)));
  return channelsHtml;
};

export default Channel;
