"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">사업개요</h1>
            <p className="text-xl md:text-2xl opacity-90">
              반도체 프리미엄 직접 영향권의 최고급 주거단지
            </p>
          </div>
        </section>

        {/* Business Overview Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            {/* 프로젝트 개요 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">프로젝트 개요</h2>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Image
                  src="/250704_클러스터용인 경남아너스빌_상품교육자료(3차)_분양가X-이미지-17.jpg"
                  alt="클러스터용인 경남아너스빌 사업개요"
                  width={1600}
                  height={900}
                  className="h-auto object-contain"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>

            {/* 입지 특장점 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">입지 특장점</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">01</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">반도체 클러스터 근접</h3>
                  <p className="text-gray-600">
                    SK하이닉스, 삼성전자 반도체 클러스터까지<br />
                    동용인IC를 통해 10분대 이동
                  </p>
                </div>

                <div className="text-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">02</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">광역교통망</h3>
                  <p className="text-gray-600">
                    서울~세종고속도로 직접 연결<br />
                    서울, 세종시 빠른 접근성
                  </p>
                </div>

                <div className="text-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">03</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">자연환경</h3>
                  <p className="text-gray-600">
                    양지면 청정자연환경<br />
                    쾌적한 주거환경
                  </p>
                </div>
              </div>
            </div>

            {/* 교통 인프라 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">교통 인프라</h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                <div className="relative w-full max-w-4xl mx-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%ED%98%84%EC%9E%A5%20%EC%A7%80%EB%8F%84.jpg-ETNrcTujTlU22TIbVs5CdNIAlFzUgS.jpeg"
                    alt="클러스터용인 경남아너스빌 교통망"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain rounded-xl shadow-lg"
                    quality={100}
                  />
                </div>
                
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">고속도로</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 서울~세종고속도로 동용인IC 이용</li>
                      <li>• 영동고속도로 용인IC 연결</li>
                      <li>• 경부고속도로 신갈JC 연결</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">대중교통</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 용인경전철 연장 예정</li>
                      <li>• 시내버스 노선 운행</li>
                      <li>• 수도권 전철 접근성 우수</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 개발 계획 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">개발 계획</h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <Image
                    src="/sk-hynix-banner.png"
                    alt="SK하이닉스 반도체 클러스터"
                    width={800}
                    height={200}
                    className="mx-auto rounded-lg"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">반도체 클러스터 개발</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• SK하이닉스 용인 클러스터 2027년 가동</li>
                      <li>• 삼성전자 평택 캠퍼스 확장</li>
                      <li>• 약 13만명 고용 창출 예상</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">지역 발전 계획</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 교통 인프라 대폭 개선</li>
                      <li>• 상업시설 및 업무시설 확충</li>
                      <li>• 교육 인프라 확대</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">더 자세한 정보가 필요하신가요?</h2>
            <p className="text-xl mb-8 opacity-90">전문 상담원이 친절하게 안내해드립니다.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <a href="tel:1668-5257">
                  <Phone className="w-5 h-5 mr-2" />
                  전화 상담하기
                </a>
              </Button>
              
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                <a href="https://open.kakao.com/o/gWqYXaEg" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.633 1.91 4.925 4.761 6.178-.206.716-.664 2.31-.762 2.664-.123.446.164.442.345.321.142-.095 2.265-1.533 3.189-2.16.485.068.98.102 1.467.102 5.523 0 10-3.477 10-7.605S17.523 3 12 3z"/>
                  </svg>
                  카카오톡 문의
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}