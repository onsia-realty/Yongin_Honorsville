"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-900">
          클러스터용인 경남아너스빌
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link href="/floor-plan" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-t-lg">
                평면안내
              </Link>
              <Link href="/interior" className="block px-4 py-2 text-sm hover:bg-blue-50 rounded-b-lg">
                인테리어
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
            <Link href="/customer-registration" className="hover:text-blue-600 transition-colors cursor-pointer">
              관심고객등록
            </Link>
          </div>
        </nav>

        {/* Phone Button */}
        <a
          href="tel:1668-5257"
          className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>1668-5257</span>
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t max-h-96 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-4">
            {/* 사업개요 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">사업개요</div>
              <div className="pl-4 space-y-2">
                <Link href="/business" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  사업개요
                </Link>
                <Link href="/directions" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  오시는길
                </Link>
              </div>
            </div>

            {/* 프리미엄 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">프리미엄</div>
              <div className="pl-4 space-y-2">
                <Link href="/premium" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  프리미엄
                </Link>
                <Link href="/location" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  입지환경
                </Link>
              </div>
            </div>

            {/* 단지안내 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">단지안내</div>
              <div className="pl-4 space-y-2">
                <Link href="/site-plan" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  단지배치도
                </Link>
                <Link href="/system" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  시스템
                </Link>
                <Link href="/club-honors" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  클럽아너스
                </Link>
              </div>
            </div>

            {/* 세대안내 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">세대안내</div>
              <div className="pl-4 space-y-2">
                <Link href="/floor-plan" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  평면안내
                </Link>
                <Link href="/interior" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  인테리어
                </Link>
              </div>
            </div>

            {/* 홍보센터 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">홍보센터</div>
              <div className="pl-4 space-y-2">
                <Link href="/press" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  언론보도
                </Link>
                <Link href="/promotional-video" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  홍보영상
                </Link>
              </div>
            </div>

            {/* 분양센터 */}
            <div>
              <div className="font-semibold text-gray-800 mb-2">분양센터</div>
              <div className="pl-4 space-y-2">
                <Link href="/subscription-guide" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  청약안내
                </Link>
                <Link href="/sales-schedule" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  분양일정
                </Link>
                <Link href="/recruitment-notice" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  모집공고
                </Link>
                <Link href="/supply-guide" className="block text-sm hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  공급안내
                </Link>
              </div>
            </div>

            {/* 관심고객등록 */}
            <div>
              <Link href="/customer-registration" className="font-semibold text-gray-800 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                관심고객등록
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}