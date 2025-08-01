// Google Apps Script 코드 (Google Sheets에서 실행)
// 이 코드를 Google Sheets의 스크립트 에디터에 붙여넣기

// ===== 여기에 실제 API 키를 입력하세요 =====
const SMS_APP_KEY = 'YOUR_NHN_TOAST_APP_KEY'; // NHN Toast 콘솔에서 복사
const SMS_SECRET_KEY = 'YOUR_NHN_TOAST_SECRET_KEY'; // NHN Toast 콘솔에서 복사
const SMS_SENDER_NUMBER = '1668-5257'; // 발신번호 (사전 등록 필요)
const ADMIN_PHONE = '010-7781-9297'; // 관리자 수신번호
// ==========================================

// 스프레드시트에 새 행이 추가될 때 자동 실행
function onFormSubmit(e) {
  try {
    const row = e.range.getRow();
    const sheet = e.source.getActiveSheet();
    
    // 새로 추가된 데이터 가져오기
    const name = sheet.getRange(row, 1).getValue(); // A열: 이름
    const phone = sheet.getRange(row, 2).getValue(); // B열: 전화번호
    const timestamp = sheet.getRange(row, 3).getValue(); // C열: 등록시간
    
    // SMS 메시지 구성
    const message = `[클러스터용인 경남아너스빌]
새 관심고객 등록!

성함: ${name}
연락처: ${phone}
등록시간: ${timestamp}

즉시 연락 요망`;
    
    // NHN Toast SMS 발송
    sendSMS(ADMIN_PHONE, message);
    
    // 발송 결과 기록
    sheet.getRange(row, 5).setValue('SMS 발송 완료');
    
  } catch (error) {
    console.error('SMS 발송 실패:', error);
    sheet.getRange(row, 5).setValue('SMS 발송 실패: ' + error.message);
  }
}

// NHN Toast SMS API 호출 함수
function sendSMS(recipientNo, body) {
  const url = 'https://api-sms.cloud.toast.com/sms/v3.0/appKeys/' + SMS_APP_KEY + '/sender/sms';
  
  const payload = {
    body: body,
    sendNo: SMS_SENDER_NUMBER,
    recipientList: [{
      recipientNo: recipientNo,
      countryCode: '82'
    }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'X-Secret-Key': SMS_SECRET_KEY
    },
    payload: JSON.stringify(payload)
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  
  if (result.header.resultCode !== 0) {
    throw new Error('SMS 발송 실패: ' + result.header.resultMessage);
  }
  
  return result;
}

// 트리거 설정 함수 (한 번만 실행)
function setupTrigger() {
  // 기존 트리거 삭제
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // 새 트리거 생성
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
    
  SpreadsheetApp.getActiveSpreadsheet().toast('트리거 설정 완료!', '성공', 3);
}

// 테스트 함수 - SMS 발송 테스트용
function testSMS() {
  const testMessage = `[테스트] 클러스터용인 경남아너스빌
SMS 발송 테스트입니다.
정상 작동 확인!`;
  
  try {
    sendSMS(ADMIN_PHONE, testMessage);
    SpreadsheetApp.getActiveSpreadsheet().toast('테스트 SMS 발송 성공!', '성공', 5);
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast('SMS 발송 실패: ' + error.message, '오류', 10);
  }
}