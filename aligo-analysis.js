const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('알리고 SMS API 페이지 접속 중...');
    await page.goto('https://smartsms.aligo.in/smsapi.html', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // 페이지 로딩 대기
    await page.waitForTimeout(3000);
    
    console.log('\n=== 페이지 기본 정보 ===');
    const title = await page.title();
    console.log('페이지 제목:', title);
    
    // 전체 페이지 텍스트 내용 추출
    console.log('\n=== 페이지 전체 내용 분석 ===');
    
    // 메인 헤딩들 추출
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
      elements.map(el => ({
        tag: el.tagName.toLowerCase(),
        text: el.textContent.trim()
      })).filter(h => h.text.length > 0)
    );
    
    console.log('\n주요 헤딩들:');
    headings.forEach(h => console.log(`${h.tag.toUpperCase()}: ${h.text}`));
    
    // API 관련 정보 추출
    console.log('\n=== API 기능 및 특징 ===');
    const apiFeatures = await page.evaluate(() => {
      const content = document.body.innerText;
      const features = [];
      
      // API 기능 관련 키워드 찾기
      const apiKeywords = ['API', '기능', '특징', '서비스', '발송'];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 10 && apiKeywords.some(keyword => trimmedLine.includes(keyword))) {
          features.push(trimmedLine);
        }
      });
      
      return features.slice(0, 20); // 상위 20개만
    });
    
    apiFeatures.forEach(feature => console.log('- ' + feature));
    
    // 요금 정보 추출
    console.log('\n=== 요금 정보 ===');
    const pricingInfo = await page.evaluate(() => {
      const content = document.body.innerText;
      const pricing = [];
      
      const priceKeywords = ['요금', '가격', '비용', '원', '건당', '월정액'];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 5 && priceKeywords.some(keyword => trimmedLine.includes(keyword))) {
          pricing.push(trimmedLine);
        }
      });
      
      return pricing.slice(0, 15);
    });
    
    pricingInfo.forEach(price => console.log('- ' + price));
    
    // 샘플 코드 또는 연동 방법 찾기
    console.log('\n=== API 연동 방법 및 샘플 코드 ===');
    const sampleCode = await page.evaluate(() => {
      const codeElements = document.querySelectorAll('code, pre, .code, .sample');
      const codes = [];
      
      codeElements.forEach(el => {
        if (el.textContent.trim().length > 10) {
          codes.push(el.textContent.trim());
        }
      });
      
      return codes;
    });
    
    if (sampleCode.length > 0) {
      sampleCode.forEach((code, index) => {
        console.log(`\n샘플 코드 ${index + 1}:`);
        console.log(code);
      });
    } else {
      console.log('페이지에서 직접적인 샘플 코드를 찾을 수 없습니다.');
    }
    
    // 장점과 특징 추출
    console.log('\n=== 주요 장점과 특징 ===');
    const advantages = await page.evaluate(() => {
      const content = document.body.innerText;
      const advs = [];
      
      const advantageKeywords = ['장점', '특징', '빠른', '간편', '쉬운', '저렴', '안정', '높은'];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 10 && advantageKeywords.some(keyword => trimmedLine.includes(keyword))) {
          advs.push(trimmedLine);
        }
      });
      
      return advs.slice(0, 15);
    });
    
    advantages.forEach(adv => console.log('- ' + adv));
    
    // 발신번호 등록 관련 정보
    console.log('\n=== 발신번호 등록 방법 ===');
    const senderInfo = await page.evaluate(() => {
      const content = document.body.innerText;
      const senders = [];
      
      const senderKeywords = ['발신번호', '등록', '인증', '승인'];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 10 && senderKeywords.some(keyword => trimmedLine.includes(keyword))) {
          senders.push(trimmedLine);
        }
      });
      
      return senders.slice(0, 10);
    });
    
    senderInfo.forEach(info => console.log('- ' + info));
    
    // 테스트 방법 정보
    console.log('\n=== 테스트 방법 ===');
    const testInfo = await page.evaluate(() => {
      const content = document.body.innerText;
      const tests = [];
      
      const testKeywords = ['테스트', '시험', '무료', '체험'];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 10 && testKeywords.some(keyword => trimmedLine.includes(keyword))) {
          tests.push(trimmedLine);
        }
      });
      
      return tests.slice(0, 10);
    });
    
    testInfo.forEach(test => console.log('- ' + test));
    
    // 주요 링크들 추출
    console.log('\n=== 주요 링크들 ===');
    const links = await page.$$eval('a[href]', elements => 
      elements.map(el => ({
        text: el.textContent.trim(),
        href: el.href
      })).filter(link => link.text.length > 0 && link.text.length < 100)
    );
    
    links.slice(0, 10).forEach(link => {
      console.log(`- ${link.text}: ${link.href}`);
    });
    
    // 페이지 전체 텍스트를 파일로 저장 (추가 분석용)
    const fullContent = await page.textContent('body');
    require('fs').writeFileSync('aligo-full-content.txt', fullContent, 'utf8');
    console.log('\n전체 페이지 내용이 aligo-full-content.txt 파일로 저장되었습니다.');
    
    // 스크린샷 촬영
    await page.screenshot({ path: 'aligo-sms-page.png', fullPage: true });
    console.log('페이지 스크린샷이 aligo-sms-page.png로 저장되었습니다.');
    
  } catch (error) {
    console.error('페이지 분석 중 오류 발생:', error.message);
  } finally {
    await browser.close();
  }
})();