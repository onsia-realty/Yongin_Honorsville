"use client"

import React from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LocationPage() {
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
            <h6>입지환경</h6>
            
            {/* 첫 번째 이미지 */}
            <Image
              src="/position01_n3.jpg"
              alt="입지환경 이미지 1"
              width={1600}
              height={1200}
              className="w-full h-auto object-contain mx-auto"
              style={{ display: 'block', margin: '0 auto' }}
            />
            
            {/* 유튜브 비디오 */}
            <div className="relative w-full my-8" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full" 
                id="youtube_video" 
                src="https://www.youtube.com/embed/YWB5Yy6LOmg?enablejsapi=1&version=3&playerapiid=ytplayer?rel=0&vq=hd720&autoplay=1&mute=1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            
            {/* 두 번째 이미지 */}
            <Image
              src="/position02_n1.jpg"
              alt="입지환경 이미지 2"
              width={1600}
              height={1200}
              className="w-full h-auto object-contain mx-auto"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}