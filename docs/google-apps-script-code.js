function doPost(e) {
  try {
    // 스프레드시트 열기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 요청 데이터 파싱
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      // 파라미터로 받은 경우
      data = e.parameter;
    }
    
    // 로그 확인용
    console.log('Received data:', data);
    
    // 새 행 추가
    sheet.appendRow([
      new Date().toLocaleString('ko-KR'),
      data.name || '',
      data.phone || '',
      data.inquiry || '',
      data.source || '웹사이트'
    ]);
    
    // 이메일 알림 (선택사항 - 이메일 주소 변경 필요)
    /*
    MailApp.sendEmail({
      to: 'your-email@gmail.com',
      subject: '[클러스터용인] 새 관심고객 등록 - ' + data.name,
      htmlBody: `
        <h3>새로운 관심고객이 등록되었습니다.</h3>
        <table border="1" cellpadding="10">
          <tr>
            <td><strong>고객명</strong></td>
            <td>${data.name}</td>
          </tr>
          <tr>
            <td><strong>연락처</strong></td>
            <td>${data.phone}</td>
          </tr>
          <tr>
            <td><strong>문의내용</strong></td>
            <td>${data.inquiry || '없음'}</td>
          </tr>
          <tr>
            <td><strong>등록시간</strong></td>
            <td>${new Date().toLocaleString('ko-KR')}</td>
          </tr>
        </table>
      `
    });
    */
    
    // CORS 헤더 추가
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    console.error('Error:', error);
    
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK',
      message: 'Google Apps Script is running' 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*'
    });
}

// CORS preflight 요청 처리
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}