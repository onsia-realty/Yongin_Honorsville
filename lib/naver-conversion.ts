/**
 * 네이버 광고 전환 추적 유틸리티
 *
 * 사용법:
 * 1. 관심고객 등록 완료 시: trackNaverConversion('registration')
 * 2. 전화 연결 클릭 시: trackNaverConversion('call')
 * 3. 상담 신청 완료 시: trackNaverConversion('consultation')
 */

// 전환 타입 정의
export type NaverConversionType =
  | 'registration'    // 관심고객 등록
  | 'call'           // 전화 연결
  | 'consultation'   // 상담 신청
  | 'pageview'       // 페이지 조회
  | 'purchase'       // 구매 (분양계약)

// 전환 타입별 네이버 전환 코드
const CONVERSION_CODES: Record<NaverConversionType, string> = {
  registration: '1',    // 회원가입/등록
  call: '2',           // 전화/전환
  consultation: '3',   // 상담신청
  pageview: '4',       // 페이지조회
  purchase: '5',       // 구매/계약
}

declare global {
  interface Window {
    wcs_add?: { wa?: string }
    wcs?: {
      cnv: (type: string, value: string) => object
      inflow: (domain: string) => void
    }
    wcs_do?: (nasa?: object) => void
  }
}

/**
 * 네이버 전환 추적 함수
 * @param type - 전환 타입 (registration, call, consultation, pageview, purchase)
 * @param value - 전환 값 (기본값: '1')
 */
export function trackNaverConversion(
  type: NaverConversionType,
  value: string = '1'
): void {
  try {
    if (typeof window === 'undefined') return

    const naverAdsId = process.env.NEXT_PUBLIC_NAVER_ADS_ID || 's_5b5e8f4e9c9a'

    if (typeof window.wcs !== 'undefined' && typeof window.wcs_do !== 'undefined') {
      if (!window.wcs_add) window.wcs_add = {}
      window.wcs_add['wa'] = naverAdsId

      const _nasa: { cnv?: object } = {}
      _nasa['cnv'] = window.wcs.cnv(CONVERSION_CODES[type], value)

      window.wcs_do(_nasa)

      console.log(`[Naver Conversion] Tracked: ${type}, value: ${value}`)
    } else {
      console.warn('[Naver Conversion] wcs not loaded yet, retrying...')
      // 스크립트 로드가 지연된 경우 재시도
      setTimeout(() => trackNaverConversion(type, value), 500)
    }
  } catch (error) {
    console.error('[Naver Conversion] Error:', error)
  }
}

/**
 * 관심고객 등록 전환 추적
 */
export function trackRegistration(): void {
  trackNaverConversion('registration', '1')
}

/**
 * 전화 연결 클릭 전환 추적
 */
export function trackCallClick(): void {
  trackNaverConversion('call', '1')
}

/**
 * 상담 신청 전환 추적
 */
export function trackConsultation(): void {
  trackNaverConversion('consultation', '1')
}
