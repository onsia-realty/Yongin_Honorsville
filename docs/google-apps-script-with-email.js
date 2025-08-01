// Google Apps Script 코드 (Google Sheets 스크립트 편집기에 붙여넣기)
// 도구 > 스크립트 편집기

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 1. Google Sheets에 데이터 저장
    sheet.appendRow([
      new Date().toLocaleString('ko-KR'),
      data.name,
      data.phone,
      data.source || '웹사이트'
    ]);
    
    // 2. Gmail로 이메일 전송
    const recipient = 'your-email@gmail.com'; // 받을 이메일 주소
    const subject = `[클러스터용인] 새로운 관심고객 등록 - ${data.name}`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">클러스터용인 경남아너스빌</h2>
          <p style="margin: 5px 0 0 0;">새로운 관심고객 등록 알림</p>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h3 style="color: #333; margin-bottom: 20px;">고객 정보</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">
                고객명
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">
                연락처
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">
                  ${data.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">
                등록시간
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                ${new Date().toLocaleString('ko-KR')}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">
                등록경로
              </td>
              <td style="padding: 10px;">
                ${data.source || '웹사이트'}
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 5px;">
            <p style="margin: 0; color: #1976d2;">
              <strong>💡 알림:</strong> 빠른 시일 내에 고객님께 연락 부탁드립니다.
            </p>
          </div>
        </div>
        
        <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">클러스터용인 경남아너스빌 | 1668-5257</p>
        </div>
      </div>
    `;
    
    // 이메일 발송
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 테스트 함수 (실행하여 권한 승인)
function testEmail() {
  MailApp.sendEmail({
    to: 'your-email@gmail.com',
    subject: '테스트 이메일',
    htmlBody: '<h1>테스트</h1><p>이메일이 정상적으로 발송되었습니다.</p>'
  });
}