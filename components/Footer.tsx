import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* 관심고객 등록 폼 */}
          <div className="max-w-4xl mx-auto px-4 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">관심고객 등록</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">전문 상담원이 친절하게 안내해드립니다.</p>
            
            <form className="flex flex-col md:flex-row items-center gap-3 md:gap-x-6 justify-center">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-4 w-4 md:h-5 md:w-5 flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <input 
                    type="text" 
                    className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white w-24 md:w-32 text-sm px-3 py-2 rounded" 
                    placeholder="고객명" 
                    required 
                  />
                </div>
                <input 
                  type="tel" 
                  className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white w-32 md:w-40 text-sm px-3 py-2 rounded" 
                  placeholder="휴대폰번호" 
                  required 
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-white text-xs md:text-sm text-center">
                  <p className="mb-1">개인정보 수집·이용 동의</p>
                  <p className="text-xs opacity-80">(버튼 클릭 시 자동 동의됩니다)</p>
                </div>
                
                {/* 크게 배치된 전화 아이콘 */}
                <a 
                  href="tel:1668-5257" 
                  className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all shadow-lg"
                  title="1668-5257로 전화걸기"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>
              </div>
              
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 rounded-full text-sm font-bold transition-all w-full md:w-auto" 
                type="submit"
              >
                보내기
              </button>
            </form>
            
            {/* 카카오톡 문의 버튼 */}
            <div className="mt-6">
              <button 
                onClick={() => window.open('https://open.kakao.com/o/your-openchat-link', '_blank')}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-medium transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.199 0 4.535-4.701 8.199-10.5 8.199a11.5 11.5 0 0 1-2.186-.213c-.574.654-1.627 1.676-2.61 2.291-.196.123-.4-.106-.278-.308.616-1.018 1.319-2.24 1.514-3.169-2.69-1.31-4.44-3.725-4.44-6.8C1.5 6.664 6.201 3 12 3z"/>
                </svg>
                카카오톡 문의하기
              </button>
            </div>
          </div>

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
            <p className="font-semibold">(주)온시아 | 사업자등록번호 : 214-88-01749</p>
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