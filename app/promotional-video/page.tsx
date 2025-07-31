"use client"

import React from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PromotionalVideoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        <style jsx>{`
          .container {
            padding: 200px 0 180px;
            text-align: center;
            padding-bottom: 0;
          }
          .container .row {
            max-width: 1242px;
            margin: auto;
            padding: 0;
            text-align: center;
            max-width: unset;
          }
          .container .row > h6 {
            font-size: 40px;
            margin-bottom: 150px;
            position: relative;
            font-family: 'NotoSansKR-Regular', sans-serif;
          }
          .container .row > h6::after {
            content: '';
            display: inline-block;
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 46px;
            background-color: #848484;
          }
        `}</style>
        
        <div className="container">
          <div className="row">
            <h6>홍보영상</h6>
            
            {/* 메인 홍보 영상 */}
            <div className="relative w-full my-8" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full" 
                id="promotional_video" 
                src="https://www.youtube.com/embed/YWB5Yy6LOmg?enablejsapi=1&version=3&playerapiid=ytplayer?rel=0&vq=hd720" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            
            {/* 홍보영상 썸네일 시리즈 */}
            <div className="mt-12">
              <h4 className="text-2xl font-bold mb-8 text-gray-800">홍보영상 시리즈</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* 1편 - 임장유랑단 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src="/임장유랑단.png"
                      alt="임장유랑단 1편"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-20 rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-lg mb-2">임장유랑단</h5>
                    <p className="text-gray-600 text-sm">클러스터용인 경남아너스빌의 현장을 생생하게 전해드리는 임장 영상 1편</p>
                  </div>
                </div>

                {/* 2편 - 임장유랑단2 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src="/임장유랑단2.png"
                      alt="임장유랑단 2편"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-20 rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-lg mb-2">임장유랑단 2</h5>
                    <p className="text-gray-600 text-sm">더욱 자세하고 깊이 있는 현장 분석과 투자 가치를 소개하는 2편</p>
                  </div>
                </div>

                {/* 3편 - 용인반도체 홍보영상 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src="/용인반도체홍보영상.png"
                      alt="용인반도체 홍보영상"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-20 rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-lg mb-2">용인반도체 홍보영상</h5>
                    <p className="text-gray-600 text-sm">용인 반도체 클러스터의 미래 가치와 발전 계획을 담은 공식 홍보영상</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SK하이닉스 배너 */}
            <div className="flex justify-center items-center mt-12">
              <Image
                src="/sk-hynix-banner.png"
                alt="SK하이닉스 용인 클러스터"
                width={1600}
                height={900}
                className="w-full h-auto object-contain mx-auto"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}