import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChannelListItem from './ChannelListItem';

import {setChannels} from '../actions/channels';

class ChannelList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    fetch(`/api/channels/${this.props.user.region}`, {
            method: 'GET'})
    .then((response) => {
      console.log('Loading initial list of channels', response)
      return response.json()
    })
    .then((channels) => {
      this.props.setChannels(channels)
    }); 
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="channel-body">
        <div></div>
        <div className="ui center aligned large header">Channels</div>
        <div className="channel-list">
          <div className="ui piled segments ">
            {this.props.channels.map(channel => 
              <ChannelListItem 
                user={this.props.user} 
                channel={channel} 
                changeChannel={this.props.changeChannel} 
                setPage={this.props.setPage}
              />
            )}
          </div>
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }} />
        </div>
      </div>
    );  
  }
}
// = ({ user, channels, region, changeChannel, setPage, setChannels }) => {
//   fetch(`/api/channels/${region}`, {
//           method: 'GET'})
//   .then((response) => {
//     console.log('Loading initial list of channels', response)
//     return response.json()
//   })
//   .then((channels) => {
//     setChannels(channels)
//   });
//   return (
//     <div className="channel-list">
//       <div className="ui center aligned large header">Channels</div>
//       <div className="channel-list">
//         <div className="ui piled segments ">
//           {channels.map(channel => 
//             <ChannelListItem 
//               user={user} 
//               channel={channel} 
//               changeChannel={changeChannel} 
//               setPage={setPage}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = ({channels}) => ({
  channels
});

const mapDispatchToProps = dispatch => ({
  setChannels: channels => {
    dispatch(setChannels(channels));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelList));
//export default ChannelList;
