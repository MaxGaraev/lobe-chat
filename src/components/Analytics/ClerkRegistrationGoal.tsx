import React, { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

// Объявляем ym в глобальном scope для TypeScript
declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

// Можно прокинуть через пропсы, но для простоты берём из env
const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '101520300';

/**
 * Компонент для отправки цели Яндекс.Метрики при регистрации через Clerk.
 * Отправляет цель 'clerk_registration' только если пользователь только что зарегистрировался.
 */
const ClerkRegistrationGoal = () => {
  const { isSignedIn, user } = useUser();
  const wasSent = useRef(false);

  useEffect(() => {
    // Если пользователь залогинен впервые и цель ещё не отправлялась
    if (isSignedIn && user?.createdAt && !wasSent.current) {
      // Проверяем, что пользователь только что зарегистрировался (например, за последние 5 минут)
      const created = new Date(user.createdAt).getTime();
      const now = Date.now();
      if (now - created < 5 * 60 * 1000) {
        if (window.ym && METRIKA_ID) {
          window.ym(Number(METRIKA_ID), 'reachGoal', 'clerk_registration');
          wasSent.current = true;
        }
      }
    }
  }, [isSignedIn, user]);

  return null;
};

export default ClerkRegistrationGoal; 