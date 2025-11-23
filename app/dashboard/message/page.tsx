'use client';

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {FiSearch,FiPlus, FiUser,FiMessageSquare, FiSend, FiPaperclip,  FiSmile, FiMoreHorizontal
} from 'react-icons/fi';



export default function MessagesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Sample conversations data
  const conversationsData = [
    {
      id: 'CONV-1001',
      user: { name: 'Emily Johnson', email: 'emily.johnson@example.com', avatar: '/images/avatars/emily.jpg' },
      lastMessage: 'Hello, I have a question about my order #78945',
      timestamp: '2023-11-15T14:30:00Z',
      unread: 2,
      status: 'unread'
    },
    {
      id: 'CONV-1002',
      user: { name: 'Michael Brown', email: 'michael.brown@example.com', avatar: '/images/avatars/michael.jpg' },
      lastMessage: 'Thank you for your help with the return process',
      timestamp: '2023-11-14T10:15:00Z',
      unread: 0,
      status: 'read'
    },
    {
      id: 'CONV-1003',
      user: { name: 'Sarah Williams', email: 'sarah.williams@example.com', avatar: '/images/avatars/sarah.jpg' },
      lastMessage: 'When will my order be shipped?',
      timestamp: '2023-11-14T09:45:00Z',
      unread: 1,
      status: 'unread'
    },
    {
      id: 'CONV-1004',
      user: { name: 'David Miller', email: 'david.miller@example.com', avatar: '/images/avatars/david.jpg' },
      lastMessage: 'I need to change my shipping address',
      timestamp: '2023-11-13T16:20:00Z',
      unread: 0,
      status: 'read'
    },
    {
      id: 'CONV-1005',
      user: { name: 'Jennifer Davis', email: 'jennifer.davis@example.com', avatar: '/images/avatars/jennifer.jpg' },
      lastMessage: 'The product arrived damaged',
      timestamp: '2023-11-12T11:30:00Z',
      unread: 0,
      status: 'read'
    }
  ];

  // Sample messages data
  const messagesData = {
    'CONV-1001': [
      { id: 'MSG-1', sender: 'customer', content: 'Hello, I have a question about my order #78945', timestamp: '2023-11-15T14:25:00Z' },
      { id: 'MSG-2', sender: 'admin', content: 'Hi Emily, I\'d be happy to help. What would you like to know?', timestamp: '2023-11-15T14:28:00Z' },
      { id: 'MSG-3', sender: 'customer', content: 'When can I expect my order to arrive?', timestamp: '2023-11-15T14:30:00Z' }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    // In a real app, you would send the message to your backend
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Messages Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
              <p className="text-gray-500 mt-1">Communicate with your customers</p>
            </div>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center mt-4 md:mt-0">
              <FiPlus className="mr-2" /> New Message
            </button>
          </div>

          {/* Messages Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-200px)]" data-aos="fade-up">
            <div className="flex h-full">
              {/* Conversations Sidebar */}
              <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                    />
                  </div>
                </div>

                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'inbox' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  >
                    Inbox
                  </button>
                  <button
                    onClick={() => setActiveTab('archived')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'archived' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  >
                    Archived
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {conversationsData.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => selectConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                          <FiUser className="text-gray-500" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{conversation.user.name}</h3>
                            <span className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message View */}
              <div className="hidden md:flex flex-col flex-1">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                          <FiUser className="text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">{selectedConversation.user.name}</h3>
                          <p className="text-xs text-gray-500">{selectedConversation.user.email}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <FiMoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      <div className="space-y-4">
                        {messagesData[selectedConversation.id]?.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'admin' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-green-100' : 'text-gray-500'}`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                          <FiPaperclip className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 ml-1">
                          <FiSmile className="w-5 h-5" />
                        </button>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 mx-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                          onClick={sendMessage}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <FiSend className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <FiMessageSquare className="w-12 h-12 text-gray-300 mx-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                      <p className="mt-1 text-sm text-gray-500">Select a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}