"use client"

import React from 'react'
import { X } from 'lucide-react'

interface GoogleFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GoogleFormModal({ isOpen, onClose }: GoogleFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">관심고객 등록</h2>
          
          {/* 간단한 관심고객 등록 폼 */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                고객명 *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="고객명을 입력해 주세요"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                휴대폰번호 *
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01012345678"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의내용
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="문의사항을 입력해 주세요"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="privacy" className="rounded" required />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                개인정보 수집·이용에 동의합니다.
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              등록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}