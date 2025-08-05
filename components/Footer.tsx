import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 footer-section">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">더 자세한 정보가 필요하신가요?</h2>
          <p className="text-xl mb-8 opacity-90">전문 상담원이 친절하게 안내해드립니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1668-5257" className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              전화 상담하기
            </a>
            <a href="/directions" className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              오시는길 안내
            </a>
            <a href="https://open.kakao.com/o/sen4dWJh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold transition-all">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.633 1.91 4.925 4.761 6.178-.206.716-.664 2.31-.762 2.664-.123.446.164.442.345.321.142-.095 2.265-1.533 3.189-2.16.485.068.98.102 1.467.102 5.523 0 10-3.477 10-7.605S17.523 3 12 3z"></path>
              </svg>
              카카오톡 문의
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">

          {/* 전화번호 */}
          <div className="mb-8">
            <a 
              href="tel:1668-5257" 
              className="text-3xl font-bold text-blue-900 mb-2 block hover:text-blue-700 transition-colors cursor-pointer"
            >
              1668-5257
            </a>
            <div className="text-lg text-gray-600">분양문의 (클릭하여 전화걸기)</div>
          </div>

          {/* 회사정보 */}
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <p className="text-lg font-bold text-blue-900">현장명 : 용인 클러스터 경남 아너스빌</p>
            <p className="font-semibold">사업자등록번호 : 243-88-01749</p>
            <p>
              <span className="text-blue-600 font-semibold">현장</span> 경기도 용인시 처인구 양지면 양지리 697번지 일원
            </p>
            <p className="font-medium">COPYRIGHT © 2025.클러스터용인 경남아너스빌. ALL RIGHTS RESERVED.</p>
          </div>

          {/* 주의사항 */}
          <div className="border-t border-gray-300 pt-6 text-xs text-gray-500 space-y-2">
            <p>※ 본 사이트에 사용된 CG는 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다.</p>
            <p>※ 상기 위치도, 교통도, 사진 등은 소비자의 이해를 돕기 위한 것이므로 실제와 차이가 있을 수 있습니다.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}