'use client'

import { useEffect } from 'react'

/**
 * 블로그 본문 내 중복 CTA 섹션 제거
 * "더 자세한 정보가 필요하신가요?" 섹션을 자동으로 숨김
 */
export default function RemoveInlineCTA() {
  useEffect(() => {
    // DOM이 로드된 후 실행
    const removeCTASections = () => {
      // 1. "더 자세한 정보가 필요하신가요?" 텍스트가 있는 h2 찾기
      const headings = document.querySelectorAll('h2, h3, h4')
      headings.forEach(heading => {
        if (heading.textContent?.includes('더 자세한 정보가 필요하신가요')) {
          // 부모 div들을 찾아서 숨김
          let parent = heading.parentElement
          let depth = 0
          while (parent && depth < 5) {
            // bg-gradient-to-r 클래스가 있는 부모를 찾으면 숨김
            if (parent.className?.includes('bg-gradient-to-r') ||
                parent.className?.includes('py-16')) {
              parent.style.display = 'none'
              console.log('✅ CTA 섹션 제거됨:', parent)
              break
            }
            parent = parent.parentElement
            depth++
          }
        }
      })

      // 2. bg-gradient-to-r from-blue-600 to-blue-700 클래스 조합 찾기
      const gradients = document.querySelectorAll('.bg-gradient-to-r.from-blue-600.to-blue-700')
      gradients.forEach(element => {
        // "더 자세한 정보" 또는 버튼 3개를 포함하는지 확인
        const text = element.textContent || ''
        if (text.includes('더 자세한 정보') ||
            text.includes('전화 상담하기') && text.includes('오시는길') && text.includes('카카오톡')) {
          element.style.display = 'none'
          console.log('✅ 그라디언트 CTA 제거됨:', element)
        }
      })

      // 3. 전화/오시는길/카카오톡 버튼 3개 조합 찾기
      const links = document.querySelectorAll('a[href*="tel:1668-5257"]')
      links.forEach(link => {
        let parent = link.parentElement
        let depth = 0
        while (parent && depth < 10) {
          const text = parent.textContent || ''
          // 3개 버튼이 모두 있는 컨테이너 찾기
          if (text.includes('전화 상담하기') &&
              text.includes('오시는길') &&
              text.includes('카카오톡 문의')) {
            // 이미 페이지 레벨 CTA가 아닌 경우에만 제거 (본문 내 CTA만)
            if (parent.className?.includes('bg-gradient-to-r') ||
                parent.className?.includes('py-16')) {
              parent.style.display = 'none'
              console.log('✅ 버튼 그룹 CTA 제거됨:', parent)
              break
            }
          }
          parent = parent.parentElement
          depth++
        }
      })

      // 4. .prose 안의 모든 bg-gradient-to-r 제거
      const proseElement = document.querySelector('.prose')
      if (proseElement) {
        const proseGradients = proseElement.querySelectorAll('.bg-gradient-to-r')
        proseGradients.forEach(element => {
          element.style.display = 'none'
          console.log('✅ .prose 내 그라디언트 제거됨:', element)
        })
      }
    }

    // 즉시 실행
    removeCTASections()

    // DOM 변경 감지 (동적 콘텐츠 대응)
    const observer = new MutationObserver(removeCTASections)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
