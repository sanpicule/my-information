import { useEffect } from 'react';

/**
 * モバイルブラウザでのスクロール時の表示領域可変を防ぐためのフック
 * iOS SafariのアドレスバーやAndroid Chromeのナビゲーションバーの表示/非表示による
 * ビューポート高さの変化を制御します
 */
export const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // 実際のビューポート高さを取得
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      
      // CSS変数に設定
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    };

    // 初回設定
    setViewportHeight();

    // リサイズ時の再計算
    const handleResize = () => {
      setViewportHeight();
    };

    // スクロール時の再計算（モバイルブラウザのUI変化に対応）
    const handleScroll = () => {
      // スクロールイベントの頻度を制限
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      
      window.scrollTimeout = setTimeout(() => {
        setViewportHeight();
      }, 100);
    };

    // オリエンテーション変更時の再計算
    const handleOrientationChange = () => {
      // オリエンテーション変更後、少し遅延してから再計算
      setTimeout(() => {
        setViewportHeight();
      }, 500);
    };

    // イベントリスナーを追加
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // モバイルブラウザの表示領域変化を検知
    if ('visualViewport' in window) {
      const handleVisualViewportChange = () => {
        setViewportHeight();
      };
      
      window.visualViewport?.addEventListener('resize', handleVisualViewportChange);
      
      // クリーンアップ時にvisualViewportのイベントリスナーも削除
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.visualViewport?.removeEventListener('resize', handleVisualViewportChange);
        
        if (window.scrollTimeout) {
          clearTimeout(window.scrollTimeout);
        }
      };
    }

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, []);
};

// TypeScriptの型拡張
declare global {
  interface Window {
    scrollTimeout?: number;
  }
}
