'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Maximize2, Home } from 'lucide-react'

const rooms = [
  { id: 'living', name: '거실', image: '/model-house/living-room.jpg' },
  { id: 'kitchen', name: '주방', image: '/model-house/kitchen.jpg' },
  { id: 'master', name: '안방', image: '/model-house/master-bedroom.jpg' },
  { id: 'bedroom1', name: '침실1', image: '/model-house/bedroom1.jpg' },
  { id: 'bedroom2', name: '침실2', image: '/model-house/bedroom2.jpg' },
  { id: 'bathroom', name: '욕실', image: '/model-house/bathroom.jpg' },
]

export default function EModelHouse() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length)
  }

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">E-모델하우스</h1>
          <p className="text-xl">클러스터용인 경남아너스빌을 미리 체험해보세요</p>
        </div>
      </section>

      {/* Model House Viewer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Room Navigation */}
          <div className="flex justify-center mb-8 space-x-2 flex-wrap">
            {rooms.map((room, index) => (
              <Button
                key={room.id}
                variant={currentRoom === index ? 'default' : 'outline'}
                onClick={() => setCurrentRoom(index)}
                className="mb-2"
              >
                {room.name}
              </Button>
            ))}
          </div>

          {/* 360 Viewer */}
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'} bg-gray-900 rounded-lg overflow-hidden`}>
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Room Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={rooms[currentRoom].image}
                alt={rooms[currentRoom].name}
                fill
                className="object-contain"
                priority
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 bg-black/50 hover:bg-black/70 text-white"
                onClick={prevRoom}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextRoom}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Room Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{rooms[currentRoom].name}</h2>
              <p className="text-gray-200">360도 뷰로 공간을 둘러보세요</p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">실제 크기 체험</h3>
              <p className="text-gray-600">실제 평형과 동일한 크기로 구현된 모델하우스를 체험해보세요.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">인테리어 옵션</h3>
              <p className="text-gray-600">다양한 인테리어 옵션을 미리 확인하고 선택할 수 있습니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">VR 체험 지원</h3>
              <p className="text-gray-600">VR 기기를 통해 더욱 실감나는 공간 체험이 가능합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}