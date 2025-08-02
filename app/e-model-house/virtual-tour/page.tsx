'use client'

import React from 'react'

export default function VirtualTour() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">버추얼 투어</h1>
          <p className="text-xl">실감나는 360도 가상 투어를 체험하세요</p>
        </div>
      </section>

      {/* Virtual Tour Embed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Matterport or Kuula embed example */}
            <div className="aspect-video bg-gray-900">
              <iframe
                src="https://my.matterport.com/show/?m=EXAMPLE_ID"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="vr"
                title="Virtual Tour"
              />
              {/* 실제 구현 시 여기에 Matterport, Kuula 등의 embed URL 삽입 */}
            </div>
          </div>

          {/* Tour Options */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">123㎡</h3>
              <p className="text-gray-600 text-sm mb-4">넓은 공간의 프리미엄 평형</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                투어 시작 →
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">84A㎡</h3>
              <p className="text-gray-600 text-sm mb-4">효율적인 공간 구성</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                투어 시작 →
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">84B㎡</h3>
              <p className="text-gray-600 text-sm mb-4">다양한 라이프스타일 반영</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                투어 시작 →
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">커뮤니티</h3>
              <p className="text-gray-600 text-sm mb-4">클럽하우스 및 부대시설</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                투어 시작 →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}