'use client';

/**
 * AnalyticsTracker - ONSIA Tracker 연동 컴포넌트
 * 방문자 추적, 페이지뷰, 클릭 이벤트 수집
 */

import { useEffect, useRef, useCallback } from 'react';
import { generateFingerprint, getDeviceInfo, parseUTMParams } from '@/lib/fingerprint';

interface AnalyticsConfig {
  apiEndpoint: string;
  siteSlug: string;
  trackClicks?: boolean;
  trackScroll?: boolean;
  trackMouse?: boolean;
  debugMode?: boolean;
}

interface AnalyticsTrackerProps {
  config: AnalyticsConfig;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function generateCookieId(): string {
  return 'ck_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function AnalyticsTracker({ config }: AnalyticsTrackerProps) {
  const {
    apiEndpoint,
    siteSlug,
    trackClicks = true,
    trackScroll = true,
    trackMouse = true,
    debugMode = false,
  } = config;

  const sessionIdRef = useRef<string | null>(null);
  const pageViewIdRef = useRef<string | null>(null);
  const pageEnterTimeRef = useRef<number>(Date.now());
  const maxScrollDepthRef = useRef<number>(0);
  const scrollEventsRef = useRef<number>(0);
  const mouseMovementsRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);

  const log = useCallback(
    (...args: unknown[]) => {
      if (debugMode) {
        console.log('[Analytics]', ...args);
      }
    },
    [debugMode]
  );

  const apiCall = useCallback(
    async (endpoint: string, method: string, body?: object) => {
      try {
        const response = await fetch(`${apiEndpoint}${endpoint}`, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
        });
        return await response.json();
      } catch (error) {
        console.error('Analytics API error:', error);
        return null;
      }
    },
    [apiEndpoint]
  );

  const initSession = useCallback(async () => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    log('Initializing session...');

    const fingerprint = await generateFingerprint();
    const deviceInfo = getDeviceInfo();
    const utmParams = parseUTMParams();

    let cookieId = getCookie('_onsia_cid');
    if (!cookieId) {
      cookieId = generateCookieId();
      setCookie('_onsia_cid', cookieId, 365);
    }

    const result = await apiCall('/session', 'POST', {
      fingerprint: fingerprint.hash,
      cookieId,
      ...deviceInfo,
      referrer: document.referrer || null,
      referrerDomain: document.referrer ? new URL(document.referrer).hostname : null,
      ...utmParams,
      landingSiteSlug: siteSlug,
    });

    if (result?.sessionId) {
      sessionIdRef.current = result.sessionId;
      log('Session initialized:', result.sessionId, result.isNew ? '(new)' : '(existing)');

      if (result.isBlocked) {
        log('Session is blocked, stopping tracking');
        return;
      }

      await recordPageView();
    } else {
      log('Failed to initialize session:', result);
    }
  }, [apiCall, log, siteSlug]);

  const recordPageView = useCallback(async () => {
    if (!sessionIdRef.current) return;

    const result = await apiCall('/pageview', 'POST', {
      sessionId: sessionIdRef.current,
      landingSiteSlug: siteSlug,
      path: window.location.pathname,
      fullUrl: window.location.href,
      title: document.title,
    });

    if (result?.pageViewId) {
      pageViewIdRef.current = result.pageViewId;
      log('Page view recorded:', result.pageViewId);
    }
  }, [apiCall, log, siteSlug]);

  const updatePageView = useCallback(
    async (exitType: string = 'navigate') => {
      if (!pageViewIdRef.current) return;

      const dwellTime = Math.round((Date.now() - pageEnterTimeRef.current) / 1000);

      await apiCall('/pageview', 'PATCH', {
        pageViewId: pageViewIdRef.current,
        dwellTime,
        scrollDepth: maxScrollDepthRef.current,
        scrollEvents: scrollEventsRef.current,
        mouseMovements: mouseMovementsRef.current,
        clicks: clickCountRef.current,
        exitType,
      });

      log('Page view updated:', { dwellTime, scrollDepth: maxScrollDepthRef.current, exitType });
    },
    [apiCall, log]
  );

  const trackClick = useCallback(
    async (event: MouseEvent) => {
      if (!sessionIdRef.current) return;

      clickCountRef.current++;

      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      const button = target.closest('button');
      const clickableElement = anchor || button || target;

      let eventType = 'general_click';
      let targetUrl: string | null = null;
      let targetText: string | null = null;

      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        targetUrl = href;
        targetText = anchor.textContent?.trim() || null;

        if (href.startsWith('tel:')) {
          eventType = 'phone_click';
        } else if (href.startsWith('http') && !href.includes(window.location.hostname)) {
          eventType = 'external_link';
        } else if (target.closest('[data-cta]') || /문의|상담|예약|신청|접수/.test(targetText || '')) {
          eventType = 'cta_click';
        }
      } else if (button) {
        targetText = button.textContent?.trim() || null;
        if (target.closest('[data-cta]') || /문의|상담|예약|신청|접수/.test(targetText || '')) {
          eventType = 'cta_click';
        }
      }

      const utmParams = parseUTMParams();
      const dwellTimeBeforeClick = Math.round((Date.now() - pageEnterTimeRef.current) / 1000);

      const result = await apiCall('/click', 'POST', {
        sessionId: sessionIdRef.current,
        landingSiteSlug: siteSlug,
        eventType,
        targetUrl,
        targetElement: clickableElement.tagName.toLowerCase(),
        targetText: targetText?.substring(0, 100),
        clickX: event.clientX,
        clickY: event.clientY,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        adSource: utmParams.source,
        adCampaign: utmParams.campaign,
        adKeyword: utmParams.term,
        pageUrl: window.location.href,
        dwellTimeBeforeClick,
        scrollDepthBeforeClick: maxScrollDepthRef.current,
        mouseMovementsBeforeClick: mouseMovementsRef.current,
      });

      if (result?.isFraud) {
        log('⚠️ Fraud click detected:', result.reasons);
      } else {
        log('Click tracked:', eventType);
      }
    },
    [apiCall, log, siteSlug]
  );

  const handleScroll = useCallback(() => {
    scrollEventsRef.current++;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    if (scrollPercent > maxScrollDepthRef.current) {
      maxScrollDepthRef.current = scrollPercent;
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    mouseMovementsRef.current++;
  }, []);

  useEffect(() => {
    initSession();

    const throttledScroll = throttle(handleScroll, 200);
    const throttledMouse = throttle(handleMouseMove, 100);

    if (trackScroll) window.addEventListener('scroll', throttledScroll, { passive: true });
    if (trackMouse) window.addEventListener('mousemove', throttledMouse, { passive: true });
    if (trackClicks) document.addEventListener('click', trackClick);

    const handleBeforeUnload = () => updatePageView('unload');
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') updatePageView('hidden');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (trackScroll) window.removeEventListener('scroll', throttledScroll);
      if (trackMouse) window.removeEventListener('mousemove', throttledMouse);
      if (trackClicks) document.removeEventListener('click', trackClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [initSession, handleScroll, handleMouseMove, trackClick, updatePageView, trackScroll, trackMouse, trackClicks]);

  return null;
}

function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
