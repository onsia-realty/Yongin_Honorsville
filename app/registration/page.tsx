"use client"

import React, { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { trackRegistration } from "@/lib/naver-conversion"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '')
      
      // 11자리 제한
      if (numbers.length > 11) {
        return
      }
      
      // 자동 포맷팅
      let formattedValue = numbers
      if (numbers.length >= 4 && numbers.length <= 7) {
        formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3)}`
      } else if (numbers.length >= 8) {
        formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
      }
      
      setFormData(prev => ({
        ...prev,
        phone: formattedValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert("고객명을 입력해 주세요.")
      return
    }

    if (!formData.phone.trim()) {
      alert("핸드폰 번호를 입력해 주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Vercel Postgres DB에 저장 (우선순위 1)
      try {
        console.log('DB 저장 시작:', {
          site: 'yongin-honorsville',
          name: formData.name,
          phone: formData.phone,
          source: 'registration-page'
        })

        const dbResponse = await fetch('/api/save-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            site: 'yongin-honorsville',
            name: formData.name,
            phone: formData.phone,
            inquiry: '관심고객 등록',
            source: 'registration-page'
          })
        })

        const dbResult = await dbResponse.json()
        console.log('DB 저장 결과:', dbResult)

        if (!dbResult.success) {
          console.error('DB 저장 실패:', dbResult.error)
        }
      } catch (dbError) {
        console.error('DB 저장 중 오류:', dbError)
        // DB 저장 실패해도 계속 진행 (Google Sheets 백업)
      }

      // 2. Google Sheets에 데이터 저장 (백업)
      try {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeqe6lDq75BkvIJ8r0jAfyO59H9hDrOc9cXRMy9zl3uPSlSjTDJ3JDXML3w67SaDme/exec'

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // CORS 문제 해결
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            timestamp: new Date().toLocaleString('ko-KR'),
            source: '관심고객 등록 페이지'
          })
        })

        // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
        console.log('Google Sheets 전송 완료:', {
          name: formData.name,
          phone: formData.phone
        })
      } catch (sheetsError) {
        console.error('Google Sheets 저장 실패:', sheetsError)
        // 시트 저장 실패해도 계속 진행 (SMS는 보내야 함)
      }

      // 관리자에게 SMS 알림 발송
      try {
        console.log('SMS 발송 시작:', {
          name: formData.name,
          phone: formData.phone,
          timestamp: new Date().toLocaleString('ko-KR')
        })
        
        const notificationResponse = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
          })
        })

        console.log('SMS API 응답 상태:', notificationResponse.status)
        const notificationResult = await notificationResponse.json()
        console.log('SMS API 응답 내용:', notificationResult)
        
        if (notificationResult.success) {
          console.log(`SMS 발송 성공:`, notificationResult)
        } else {
          console.error('SMS 발송 실패 - 상세 오류:', notificationResult)
          // 디버깅을 위해 alert 추가 (나중에 제거 가능)
          // alert(`SMS 발송 실패: ${notificationResult.error || '알 수 없는 오류'}`)
          // 알림 발송 실패해도 고객 등록은 성공으로 처리
        }
      } catch (notificationError) {
        console.error('SMS 발송 중 오류 (catch):', notificationError)
        // 알림 발송 실패해도 고객 등록은 성공으로 처리
      }

      // 네이버 전환 추적 - 관심고객 등록 완료
      trackRegistration()

      alert("관심고객 등록이 완료되었습니다.\n\n담당자가 빠른 시일 내에 연락드리겠습니다.\n\n감사합니다.")
      
      // 폼 초기화
      setFormData({
        name: '',
        phone: ''
      })

    } catch (error) {
      console.error('등록 실패:', error)
      alert("등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 헤로 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">관심고객 등록</h1>
          <p className="text-lg opacity-90">클러스터용인 경남아너스빌에 관심을 가져주셔서 감사합니다</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          
          {/* 개인정보 동의 안내 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-3">✓ 개인정보 처리 안내</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>• <strong>수집목적:</strong> 분양 상담 및 정보 제공</p>
              <p>• <strong>수집항목:</strong> 이름, 연락처</p>
              <p>• <strong>보유기간:</strong> 분양 완료 후 1년</p>
              <p className="text-blue-600 font-medium mt-3">
                등록 버튼 클릭 시 개인정보 수집·이용에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </div>

          {/* 등록 폼 */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 고객명 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  고객명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="성함을 입력해주세요"
                  required
                />
              </div>

              {/* 핸드폰 번호 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  핸드폰 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="010-1234-5678"
                  required
                />
              </div>


              {/* 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-lg"
                >
                  {isSubmitting ? '등록 중...' : '등록하기'}
                </button>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-lg"
                >
                  취소
                </button>
              </div>

            </form>
          </div>

          {/* 문의 안내 */}
          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">전화 문의</h4>
              <a 
                href="tel:1668-5257" 
                className="inline-flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700"
              >
                📞 1668-5257
              </a>
              <p className="text-sm text-gray-600 mt-2">평일 09:00 ~ 18:00</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}