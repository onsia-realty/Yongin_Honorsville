"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hideHeader, setHideHeader] = useState(false)

  // 스크롤 이벤트 처리 (모바일에서 헤더 숨김/표시)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 스크롤 다운시 헤더 숨김, 스크롤 업시 헤더 표시 (클러스터 스타일)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideHeader(true)
      } else {
        setHideHeader(false)
      }
      
      // 스크롤 여부 체크
      setScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
      
      // 스크롤 reveal 효과 적용
      const reveals = document.querySelectorAll('.scroll-reveal')
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight - 150) {
          el.classList.add('revealed')
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 초기 실행
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // 메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        } ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* 모바일 헤더 (768px 미만) */}
        <div className="md:hidden">
          <div className="h-16 px-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-blue-900">
              클러스터용인 경남아너스빌
            </Link>
            
            <div className="flex items-center gap-3">
              {/* 모바일 전화 버튼 */}
              <a
                href="tel:1668-5257"
                className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full"
              >
                <Phone className="w-5 h-5" />
              </a>
              
              {/* 햄버거 메뉴 */}
              <button 
                className="relative w-10 h-10 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? 'top-2.5 rotate-45' : 'top-0'
                  }`} />
                  <span className={`absolute left-0 top-2.5 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? 'top-2.5 -rotate-45' : 'top-5'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 데스크톱 헤더 (768px 이상) */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-900">
              클러스터용인 경남아너스빌
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {/* 사업개요 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  사업개요
                </span>
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/business" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    사업개요
                  </Link>
                  <Link href="/directions" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    오시는길
                  </Link>
                </div>
              </div>

              {/* 프리미엄 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  프리미엄
                </span>
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/premium" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    프리미엄
                  </Link>
                  <Link href="/location" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    입지환경
                  </Link>
                </div>
              </div>

              {/* 단지안내 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  단지안내
                </span>
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/site-plan" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    단지배치도
                  </Link>
                  <Link href="/system" className="block px-4 py-2 text-sm hover:bg-blue-50">
                    시스템
                  </Link>
                  <Link href="/club-honors" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    클럽아너스
                  </Link>
                </div>
              </div>

              {/* 세대안내 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  세대안내
                </span>
                <div className="absolute top-full left-0 mt-2 w-52 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/floor-plan" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    평면안내
                  </Link>
                  <Link href="/interior" className="block px-4 py-2 text-sm hover:bg-blue-50">
                    인테리어
                  </Link>
                  <Link href="/e-model-house" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    E-모델하우스
                  </Link>
                </div>
              </div>

              {/* 홍보센터 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  홍보센터
                </span>
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/press" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    언론보도
                  </Link>
                  <Link href="/promotional-video" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    홍보영상
                  </Link>
                </div>
              </div>

              {/* 분양센터 */}
              <div className="relative group">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  분양센터
                </span>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/subscription-guide" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                    청약안내
                  </Link>
                  <Link href="/sales-schedule" className="block px-4 py-2 text-sm hover:bg-blue-50">
                    분양일정
                  </Link>
                  <Link href="/recruitment-notice" className="block px-4 py-2 text-sm hover:bg-blue-50">
                    모집공고
                  </Link>
                  <Link href="/supply-guide" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                    공급안내
                  </Link>
                </div>
              </div>

              {/* 관심고객등록 */}
              <div className="relative group">
                <Link href="/registration" className="hover:text-blue-600 transition-colors cursor-pointer">
                  관심고객등록
                </Link>
              </div>
            </nav>

            {/* Phone Button */}
            <a
              href="tel:1668-5257"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>1668-5257</span>
            </a>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 (슬라이드) */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* 배경 오버레이 */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* 메뉴 패널 */}
        <div className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-white transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* 메뉴 헤더 */}
          <div className="h-16 px-4 flex items-center justify-between border-b">
            <span className="text-lg font-bold text-blue-900">MENU</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* 메뉴 콘텐츠 */}
          <nav className="overflow-y-auto h-[calc(100%-4rem)]">
            <div className="py-4">
              {/* 사업개요 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">사업개요</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/business" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    사업개요
                  </Link>
                  <Link href="/directions" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    오시는길
                  </Link>
                </div>
              </div>

              {/* 프리미엄 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">프리미엄</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/premium" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    프리미엄
                  </Link>
                  <Link href="/location" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    입지환경
                  </Link>
                </div>
              </div>

              {/* 단지안내 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">단지안내</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/site-plan" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    단지배치도
                  </Link>
                  <Link href="/system" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    시스템
                  </Link>
                  <Link href="/club-honors" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    클럽아너스
                  </Link>
                </div>
              </div>

              {/* 세대안내 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">세대안내</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/floor-plan" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    평면안내
                  </Link>
                  <Link href="/interior" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    인테리어
                  </Link>
                  <Link href="/e-model-house" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    E-모델하우스
                  </Link>
                </div>
              </div>

              {/* 홍보센터 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">홍보센터</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/press" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    언론보도
                  </Link>
                  <Link href="/promotional-video" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    홍보영상
                  </Link>
                </div>
              </div>

              {/* 분양센터 */}
              <div className="border-b">
                <div className="px-4 py-3 font-semibold text-gray-800">분양센터</div>
                <div className="px-6 pb-3 space-y-2">
                  <Link href="/subscription-guide" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    청약안내
                  </Link>
                  <Link href="/sales-schedule" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    분양일정
                  </Link>
                  <Link href="/recruitment-notice" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    모집공고
                  </Link>
                  <Link href="/supply-guide" className="block py-2 text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    공급안내
                  </Link>
                </div>
              </div>

              {/* 관심고객등록 */}
              <div className="border-b">
                <Link href="/registration" className="block px-4 py-4 font-semibold text-gray-800 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  관심고객등록
                </Link>
              </div>
              
              {/* 전화 상담 버튼 */}
              <div className="p-4">
                <a
                  href="tel:1668-5257"
                  className="flex items-center justify-center space-x-2 w-full bg-green-500 text-white py-4 rounded-full hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-lg">1668-5257</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}