// Google Sheets API를 통한 데이터 저장
// 1. Google Cloud Console에서 프로젝트 생성
// 2. Google Sheets API 활성화
// 3. 서비스 계정 생성 및 키 다운로드
// 4. Google Sheets에 서비스 계정 이메일 공유

export async function saveToGoogleSheets(data: {
  name: string
  phone: string
  inquiry?: string
}) {
  try {
    // Google Apps Script Web App URL
    // Google Sheets에서 도구 > 스크립트 편집기로 Web App 생성
    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toLocaleString('ko-KR'),
        source: '클러스터용인 경남아너스빌 웹사이트'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to save data')
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return { success: false, error }
  }
}

// Google Apps Script 코드 (Google Sheets 스크립트 편집기에 붙여넣기)
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.inquiry || '',
      data.source
    ]);
    
    // 이메일 알림 (선택사항)
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: '새로운 관심고객 등록',
      body: `
        고객명: ${data.name}
        전화번호: ${data.phone}
        문의내용: ${data.inquiry || '없음'}
        등록시간: ${data.timestamp}
      `
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/