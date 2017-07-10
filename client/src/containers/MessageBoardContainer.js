import { connect } from 'react-redux';
import { setMessages, updateMessages } from '../actions/messages';
import { changeChannel } from '../actions/user';

import MessageBoard from '../components/MessageBoard';

const mapStateToProps = ({ messages, user }, { socket }) => ({ // state, ownProps
  messages,
  user,
  socket
});

const mapDispatchToProps = dispatch => ({
  setMessages: messages => {
    console.log('In Container setMessages', messages)
    dispatch(setMessages(messages));
  },
  updateMessages: message => {
    console.log('In Container updateMessages', message)

    dispatch(updateMessages(message));
  },
  updateInitialMessages: messages => {
    dispatch(updateInitialMessages(messages));
  },
  changeChannel: channel => {
    dispatch(changeChannel(channel));
  }
});

const MessageBoardContainer = connect(mapStateToProps, mapDispatchToProps)(MessageBoard);

export default MessageBoardContainer;
