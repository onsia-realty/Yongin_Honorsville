"use client"

import React, { useState } from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function FloorPlanPage() {
  const [activeTab, setActiveTab] = useState('123')
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
          .tab-btn {
            padding: 12px 30px;
            border: 2px solid #ddd;
            background-color: white;
            color: #666;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
          }
          .tab-btn:hover {
            border-color: #2563eb;
            color: #2563eb;
          }
          .tab-btn.active {
            border-color: #2563eb;
            background-color: #2563eb;
            color: white;
          }
        `}</style>
        
        <div className="container">
          <div className="row">
            <h6>평면도</h6>
            
            {/* 탭 버튼 */}
            <div className="tab-buttons flex justify-center gap-4 mb-8">
              <button 
                className={`tab-btn ${activeTab === '123' ? 'active' : ''}`}
                onClick={() => setActiveTab('123')}
              >
                123
              </button>
              <button 
                className={`tab-btn ${activeTab === '84a' ? 'active' : ''}`}
                onClick={() => setActiveTab('84a')}
              >
                84A
              </button>
              <button 
                className={`tab-btn ${activeTab === '84b' ? 'active' : ''}`}
                onClick={() => setActiveTab('84b')}
              >
                84B
              </button>
            </div>
            
            {/* 탭 콘텐츠 */}
            <div className="tab-content">
              {activeTab === '123' && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/123.jpg"
                    alt="123 평면도"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-contain mx-auto"
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                </div>
              )}
              
              {activeTab === '84a' && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/84a.jpg"
                    alt="84A 평면도"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-contain mx-auto"
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                </div>
              )}
              
              {activeTab === '84b' && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/84b.jpg"
                    alt="84B 평면도"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-contain mx-auto"
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}