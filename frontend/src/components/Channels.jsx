import { PlusSquare } from 'react-bootstrap-icons';

const renderChannels = (channels, activeChannel, setActiveChannel) => {
  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.name === activeChannel ? 'btn-secondary' : ''}`;
    const channelHtml =
      <li key={channel.id}>
        <button
          type='button'
          className={buttonClasses}
          onClick={() => setActiveChannel(channel.id)}
        >
          <span className='me-1'>#</span>{channel.name}
        </button>
      </li>
    return channelHtml;
  })
  return channelsHtml;
}

const Channels = ({ channels, activeChannel, setActiveChannel }) => {
  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button
          type='button'
          className='p-0 text-primary btn btn-group-vertical'
        >
          <PlusSquare />
          <span className='visually-hidden'>+</span>
        </button>
      </div>
      <ul
        id='channels-box'
        className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      >
        {renderChannels(channels, activeChannel, setActiveChannel)}
      </ul>
  </div>
  )
};

export default Channels;