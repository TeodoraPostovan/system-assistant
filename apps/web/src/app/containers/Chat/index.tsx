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
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SocketManager from './chat.service';

export default function () {
  const [chatState, setChatState] = useState(
    [] as {
      username: string;
      messages: {
        from: string;
        to: string;
        content: string;
        _id: string;
      }[];
      connected: boolean;
      sessionID: string;
    }[]
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedChat = searchParams.get('chatId');

  const currentChatWithUser = chatState.find((u) => u.sessionID === selectedChat);
  const currentHistory = currentChatWithUser?.messages || [];

  useEffect(() => {
    (async () => {
      const users: any = await SocketManager.connect();
      setChatState(users);
    })();
  }, []);

  useEffect(() => {
    const removeEventListener = SocketManager.onMessage((ev) => {
      setChatState((prevState) => {
        return prevState.map((chatHistory) => {
          if (chatHistory.sessionID === selectedChat) {
            return {
              ...chatHistory,
              messages: [...chatHistory.messages, ev]
            };
          }

          return chatHistory;
        });
      });
    });

    return () => {
      removeEventListener();
    };
  }, [selectedChat]);

  useEffect(() => {
    const removeEventListener = SocketManager.onUserConnected((ev) => {
      setChatState((prevState) => {
        // return prevState.map((chatHistory) => {
        //   if (chatHistory.sessionID === selectedChat) {
        //     return {
        //       ...chatHistory,
        //       messages: [...chatHistory.messages, ev]
        //     };
        //   }

        //   return chatHistory;
        // });

        return [...prevState, ev];
      });
    });

    return () => {
      removeEventListener();
    };
  }, [selectedChat]);

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
            {chatState.map((user: any, i) => (
              <Conversation
                key={'' + i + user.username}
                name={user.username}
                lastSenderName={user.username}
                info="Yes i can do it for you"
                onClick={() => openChat(user.sessionID)}
                active={user.sessionID === selectedChat}
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b"
                  name={user.username}
                  status={user.connected ? 'available' : 'unavailable'}
                />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>

        {selectedChat ? (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar
                src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b"
                name={currentChatWithUser?.username}
              />
              <ConversationHeader.Content
                userName={currentChatWithUser?.username}
                info={currentChatWithUser?.connected ? 'online' : 'away'}
              />
            </ConversationHeader>
            <MessageList>
              {currentHistory.map((msg: any) => {
                const direction = selectedChat === msg.to ? 'outgoing' : 'incoming';
                const sentTime = formatRelative(msg.ts, Date.now());
                return (
                  <Message
                    key={msg.ts + ''}
                    model={{
                      sentTime,
                      sender: currentChatWithUser.username,
                      direction,
                      position: 'single',
                      payload: msg.content
                    }}
                  >
                    {direction === 'incoming' && (
                      <Avatar
                        src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b"
                        name={currentChatWithUser.username}
                      />
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
