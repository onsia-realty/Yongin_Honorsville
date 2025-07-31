"use client"

import React from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function SalesSchedulePage() {
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
            <h6>분양일정</h6>
            <div className="flex justify-center items-center">
              <Image
                src="/schedule_n2.png"
                alt="분양일정 이미지"
                width={1600}
                height={1200}
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