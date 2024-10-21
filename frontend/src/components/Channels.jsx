import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown } from 'react-bootstrap';
// import { useState } from 'react';

const openModalWindow = (setModalInfo) => {
  setModalInfo({ type: 'add', item: true})
}

const handleActiveChannel = (channel, setActiveChannel, setactiveChannelName) => {
  setActiveChannel(channel.id)
  setactiveChannelName(channel.name)
}

const renderRemovableChannel = (channel, activeChannel, setActiveChannel, setactiveChannelName) => {
  const buttonClasses = `w-100 rounded-0 text-start`;
  const buttonVariant = `${channel.id === activeChannel ? 'secondary' : 'light'}`;

  return (
    <li key={channel.id}>
    <Dropdown className={buttonClasses}>
      {/* <Button variant={buttonVariant} onClick={() => setActiveChannel(channel.id)}># test channel</Button> */}
      <Button variant={buttonVariant} onClick={() => handleActiveChannel(channel, setActiveChannel, setactiveChannelName)}># test channel</Button>

      <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </li>
  )
}

const renderChannels = (channels, activeChannel, setActiveChannel, setactiveChannelName) => {
  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel ? 'btn-secondary' : ''}`;
    const buttonVariant = `${channel.id === activeChannel ? 'secondary' : 'light'}`;
    if (channel.removable) return renderRemovableChannel(channel, activeChannel, setActiveChannel, setactiveChannelName);
    const channelHtml =
      <li key={channel.id}>
        <Button variant={buttonVariant} className={buttonClasses} onClick={() => handleActiveChannel(channel, setActiveChannel, setactiveChannelName)}># {channel.name}</Button>
      </li>
    return channelHtml;
  })
  return channelsHtml;
}

const Channels = ({ channels, activeChannel, setActiveChannel, setactiveChannelName, setModalInfo }) => {
  // const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  // const hideModal = () => setModalInfo({ type: null, item: null });
  // const showModal = (type, item = null) => setModalInfo({ type, item });

  // const renderModal = ({ modalInfo, hideModal }) => {
  //   if (!modalInfo.type) {
  //     return null;
  //   }
  
  //   return (
  //     <div
  //       className="modal show"
  //       style={{ display: 'block', position: 'initial' }}
  //     >
  //       <Modal.Dialog>
  //         <Modal.Header closeButton onClick={hideModal}>
  //           <Modal.Title>Modal title</Modal.Title>
  //         </Modal.Header>
  
  //         <Modal.Body>
  //           <p>Modal body text goes here.</p>
  //         </Modal.Body>
  
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={hideModal}>Close</Button>
  //           <Button variant="primary">Save changes</Button>
  //         </Modal.Footer>
  //       </Modal.Dialog>
  //     </div>
  //   );
  // };

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      {/* {renderModal({ modalInfo, hideModal })} */}
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button
          type='button'
          className='p-0 text-primary btn btn-group-vertical'
        >
          <PlusSquare onClick={() => openModalWindow(setModalInfo)}/>
          <span className='visually-hidden'>+</span>
        </button>
      </div>
      <ul
        id='channels-box'
        className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      >
        {renderChannels(channels, activeChannel, setActiveChannel, setactiveChannelName)}
        {/* <li>
        <Dropdown as={ButtonGroup}>
          <Button variant="success"># test channel</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </li> */}
      </ul>
  </div>
  )
};

export default Channels;