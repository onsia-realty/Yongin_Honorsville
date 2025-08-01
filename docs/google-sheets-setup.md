# Google Sheets + Google Forms 설정 가이드

## 방법 1: Google Forms 임베드 (가장 간단)

### 1단계: Google Form 생성
1. [Google Forms](https://forms.google.com) 접속
2. "빈 양식" 클릭
3. 양식 제목: "클러스터용인 경남아너스빌 관심고객 등록"
4. 필드 추가:
   - 고객명 (단답형, 필수)
   - 휴대폰번호 (단답형, 필수)
   - 문의사항 (장문형, 선택)

### 2단계: 응답 스프레드시트 연결
1. 응답 탭 클릭
2. 스프레드시트 아이콘 클릭
3. "새 스프레드시트 만들기" 선택

### 3단계: 알림 설정
1. 스프레드시트에서 도구 > 알림 규칙
2. "사용자가 양식을 제출할 때" + "이메일 - 즉시" 설정

### 4단계: 웹사이트에 임베드
1. Google Form에서 보내기 버튼 클릭
2. < > 아이콘 (임베드) 클릭
3. 너비/높이 설정 후 HTML 복사

---

## 방법 2: Google Apps Script 사용 (커스텀 디자인 유지)

### 1단계: Google Sheets 생성
1. [Google Sheets](https://sheets.google.com) 새 스프레드시트
2. 시트 이름: "관심고객_DB"
3. 헤더 행 추가: 등록시간 | 고객명 | 휴대폰번호 | 문의사항 | 등록경로

### 2단계: Apps Script 설정
1. 확장 프로그램 > Apps Script
2. 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    // 스프레드시트 열기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 새 행 추가
    sheet.appendRow([
      new Date().toLocaleString('ko-KR'),
      data.name,
      data.phone,
      data.inquiry || '',
      data.source || '웹사이트'
    ]);
    
    // 이메일 알림 (선택사항)
    MailApp.sendEmail({
      to: '010-7781-9297@gmail.com', // 받을 이메일 주소
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
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK',
      message: 'Google Apps Script is running' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3단계: Web App 배포
1. 배포 > 새 배포
2. 유형: 웹 앱
3. 설정:
   - 설명: 관심고객 등록 API
   - 다음 사용자 권한으로 실행: 나
   - 액세스 권한: 모든 사용자
4. 배포 클릭
5. URL 복사 (https://script.google.com/macros/s/.../exec)

### 4단계: 시트 권한 설정
1. Google Sheets로 돌아가기
2. 공유 버튼 클릭
3. 액세스 권한: "링크가 있는 모든 사용자" - 뷰어

---

## 방법 3: Google Forms API (고급)

더 많은 커스터마이징이 필요한 경우 Google Forms API를 직접 사용할 수 있습니다.