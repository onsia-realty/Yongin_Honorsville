"use client"

import React, { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface CustomerRegistration {
  id: number
  timestamp: string
  customer_name: string
  phone_number: string
  address: string
  subscription_account: string
  subscription_intention: string
  contract_intention: string
  purpose: string
  privacy_consent_1: string
  privacy_consent_2: string
  marketing_consent: string
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<CustomerRegistration[]>([])
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // 간단한 비밀번호 인증 (실제로는 더 안전한 방법 사용 권장)
  const ADMIN_PASSWORD = "admin2024"

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      loadCustomers()
    } else {
      alert("비밀번호가 올바르지 않습니다.")
    }
  }

  const loadCustomers = () => {
    try {
      const savedData = localStorage.getItem('customer_registrations')
      if (savedData) {
        const registrations = JSON.parse(savedData)
        setCustomers(registrations.reverse()) // 최신순으로 정렬
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error)
      alert('데이터를 불러오는 중 오류가 발생했습니다.')
    }
  }

  const exportToCSV = () => {
    if (customers.length === 0) {
      alert('내보낼 데이터가 없습니다.')
      return
    }

    const headers = [
      '등록일시', '고객명', '연락처', '주소', '청약통장', 
      '청약의사', '계약의사', '분양목적', '개인정보동의', '위탁동의', '마케팅동의'
    ]

    const csvContent = [
      headers.join(','),
      ...customers.map(customer => [
        customer.timestamp,
        customer.customer_name,
        customer.phone_number,
        customer.address,
        customer.subscription_account,
        customer.subscription_intention,
        customer.contract_intention,
        customer.purpose,
        customer.privacy_consent_1,
        customer.privacy_consent_2,
        customer.marketing_consent
      ].join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `관심고객_목록_${new Date().toLocaleDateString('ko-KR')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAllData = () => {
    if (confirm('모든 고객 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      localStorage.removeItem('customer_registrations')
      setCustomers([])
      alert('모든 데이터가 삭제되었습니다.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20 pb-20">
          <div className="container mx-auto max-w-md px-4">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="관리자 비밀번호를 입력하세요"
                  />
                </div>
                
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">관심고객 목록</h1>
            <div className="space-x-4">
              <button
                onClick={loadCustomers}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                새로고침
              </button>
              <button
                onClick={exportToCSV}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                CSV 내보내기
              </button>
              <button
                onClick={clearAllData}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                전체 삭제
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <p className="text-sm text-gray-600">
                총 <span className="font-semibold text-blue-600">{customers.length}</span>명의 관심고객이 등록되었습니다.
              </p>
            </div>

            {customers.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 text-lg">등록된 관심고객이 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일시</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객명</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주소</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">청약정보</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">동의현황</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.timestamp}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {customer.customer_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a href={`tel:${customer.phone_number}`} className="text-blue-600 hover:text-blue-900">
                            {customer.phone_number}
                          </a>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {customer.address}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div className="space-y-1">
                            <div>통장: {customer.subscription_account}</div>
                            <div>청약: {customer.subscription_intention}</div>
                            <div>계약: {customer.contract_intention}</div>
                            <div>목적: {customer.purpose}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div className="space-y-1">
                            <div>개인정보: <span className={customer.privacy_consent_1 === 'Y' ? 'text-green-600' : 'text-red-600'}>{customer.privacy_consent_1}</span></div>
                            <div>위탁: <span className={customer.privacy_consent_2 === 'Y' ? 'text-green-600' : 'text-red-600'}>{customer.privacy_consent_2}</span></div>
                            <div>마케팅: <span className={customer.marketing_consent === 'Y' ? 'text-green-600' : 'text-red-600'}>{customer.marketing_consent}</span></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}