"use client"

import React from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        <div className="container py-48 text-center">
          <div className="row max-w-6xl mx-auto px-5">
            <h1 className="text-4xl font-normal mb-36 relative after:content-[''] after:inline-block after:absolute after:bottom-[-80px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0.5 after:h-12 after:bg-gray-500">
              시스템
            </h1>
            
            <div className="w-full flex justify-center">
              <Image
                src="/시스템.jpg"
                alt="시스템 이미지"
                width={1200}
                height={800}
                className="w-full h-auto object-contain mx-auto"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>

            {/* 하단 주석 (필요시 사용) */}
            {/* 
            <div className="sub_f mt-10 text-sm text-gray-500 text-left font-normal leading-tight">
              <dl className="mb-1 flex">
                <dt className="pr-1">※</dt>
                <dd>본 홈페이지에 사용된 CG, 이미지 등은 소비자의 이해를 돕기 위한 것으로 실제와는 다를 수 있습니다.</dd>
              </dl>
              <dl className="mb-1 flex">
                <dt className="pr-1">※</dt>
                <dd>본 홈페이지에 기재된 내용은 사업 및 인허가 상의 문제로 다소 변경될 수 있습니다.</dd>
              </dl>
              <dl className="mb-1 flex">
                <dt className="pr-1">※</dt>
                <dd>본 홈페이지는 제작과정상 오류가 있을 수 있으니 자세한 사항은 문의해 주시기 바랍니다.</dd>
              </dl>
              <dl className="mb-1 flex">
                <dt className="pr-1">※</dt>
                <dd>본 홈페이지는 민∙형사상 소송의 자료로 사용할 수 없습니다.</dd>
              </dl>
            </div>
            */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}