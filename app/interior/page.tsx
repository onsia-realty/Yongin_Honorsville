"use client"

import React, { useState } from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function InteriorPage() {
  const [activeTab, setActiveTab] = useState('84a')
  const [activeSubTab, setActiveSubTab] = useState('living')

  const tabs = [
    { id: '84a', label: '84A' },
    { id: '123', label: '123' },
  ]

  const subTabs = [
    { id: 'living', label: 'LIVING ROOM' },
    { id: 'dining', label: 'DINING ROOM' },
    { id: 'bed', label: 'BED ROOM' },
    { id: 'bath', label: 'BATH ROOM' },
  ]

  const getImagePath = () => {
    const typeMap = {
      'living': 'livingroom',
      'dining': 'diningroom',
      'bed': 'bedroom',
      'bath': 'bathroom'
    }
    return `/${activeTab}_${typeMap[activeSubTab]}.jpg`
  }

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
            padding-bottom: 80px;
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
          .tabs {
            display: flex;
            margin-bottom: 20px;
            justify-content: center;
            gap: 16px;
            font-size: 22px;
          }
          .tabs button {
            background: #D1D1D1;
            padding: 9px 25px;
            cursor: pointer;
            font-weight: bold;
            min-width: 392px;
            text-align: center;
            color: #fff;
            transition: all 0.3s ease;
            border-bottom: none;
            box-shadow: none;
            border: none;
          }
          .tabs button.active {
            background: #892530;
            color: white;
          }
          .subtabs {
            display: flex;
            margin-bottom: 85px;
            justify-content: center;
            font-size: 22px;
          }
          .subtabs button {
            background: #fafafa;
            border: 1px solid #231F20;
            padding: 9px 25px;
            cursor: pointer;
            min-width: 200px;
            border-left: none;
            border-right: none;
            text-align: center;
            color: #231F20;
            transition: all 0.3s ease;
            box-shadow: none;
            font-weight: bold;
          }
          .subtabs button:first-child {
            border-left: 1px solid #231F20;
          }
          .subtabs button:last-child {
            border-right: 1px solid #231F20;
          }
          .subtabs button.active {
            background: #231F20;
            color: white;
          }
        `}</style>
        
        <div className="container">
          <div className="row">
            <h6>인테리어</h6>
            
            {/* Main Tabs */}
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? 'active' : ''}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setActiveSubTab('living')
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub Tabs */}
            <div className="subtabs">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={activeSubTab === tab.id ? 'active' : ''}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Image Display */}
            <div className="flex justify-center items-center">
              <Image
                src={getImagePath()}
                alt={`${activeTab} ${activeSubTab}`}
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