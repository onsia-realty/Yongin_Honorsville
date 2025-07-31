"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Car, Bus, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

export default function DirectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">오시는길</h1>
            <p className="text-xl md:text-2xl opacity-90">
              견본주택과 현장 위치를 안내해드립니다
            </p>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* 견본주택 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    견본주택
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-UCVmMWyoWE3CIWOAGqxUTPbMGCiPqs.png"
                      alt="견본주택 위치도"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">주소</h3>
                      <p className="text-gray-600">경기도 용인시 처인구 마평동 607-1</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">운영시간</h3>
                      <p className="text-gray-600">
                        평일/주말: 오전 10시 ~ 오후 7시<br />
                        (매주 화요일 휴관)
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">연락처</h3>
                      <p className="text-blue-600 font-bold text-lg">1668-5257</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href="https://naver.me/GZZmcu4H" target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2" />
                        네이버 지도
                      </a>
                    </Button>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                      <a href="https://open.kakao.com/o/g7AN2jIh" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        카카오톡 채팅
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* 현장주소 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    현장주소
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-L8RvFiAPURazNB6ohkjECA1M9eBkxx.png"
                      alt="현장 위치도"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">주소</h3>
                      <p className="text-gray-600">경기도 용인시 처인구 양지면 양지리 697번지 일원</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">대지면적</h3>
                      <p className="text-gray-600">XX,XXX㎡</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">건축규모</h3>
                      <p className="text-gray-600">지하 2층 ~ 지상 30층, 5개동</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href="https://naver.me/GCvZlIA2" target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2" />
                        네이버 지도
                      </a>
                    </Button>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                      <a href="https://open.kakao.com/o/g7AN2jIh" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        카카오톡 채팅
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">교통안내</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* 자차 이용 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Car className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">자차 이용시</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">서울 방면</h4>
                    <p className="text-gray-600 text-sm">
                      경부고속도로 → 신갈JC → 영동고속도로 → 용인IC → 17번국도 → 현장
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">세종/대전 방면</h4>
                    <p className="text-gray-600 text-sm">
                      서울~세종고속도로 → 동용인IC → 양지방면 → 현장
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">수원 방면</h4>
                    <p className="text-gray-600 text-sm">
                      영동고속도로 → 용인IC → 17번국도 → 양지방면 → 현장
                    </p>
                  </div>
                </div>
              </div>

              {/* 대중교통 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Bus className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">대중교통</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">버스 이용</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 용인시 시내버스 이용</li>
                      <li>• 양지터미널 경유 노선</li>
                      <li>• 마을버스 연계 운행</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">지하철 + 버스</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 분당선 → 용인경전철 환승</li>
                      <li>• 용인경전철 연장 예정</li>
                      <li>• 셔틀버스 운행 예정</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm font-medium">
                      💡 견본주택 방문시 무료 셔틀버스를 운영할 예정입니다.<br />
                      자세한 시간표는 전화 문의 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 전체 위치도 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">광역 교통망</h3>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%ED%98%84%EC%9E%A5%20%EC%A7%80%EB%8F%84.jpg-ETNrcTujTlU22TIbVs5CdNIAlFzUgS.jpeg"
                  alt="클러스터용인 경남아너스빌 광역 교통망"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">방문 예약 및 문의</h2>
            <p className="text-xl mb-8 opacity-90">
              견본주택 방문 전 미리 예약하시면 더욱 편리하게 관람하실 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4">
                <a href="tel:1668-5257">
                  <Phone className="w-6 h-6 mr-2" />
                  전화 예약하기
                </a>
              </Button>
              
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-lg px-8 py-4">
                <a href="https://open.kakao.com/o/g7AN2jIh" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  카카오톡 문의
                </a>
              </Button>
            </div>
            
            <div className="mt-8 text-sm opacity-80">
              <p>운영시간: 평일/주말 오전 10시 ~ 오후 7시 (매주 화요일 휴관)</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}