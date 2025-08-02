"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/Header"
// import ClusterSection from "@/components/ClusterSection" // 임시 비활성화

export default function HomePage() {
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    inquiry: "",
  })

  // 1초 후 비디오 팝업 자동 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoPopupOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 스크롤 애니메이션 효과
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      // 패럴랙스 배경 효과
      const parallaxElements = document.querySelectorAll(".parallax-bg")
      parallaxElements.forEach((element) => {
        ;(element as HTMLElement).style.transform = `translateY(${rate}px)`
      })

      // 스크롤 reveal 효과
      const revealElements = document.querySelectorAll(".scroll-reveal")
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("revealed")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert("고객명을 입력해 주세요.")
      return
    }

    if (!formData.phone.trim()) {
      alert("휴대폰 번호를 입력해 주세요.")
      return
    }

    if (!/^\d{10,11}$/.test(formData.phone)) {
      alert("휴대폰 번호는 10-11자리 숫자로 입력해주세요.")
      return
    }

    try {
      // Google Apps Script URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxz7twzCnPcTloLXdZ2umJVWyRd5uh88eIHn7W5P39dO5b4NLeD6Vm4COv5JpMTulDO/exec'
      
      // Google Sheets로 데이터 전송
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          inquiry: formData.inquiry || '관심고객 등록',
          source: '클러스터용인 경남아너스빌 웹사이트'
        })
      })

      // no-cors 모드에서는 응답을 읽을 수 없으므로 바로 성공 처리
      alert("관심고객 등록이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.")
      
      // 폼 초기화
      setFormData({ name: "", phone: "", inquiry: "" })
      
    } catch (error) {
      console.error("등록 실패:", error)
      alert("등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
  .parallax-section {
    transform: translateY(0);
    transition: transform 0.1s ease-out;
  }
  
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }
  
  .scroll-reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .parallax-bg {
    transform: translateY(0);
    transition: transform 0.1s ease-out;
  }
`}</style>
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-orange-400 to-red-500 py-3 relative overflow-hidden h-[60px] flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <Image
            src="/sk-hynix-banner.png"
            alt="SK하이닉스 반도체 클러스터 팝 착공 시작, 2027년 가동!"
            width={1200}
            height={80}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Header */}
      <Header />

      {/* Hero Section (클러스터 스타일) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - 이미지 선명하게 표시 */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202025%EB%85%84%207%EC%9B%94%2022%EC%9D%BC%20%EC%98%A4%ED%9B%84%2002_21_39-83CypR9ONd0PFm9hyOCPvPWmvS5UvN.png"
            alt="클러스터용인 경남아너스빌 메인 이미지"
            fill
            className="object-cover"
          />
        </div>
        
        {/* 텍스트 가독성을 위한 약간의 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          {/* 모바일 버전 */}
          <div className="mobile">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              서울~세종고속도로<br/>
              더 가깝게
            </h1>
            <p className="text-xl mb-2">삼성,SK하이닉스</p>
            <p className="text-2xl font-bold mb-8">10분대로 더 빠르게</p>
            
            <div className="bg-white rounded-full px-8 py-6 inline-block shadow-2xl">
              <p className="text-3xl font-black text-blue-600 mb-2">반도체 프리미엄</p>
              <p className="text-2xl font-bold text-gray-800">직접 영향권</p>
            </div>
          </div>
          
          {/* PC 버전 */}
          <div className="pc">
            <h1 className="text-6xl font-bold mb-4">
              서울~세종고속도로 더 가깝게
            </h1>
            <p className="text-3xl mb-8">삼성,SK하이닉스 10분대로 더 빠르게</p>
            
            <div className="bg-white rounded-full px-12 py-8 inline-block shadow-2xl">
              <p className="text-4xl font-black text-blue-600">반도체 프리미엄 직접 영향권</p>
            </div>
          </div>
        </div>

        {/* 스크롤 다운 애니메이션 */}
        <div className="absolute bottom-8 left-1/2 text-white text-sm floating">
          <div>SCROLL DOWN</div>
          <div className="mt-2">▼</div>
        </div>
      </section>


      {/* Main Content Section */}
      <section
        id="business"
        className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden scroll-reveal"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8 md:space-y-12">
            {/* 상단 텍스트 */}
            <div className="bg-blue-50 rounded-lg p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
                <div className="mb-2">서울~세종고속도로 더 가깝게</div>
                <div>삼성,SK하이닉스 10분대로 더 빠르게</div>
              </h2>
            </div>

            {/* 메인 지도 이미지 */}
            <div className="relative transform transition-all duration-1000 hover:scale-105">
              <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%ED%98%84%EC%9E%A5%20%EC%A7%80%EB%8F%84.jpg-ETNrcTujTlU22TIbVs5CdNIAlFzUgS.jpeg"
                  alt="클러스터용인 경남아너스빌 현장 위치도"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-110"
                  quality={100}
                  priority
                />
              </div>
            </div>

            {/* 하단 텍스트 */}
            <div className="bg-blue-600 text-white rounded-full px-16 py-6 inline-block shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <h3 className="text-xl md:text-2xl font-bold">반도체 프리미엄 직접 영향권</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Section (클러스터 스타일) */}
      <section
        id="premium"
        className="py-20 bg-gray-50 scroll-reveal relative"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/luxury-apartment-contact-bg.jpg"
            alt="Luxury Apartment Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">CLUSTER YONGIN</h2>
            <p className="text-xl text-gray-600 drop-shadow-lg">HONORSVILLE</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">01</div>
              <h3 className="text-lg font-bold mb-2">SK&SAMSUNG</h3>
              <p className="text-sm text-gray-600">반도체 클러스터를 빠르게</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">02</div>
              <h3 className="text-lg font-bold mb-2">SPEED TRAFFIC</h3>
              <p className="text-sm text-gray-600">서울 및 세종 빠른 접근</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">03</div>
              <h3 className="text-lg font-bold mb-2">EDUCATION</h3>
              <p className="text-sm text-gray-600">우수한 교육환경</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">04</div>
              <h3 className="text-lg font-bold mb-2">PREMIUM LIFE</h3>
              <p className="text-sm text-gray-600">프리미엄 주거문화</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="layout" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white scroll-reveal">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80">
              <Image
                src="/happy-family-modern-apartment.png"
                alt="가족 이미지"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-blue-600 text-white rounded-lg px-8 py-4 inline-block">
                <h3 className="text-xl font-bold">BRAND STORY - UPGRADE HONORSVILLE</h3>
              </div>

              <div className="space-y-4 text-gray-700">
                <p>온 가족이 함께 특별한 일상을 누릴 수 있는</p>
                <p>차별화된 주거문화를 선보입니다.</p>
                <p>일상이 감동이 되는 감명 깊은 주거공간.</p>
                <p className="font-semibold">경남아너스빌이 당신을 찾아갑니다.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 relative h-96">
            <Image src="/luxury-apartment-living-room.png" alt="실내 이미지" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 overflow-hidden scroll-reveal">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/onsia__luxury_apartment_interior_in_Seoul_open_plan_living_ro_83e16c43-0f5f-4191-bf28-a8db100e2e48_0%20%281%29-yybuYy0MSxMh7x8w1uM7KbhlNVV6Mr.png"
            alt="럭셔리 아파트 인테리어"
            fill
            className="object-cover"
          />
        </div>

        {/* Darker Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="bg-white text-gray-800 rounded-full px-8 py-4 inline-block mb-8 shadow-xl">
              <h2 className="text-2xl font-bold">CONTACT US</h2>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* 견본주택 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 md:p-8 text-center shadow-2xl">
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-UCVmMWyoWE3CIWOAGqxUTPbMGCiPqs.png"
                  alt="견본주택 위치도"
                  width={400}
                  height={250}
                  className="rounded-lg mx-auto mb-4 w-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white drop-shadow-lg">견본주택</h3>
              <p className="mb-2 text-white text-base md:text-lg font-medium">경기도 용인시 처인구</p>
              <p className="mb-6 text-white text-base md:text-lg font-medium">마평동 607-1</p>

              <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-sm md:text-base py-3 md:py-2">
                  <a href="https://naver.me/GZZmcu4H" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />
                    네이버 지도
                  </a>
                </Button>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-sm md:text-base py-3 md:py-2">
                  <a href="https://open.kakao.com/o/sen4dWJh" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    카카오톡 채팅
                  </a>
                </Button>
              </div>
            </div>

            {/* 현장주소 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 md:p-8 text-center shadow-2xl">
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-L8RvFiAPURazNB6ohkjECA1M9eBkxx.png"
                  alt="현장 위치도"
                  width={400}
                  height={250}
                  className="rounded-lg mx-auto mb-4 w-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white drop-shadow-lg">현장주소</h3>
              <p className="mb-2 text-white text-base md:text-lg font-medium">경기도 용인시 처인구</p>
              <p className="mb-6 text-white text-base md:text-lg font-medium">양지면 양지리 697번지 일원</p>

              <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-sm md:text-base py-3 md:py-2">
                  <a href="https://naver.me/GCvZlIA2" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />
                    네이버 지도
                  </a>
                </Button>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-sm md:text-base py-3 md:py-2">
                  <a href="https://open.kakao.com/o/sen4dWJh" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    카카오톡 채팅
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">더 자세한 정보가 필요하신가요?</h2>
          <p className="text-xl mb-8 opacity-90">전문 상담원이 친절하게 안내해드립니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1668-5257" className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all">
              <Phone className="w-5 h-5 mr-2" />
              전화 상담하기
            </a>
            <a href="/directions" className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold transition-all">
              <MapPin className="w-5 h-5 mr-2" />
              오시는길 안내
            </a>
            <a href="https://open.kakao.com/o/sen4dWJh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold transition-all">
              <MessageCircle className="w-5 h-5 mr-2" />
              카카오톡 문의
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 footer-section">
        <div className="max-w-7xl mx-auto px-4">

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
            <div className="space-y-2 text-sm text-gray-400">
              <p>(주)온시아 | 사업자등록번호 : 214-88-01749</p>
              <p>
                <span className="text-blue-400">현장</span> 경기도 용인시 처인구 양지면 양지리 697번지 일원
              </p>
              <p>COPYRIGHT © 2025.클러스터용인 경남아너스빌. ALL RIGHTS RESERVED.</p>
              <div className="mt-4 text-xs">
                <p>※ 본 사이트에 사용된 CG는 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다.</p>
                <p>
                  ※ 상기 위치도, 교통도, 사진 등은 소비자의 이해를 돕기 위한 것이므로 실제와 차이가 있을 수 있습니다.
                </p>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      {/* 관심고객등록 버튼 */}
      {/* 유튜브 버튼들 - 모바일은 상단 고정, PC는 우측 고정 */}
      {/* 모바일 버전 - 상단 3개 고정 */}
      <div className="fixed top-[64px] left-0 right-0 flex gap-0 z-40 md:hidden">
        {/* 영상1 */}
        <a
          href="https://youtu.be/YWB5Yy6LOmg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-1/3 aspect-video bg-white overflow-hidden"
          title="홍보영상 1"
        >
          <Image
            src="/동영상 썸네일1.png"
            alt="영상1"
            width={120}
            height={68}
            className="w-full h-full object-cover"
          />
        </a>
        
        {/* 영상2 */}
        <a
          href="https://youtu.be/7gQ347EIX3I"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-1/3 aspect-video bg-white overflow-hidden"
          title="홍보영상 2"
        >
          <Image
            src="/동영상 썸네일2.png"
            alt="영상2"
            width={120}
            height={68}
            className="w-full h-full object-cover"
          />
        </a>
        
        {/* 영상3 */}
        <a
          href="https://youtu.be/vOFsxZvtfOM"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-1/3 aspect-video bg-white overflow-hidden"
          title="홍보영상 3"
        >
          <Image
            src="/동영상 썸네일3.png"
            alt="영상3"
            width={120}
            height={68}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
      
      {/* PC 버전 - 우측 고정 (3개로 변경, 크기 증가) */}
      <div className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-8 flex-col space-y-4 z-40">
        {/* 영상1 */}
        <a
          href="https://youtu.be/YWB5Yy6LOmg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-36 h-24 bg-white rounded-lg shadow-2xl hover:scale-110 transition-transform overflow-hidden border-2 border-gray-200"
          title="홍보영상 1"
        >
          <Image
            src="/동영상 썸네일1.png"
            alt="영상1"
            width={144}
            height={96}
            className="w-full h-full object-cover"
          />
        </a>
        
        {/* 영상2 */}
        <a
          href="https://youtu.be/7gQ347EIX3I"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-36 h-24 bg-white rounded-lg shadow-2xl hover:scale-110 transition-transform overflow-hidden border-2 border-gray-200"
          title="홍보영상 2"
        >
          <Image
            src="/동영상 썸네일2.png"
            alt="영상2"
            width={144}
            height={96}
            className="w-full h-full object-cover"
          />
        </a>
        
        {/* 영상3 */}
        <a
          href="https://youtu.be/vOFsxZvtfOM"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-36 h-24 bg-white rounded-lg shadow-2xl hover:scale-110 transition-transform overflow-hidden border-2 border-gray-200"
          title="홍보영상 3"
        >
          <Image
            src="/동영상 썸네일3.png"
            alt="영상3"
            width={144}
            height={96}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
      {/* 관심고객등록 버튼 - 영상3 밑에 배치 */}
      

      {/* 탑 버튼 */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors z-40 text-sm md:text-base"
      >
        ↑
      </button>

      {/* 모바일 전화 버튼 */}
      <a
        href="tel:1668-5257"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 md:hidden bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-pulse"
        title="1668-5257로 전화걸기"
      >
        <Phone className="w-8 h-8" />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
          1668-5257
        </div>
      </a>

      {/* 하단 관심고객등록 폼 - PC에서만 표시 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[800px] px-4 hidden md:block">
        <div className="bg-red-900/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-2xl border border-white/20">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-row items-center gap-x-6 justify-center"
          >
            {/* 고객명과 휴대폰번호를 가로로 배치 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Phone className="text-white h-5 w-5 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="고객명"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white w-32 text-sm px-3 py-2 rounded"
                  required
                />
              </div>
              <Input
                type="tel"
                placeholder="휴대폰번호"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^\d]/g, "").slice(0, 11) })}
                className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white w-40 text-sm px-3 py-2 rounded"
                required
              />
            </div>
            <div className="text-white text-sm text-center">
              <p className="mb-1">개인정보 수집·이용 동의</p>
              <p className="text-xs opacity-80">(버튼 클릭 시 자동 동의됩니다)</p>
            </div>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full text-sm font-bold transition-all"
            >
              보내기
            </Button>
          </form>
        </div>
      </div>

      {/* 비디오 팝업 */}
      {isVideoPopupOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoPopupOpen(false)}
              className="absolute -top-8 md:-top-12 right-0 text-white text-2xl md:text-3xl hover:text-gray-300"
            >
              ×
            </button>
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YWB5Yy6LOmg"
                title="클러스터용인 경남아너스빌 홍보영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
