'use client';

import { Suspense, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import BrandTextLoading from '@/components/Loading/BrandTextLoading';

import { LayoutProps } from '../type';
import ChatHeader from './ChatHeader';
import Portal from './Portal';
import TopicPanel from './TopicPanel';

const Layout = ({ children, topic, conversation, portal }: LayoutProps) => {
  // Глобальный обработчик ChunkLoadError для автоматической перезагрузки страницы
  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      if (e?.message?.includes('Loading chunk') || e?.message?.includes('ChunkLoadError')) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  return (
    <>
      <ChatHeader />
      <Flexbox
        height={'100%'}
        horizontal
        style={{ overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <Flexbox
          height={'100%'}
          style={{ overflow: 'hidden', position: 'relative' }}
          width={'100%'}
        >
          {conversation}
        </Flexbox>
        {children}
        <Portal>
          <Suspense fallback={<BrandTextLoading />}>{portal}</Suspense>
        </Portal>
        <TopicPanel>{topic}</TopicPanel>
      </Flexbox>
    </>
  );
};

Layout.displayName = 'DesktopConversationLayout';

export default Layout;
