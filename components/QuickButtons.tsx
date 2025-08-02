'use client'

import React, { useState, useEffect } from 'react'
import { Phone, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function QuickButtons() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 스크롤 다운 시 숨기고, 스크롤 업 시 보이기
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Desktop Version */}
      <div className={`hidden md:flex fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {/* 전화상담 */}
            <a
              href="tel:1668-5257"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              <div className="flex items-center justify-center py-6 px-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 group-hover:text-white/80">빠른 상담 문의</p>
                    <p className="text-xl font-bold text-gray-800 group-hover:text-white">전화상담</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </div>
            </a>

            {/* 오시는길 */}
            <Link
              href="/directions"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
            >
              <div className="flex items-center justify-center py-6 px-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-7 h-7 text-teal-600 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 group-hover:text-white/80">견본주택 위치</p>
                    <p className="text-xl font-bold text-gray-800 group-hover:text-white">오시는길</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </div>
            </Link>

            {/* 방문예약 */}
            <Link
              href="/registration"
              className="group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
            >
              <div className="flex items-center justify-center py-6 px-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Calendar className="w-7 h-7 text-purple-600 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 group-hover:text-white/80">사전 예약하기</p>
                    <p className="text-xl font-bold text-gray-800 group-hover:text-white">방문예약</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {/* 전화상담 */}
          <a
            href="tel:1668-5257"
            className="flex flex-col items-center justify-center py-4 bg-white active:bg-blue-50"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-2 shadow-md">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-800">전화상담</span>
          </a>

          {/* 오시는길 */}
          <Link
            href="/directions"
            className="flex flex-col items-center justify-center py-4 bg-white active:bg-teal-50"
          >
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mb-2 shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-800">오시는길</span>
          </Link>

          {/* 방문예약 */}
          <Link
            href="/registration"
            className="flex flex-col items-center justify-center py-4 bg-white active:bg-purple-50"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-2 shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-800">방문예약</span>
          </Link>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-30">
        <a
          href="tel:1668-5257"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-[0_4px_20px_rgba(239,68,68,0.4)] animate-pulse"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  )
}