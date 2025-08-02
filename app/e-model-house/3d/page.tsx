'use client'

import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Home, Move3d, ZoomIn, ZoomOut } from 'lucide-react'

export default function ModelHouse3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Three.js 초기화 코드는 여기에 구현
    // 실제 구현 시 three.js 라이브러리 설치 필요
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">3D 모델하우스</h1>
          <p className="text-xl">클릭과 드래그로 자유롭게 둘러보세요</p>
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Controls */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  처음 위치로
                </Button>
                <Button variant="secondary" size="sm">
                  <Move3d className="w-4 h-4 mr-2" />
                  자유 시점
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div ref={containerRef} className="aspect-video bg-gray-900">
              <div className="h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-lg">3D 모델 로딩 중...</p>
                  <p className="text-sm text-gray-400 mt-2">실제 구현 시 Three.js로 3D 모델이 표시됩니다</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">사용 방법</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 마우스 왼쪽 버튼: 회전</li>
              <li>• 마우스 오른쪽 버튼: 이동</li>
              <li>• 마우스 휠: 확대/축소</li>
              <li>• 방 클릭: 해당 공간으로 이동</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}