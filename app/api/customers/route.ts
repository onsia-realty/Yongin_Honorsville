import { NextRequest, NextResponse } from 'next/server'

// CSV 파일로 저장하는 간단한 방법
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // 유효성 검사
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // CSV 파일에 저장
    const csvLine = `${new Date().toLocaleString('ko-KR')},"${data.name}","${data.phone}","${data.inquiry || ''}"\n`
    const filePath = path.join(process.cwd(), 'data', 'customers.csv')
    
    // 디렉토리 생성
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    
    // 파일에 추가
    await fs.appendFile(filePath, csvLine, 'utf-8')

    // 성공 응답
    return NextResponse.json({ success: true, message: '등록이 완료되었습니다.' })
  } catch (error) {
    console.error('Error saving customer:', error)
    return NextResponse.json(
      { error: '등록 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}