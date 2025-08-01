// Google Apps Script 코드 (Google Sheets 스크립트 편집기에 붙여넣기)
// 도구 > 스크립트 편집기

function doPost(e) {
  try {
    // CORS 헤더 설정
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // 스프레드시트 가져오기
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // POST 데이터 파싱
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      // 파라미터로 전달된 경우
      data = {
        name: e.parameter.name || '',
        phone: e.parameter.phone || '',
        timestamp: e.parameter.timestamp || new Date().toLocaleString('ko-KR'),
        source: e.parameter.source || '웹사이트'
      };
    }
    
    // 데이터 유효성 검사
    if (!data.name || !data.phone) {
      return output.setContent(JSON.stringify({
        success: false,
        error: '이름과 전화번호는 필수입니다.'
      }));
    }
    
    // 1. Google Sheets에 데이터 저장
    const timestamp = new Date().toLocaleString('ko-KR');
    sheet.appendRow([
      timestamp,
      data.name,
      data.phone,
      data.source || '웹사이트'
    ]);
    
    // 2. Gmail로 이메일 전송 (이메일 주소 변경 필요)
    const recipient = 'your-email@gmail.com'; // 받을 이메일 주소를 여기에 입력하세요
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
                ${timestamp}
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
    
    // 이메일 발송 (이메일 기능을 사용하려면 아래 주석을 해제하세요)
    /*
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
    */
    
    // 성공 응답
    return output.setContent(JSON.stringify({
      success: true,
      message: '등록이 완료되었습니다.',
      data: {
        name: data.name,
        phone: data.phone,
        timestamp: timestamp
      }
    }));
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Google Apps Script is working!'
  })).setMimeType(ContentService.MimeType.JSON);
}

// 테스트 함수 (실행하여 권한 승인)
function testEmail() {
  MailApp.sendEmail({
    to: 'your-email@gmail.com',
    subject: '테스트 이메일',
    htmlBody: '<h1>테스트</h1><p>이메일이 정상적으로 발송되었습니다.</p>'
  });
}

// 테스트 데이터 추가 함수
function testAddData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    new Date().toLocaleString('ko-KR'),
    '테스트 고객',
    '010-1234-5678',
    '테스트'
  ]);
}