// import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  EllipsisButton,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  Search,
  Sidebar,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton
} from '@chatscope/chat-ui-kit-react';
import { formatRelative } from 'date-fns';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppContext } from '../../state/state';
import { sleep } from '../../utils/utils';
import SocketManager from './chat.service';

export default function () {
  const [socketReady, setSocketReady] = useState(false);
  const [userList, setUserList] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useContext(AppContext);

  const selectedChat = searchParams.get('chatId');

  const currentChatWithUser = userList.find((u) => u._id === selectedChat);
  const name = currentChatWithUser && currentChatWithUser.firstName + ' ' + currentChatWithUser.lastName;

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    const { _id, email, role } = userInfo;
    if (_id && email) {
      SocketManager.client.auth = {
        sessionID: _id,
        username: email,
        role
      };

      SocketManager.client.on('users', setUserList);
      SocketManager.client.on('get history response', setHistory);
      SocketManager.client.on('user connected', (id: string) => {
        setUserList((prev) => prev.map((u) => (u._id === id ? { ...u, isOnline: true } : u)));
      });
      SocketManager.client.on('user disconnected', (id: string) => {
        setUserList((prev) => prev.map((u) => (u._id === id ? { ...u, isOnline: false } : u)));
      });

      SocketManager.client.on('private message', (ev) => {
        setHistory((prevHistory) => [...prevHistory, ev]);
        setUserList((prev) => prev.map((u) => (u._id === ev.from || u._id === ev.to ? { ...u, lastMsg: ev } : u)));
      });

      SocketManager.connect()
        .then(() => sleep(500))
        .then(() => {
          setSocketReady(true);
        });
    }

    return () => {
      SocketManager.client.removeAllListeners();
    };
  }, [userInfo]);

  useEffect(() => {
    (async () => {
      if (selectedChat && socketReady) {
        SocketManager.client.emit('get history', selectedChat);
      }
    })();
  }, [selectedChat, socketReady]);

  const sendMessage = useCallback(
    (value: string) => {
      SocketManager.sendMessage(selectedChat, value);
    },
    [selectedChat]
  );

  const openChat = useCallback(
    (id: string) => {
      setSearchParams({ chatId: id });
    },
    [setSearchParams]
  );

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        position: 'relative'
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {userList.map((user: any) => {
              const username = user.firstName + ' ' + user.lastName;
              return (
                <Conversation
                  key={user._id}
                  name={username}
                  // lastSenderName={username}
                  info={user.lastMsg?.content || ''}
                  onClick={() => openChat(user._id)}
                  active={user._id === selectedChat}
                >
                  <Avatar
                    src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b"
                    name={username}
                    status={user.isOnline ? 'available' : 'unavailable'}
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        {selectedChat ? (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b" name={name} />
              <ConversationHeader.Content userName={name} info={currentChatWithUser?.isOnline ? 'online' : 'away'} />
            </ConversationHeader>
            <MessageList>
              {history.map((msg: any) => {
                const direction = selectedChat === msg.to ? 'outgoing' : 'incoming';
                const sentTime = formatRelative(msg.ts, Date.now());
                return (
                  <Message
                    key={msg.ts + ''}
                    model={{
                      sentTime,
                      sender: name,
                      direction,
                      position: 'single',
                      payload: msg.content
                    }}
                  >
                    {direction === 'incoming' && (
                      <Avatar src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b" name={name} />
                    )}
                    <Message.Footer sender="" sentTime={sentTime} />
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={sendMessage} attachButton={false} />
          </ChatContainer>
        ) : (
          <ChatContainer></ChatContainer>
        )}
      </MainContainer>
    </div>
  );
}
