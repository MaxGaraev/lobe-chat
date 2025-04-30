'use client';
import { useEffect } from 'react';
import type { FC } from 'react';
import Image from 'next/image';

interface YandexMetrikaProps {
  metrikaId: string;
}

/**
 * Компонент для подключения Яндекс.Метрики.
 * Вставляет скрипт и <noscript> для корректной работы счетчика.
 */
const YandexMetrika: FC<YandexMetrikaProps> = ({ metrikaId }: { metrikaId: string }) => {
  useEffect(() => {
    // Проверяем, не был ли уже добавлен скрипт
    if (document.querySelector(`script[src='https://mc.yandex.ru/metrika/tag.js']`)) return;

    // Создаем скрипт для Яндекс.Метрики
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';

    // Код инициализации счетчика
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${metrikaId}, "init", {
        accurateTrackBounce:true,
        clickmap:true,
        trackLinks:true,
        webvisor:true
      });
    `;

    document.head.append(script);

    return () => {
      // Удаляем скрипт при размонтировании компонента
      script.remove();
    };
  }, [metrikaId]);

  // <noscript> для пользователей без JS
  return (
    <noscript>
      <div>
        <Image
          alt=""
          height={1}
          src={`https://mc.yandex.ru/watch/${metrikaId}`}
          style={{ left: '-9999px', position: 'absolute' }}
          width={1}
        />
      </div>
    </noscript>
  );
};

export default YandexMetrika; 