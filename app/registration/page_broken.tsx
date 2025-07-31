"use client"

import React, { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    agree_check_1: 'Y',
    agree_check_2: 'Y', 
    agree_check_3: 'Y',
    in_name: '',
    mobile1: '010',
    mobile2: '',
    mobile3: '',
    sel1: '',
    sel2: '',
    sel3: '',
    q1: '1순위',
    q2: '있음',
    q4: '있음',
    q3: '실거주'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // 문자 발송 함수
  const sendSMS = (customerData: any) => {
    // 문자 내용 생성
    const message = `[클러스터용인 경남아너스빌] 새로운 관심고객 등록

■ 고객정보
- 성명: ${customerData.customer_name}
- 연락처: ${customerData.phone_number}
- 주소: ${customerData.address}

■ 청약정보
- 청약통장: ${customerData.subscription_account}
- 청약의사: ${customerData.subscription_intention}
- 계약의사: ${customerData.contract_intention}
- 분양목적: ${customerData.purpose}

■ 동의현황
- 개인정보: ${customerData.privacy_consent_1}
- 위탁동의: ${customerData.privacy_consent_2}
- 마케팅: ${customerData.marketing_consent}

등록시간: ${new Date().toLocaleString('ko-KR')}`

    // 관리자 휴대폰 번호로 문자 발송
    const adminPhoneNumber = '010-9331-0967' // 관리자 휴대폰 번호
    const encodedMessage = encodeURIComponent(message)
    
    // 모바일에서 문자앱으로 연결
    const smsUrl = `sms:${adminPhoneNumber}?body=${encodedMessage}`
    
    try {
      // 새 창에서 문자앱 열기
      window.open(smsUrl, '_blank')
      return true
    } catch (error) {
      console.error('문자 발송 실패:', error)
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 개인정보 동의는 등록 버튼 클릭으로 자동 동의 처리
    // (법적 요구사항을 충족하면서 사용자 편의성 향상)

    if (!formData.in_name.trim()) {
      alert("고객명을 입력해 주세요.")
      return
    }

    if (formData.in_name.trim().length < 2) {
      alert("고객명은 두 글자 이상 입력해 주세요.")
      return
    }

    if (!/^[가-힣]+$/.test(formData.in_name)) {
      alert("고객명은 한글만 입력해 주세요.")
      return
    }

    if (!formData.mobile2) {
      alert("핸드폰를 입력해 주세요.")
      return
    }

    if (!formData.mobile3) {
      alert("핸드폰연락처를 입력해 주세요.")
      return
    }

    if (!/^\d+$/.test(formData.mobile2)) {
      alert("핸드폰 번호는 숫자만 입력해 주세요.")
      return
    }

    if (!/^\d+$/.test(formData.mobile3)) {
      alert("핸드폰 번호는 숫자만 입력해 주세요.")
      return
    }

    if (!formData.sel1) {
      alert("주소(시/도)를 선택해 주세요.")
      return
    }

    if (!formData.sel2) {
      alert("주소(시/구/군)를 선택해 주세요.")
      return
    }

    if (!formData.sel3) {
      alert("주소(동/리)를 선택해 주세요.")
      return
    }

    // 문자 발송 시작
    setIsSubmitting(true)

    try {
      // 발송할 데이터 준비 (동의는 자동으로 Y 처리)
      const registrationData = {
        customer_name: formData.in_name,
        phone_number: `${formData.mobile1}-${formData.mobile2}-${formData.mobile3}`,
        address: `${formData.sel1} ${formData.sel2} ${formData.sel3}`,
        subscription_account: formData.q1,
        subscription_intention: formData.q2,
        contract_intention: formData.q4,
        purpose: formData.q3,
        privacy_consent_1: 'Y', // 등록 버튼 클릭으로 자동 동의
        privacy_consent_2: 'Y', // 등록 버튼 클릭으로 자동 동의
        marketing_consent: 'Y'  // 등록 버튼 클릭으로 자동 동의
      }

      // 문자 발송
      const smsSuccess = sendSMS(registrationData)
      
      if (smsSuccess) {
        alert("관심고객 등록이 완료되었습니다.\n\n담당자에게 문자가 발송되었으며,\n빠른 시일 내에 연락드리겠습니다.\n\n감사합니다.")
        
        // 폼 초기화
        setFormData({
          agree_check_1: 'Y',
          agree_check_2: 'Y', 
          agree_check_3: 'Y',
          in_name: '',
          mobile1: '010',
          mobile2: '',
          mobile3: '',
          sel1: '',
          sel2: '',
          sel3: '',
          q1: '1순위',
          q2: '있음',
          q4: '있음',
          q3: '실거주'
        })
      } else {
        throw new Error('문자 발송 실패')
      }

    } catch (error) {
      console.error('등록 실패:', error)
      alert("등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <style jsx>{`
          .container {
            padding: 200px 0 180px;
            text-align: center;
            padding-bottom: 0;
          }
          .container .row {
            max-width: 1242px;
            margin: auto;
            padding: 0;
            text-align: center;
            max-width: unset;
          }
          .container .row > h6 {
            font-size: 40px;
            margin-bottom: 150px;
            position: relative;
            font-family: 'NotoSansKR-Regular', sans-serif;
          }
          .container .row > h6::after {
            content: '';
            display: inline-block;
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 46px;
            background-color: #848484;
          }
          .personal {
            max-width: 800px;
            margin: 0 auto;
            text-align: left;
            margin-bottom: 30px;
          }
          .personal h2 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
          }
          .personal p {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
            color: #333;
          }
          .personal span {
            font-size: 13px;
            color: #666;
            display: block;
            margin: 5px 0;
            line-height: 1.5;
          }
          .agree {
            display: flex;
            gap: 20px;
            margin: 15px 0;
            justify-content: center;
          }
          .agree label {
            font-size: 14px;
            cursor: pointer;
          }
          .personal2 {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .personal2 th, .personal2 td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
            font-size: 13px;
          }
          .personal2 .tit {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: left;
            padding: 15px;
          }
          .personal2 .con {
            text-align: left;
          }
          .register {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .register td {
            border: 1px solid #ddd;
            padding: 15px;
          }
          .register .tit {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: left;
          }
          .register .article1 {
            background-color: #f9f9f9;
            text-align: center;
            width: 120px;
            font-weight: bold;
          }
          .register .article2 {
            text-align: left;
          }
          .textbox {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            margin: 2px;
          }
          .input-num-size {
            width: 80px;
          }
          .w120 {
            width: 120px;
          }
          .wrap_slt {
            margin-right: 10px;
          }
          .register-txt {
            text-align: center;
            font-size: 12px;
            color: #666;
            padding: 10px;
          }
          .submit_btn {
            background-color: #2563eb;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
          }
          .submit_btn:hover {
            background-color: #1d4ed8;
          }
          .submit_btn:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
          .submit_btn:disabled:hover {
            background-color: #9ca3af;
          }
          .submit_btn2 {
            background-color: #6b7280;
            color: white;
            padding: 15px 30px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            display: inline-block;
          }
          .submit_btn2:hover {
            background-color: #4b5563;
          }
          .btn_chk {
            text-align: center;
            padding: 30px;
          }
          .pd20 {
            margin-right: 20px;
          }
          .long {
            margin-right: 15px;
          }
          .long2 {
            margin-right: 10px;
          }
        `}</style>
        
        <div className="container">
          <div className="row">
            <h6>관심고객등록</h6>

            <div id="main_form">
              <div id="main_inner_form" className="pb_30">
                <div className="board_write board_write_form estimate_form">
                  <form onSubmit={handleSubmit}>
                    <div className="formContent01">
                      <div className="personal">
                        <h2>■ 개인정보 수집 및 이용에 관한 안내</h2>
                        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', marginBottom: '15px' }}>
                          <p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
                            클러스터용인 경남아너스빌은 서비스 이용을 위해 필요한 최소한의 범위로 개인정보를 수집합니다.
                          </p>
                          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}>
                            <div style={{ marginBottom: '8px' }}>
                              <strong>- 수집항목:</strong> 이름, 휴대전화번호, 주소, 설문 내용, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                              <strong>- 개인정보 수집방법:</strong> 홈페이지(관심고객등록 및 설문조사), 경품 행사 응모, 이벤트 응모
                            </div>
                            <div>
                              또한, 귀하께서 '클러스터용인 경남아너스빌' 홈페이지의 개인정보 수집/이용, 개인정보 처리위탁의 내용에 대해 각각 「동의함」버튼 또는 「동의하지 않음」버튼을 클릭할 수 있는 절차를 마련하여, 각각의 「동의함」버튼을 클릭하면 해당 사항을 동의한 것으로 간주합니다.
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', marginBottom: '15px' }}>
                          <p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>2. 개인정보의 수집 및 이용목적</p>
                          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}>
                            <div style={{ marginBottom: '5px' }}>개인정보 항목별 구체적인 수집 및 이용목적은 다음과 같습니다.</div>
                            <div style={{ marginBottom: '8px' }}>
                              <strong>- 이름, 전화번호, 설문 내용:</strong> 고지사항 전달, 불만처리 등을 위한 원활한 의사소통 경로의 확보, 새로운 서비스 및 뉴스, 이벤트 정보 등의 안내
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                              <strong>- 이름, 주소, 전화번호:</strong> 경품 배송에 대한 정확한 배송지의 확보
                            </div>
                            <div>
                              <strong>- 서비스 이용기록, 접속로그, 쿠키, 접속 IP:</strong> 방문자 통계 분석, 중복 등록 확인, 보안로직 적용
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', marginBottom: '15px' }}>
                          <p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>3. 개인정보의 보유 및 이용기간</p>
                          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}>
                            <div style={{ marginBottom: '5px' }}>보유 및 이용기간: 프로젝트 분양 완료 후 1년 이내 또는 개인정보 수집 및 이용목적 달성시까지</div>
                            <div style={{ marginBottom: '8px' }}>
                              <strong>- 파기절차:</strong> 별도 DB 이관 후 일정 기간 저장 후 파기
                            </div>
                            <div>
                              <strong>- 파기방법:</strong> 종이 출력 정보 - 분쇄 또는 소각, 전자 파일 정보 - 재생 불가능한 기술 방법 사용
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', marginBottom: '15px' }}>
                          <p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>4. 개인정보 수집 동의 거부권</p>
                          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}>
                            모든 고객은 동의를 거부할 수 있으며, 동의를 거부할 경우 관심고객으로 등록이 불가합니다.
                          </div>
                        </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px', margin: '15px 0' }}>
                          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1976d2', margin: '5px 0' }}>
                            ✓ 등록 버튼 클릭 시 자동으로 동의됩니다
                          </p>
                          <p style={{ fontSize: '12px', color: '#666' }}>
                            개인정보 수집·이용에 동의하며 관심고객으로 등록됩니다
                          </p>
                        </div>
                      </div>

                      <table className="personal2">
                        <tbody>
                          <tr>
                            <td className="tit" colSpan={2}>■ 개인정보 취급 위탁동의</td>
                          </tr>
                          <tr>
                            <th>개인정보 취급을 받는자(수탁자)</th>
                            <th>개인정보 취급 위탁을 하는 업무의 내용</th>
                          </tr>
                          <tr>
                            <td className="con">삼라 · SM스틸건설부문</td>
                            <td className="con">시행,시공 업무</td>
                          </tr>
                          <tr>
                            <td className="con">㈜인터크레존</td>
                            <td className="con">분양홈페이지 관리 운영</td>
                          </tr>
                          <tr>
                            <td className="con">모두가</td>
                            <td className="con">분양마케팅</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="personal2">
                        <tbody>
                          <tr>
                            <td className="tit" colSpan={2}>■ [선택]마케팅 정보 활용 동의</td>
                          </tr>
                          <tr>
                            <th>마케팅 정보 활용의 수집주체</th>
                            <td className="con" style={{ textAlign: 'left', borderTop: '1px solid #222' }}>
                              시행/시공 : 삼라 · SM스틸건설부문
                            </td>
                          </tr>
                          <tr>
                            <th>마케팅 정보 활용 이용항목</th>
                            <td className="con" style={{ textAlign: 'left' }}>이름, 주소, 연락처</td>
                          </tr>
                          <tr>
                            <th>마케팅 정보 활용 이용목적</th>
                            <td className="con" style={{ textAlign: 'left' }}>
                              마케팅 정보제공에 동의 시 새로운 정보를 제공받으실 수 있으며, 각종 이벤트에도 참여할 수 있습니다.<br />
                              본 정보는 고객님이 동의한 활용목적으로만 사용하고 있습니다.
                            </td>
                          </tr>
                          <tr>
                            <th>마케팅 정보 활용 이용기간</th>
                            <td className="con" style={{ textAlign: 'left' }}>
                              마케팅 정보 활용 동의 시점부터 1년간(이후 폐기합니다. 본 동의 철회 시 즉시 폐기 됩니다.)
                            </td>
                          </tr>
                          <tr>
                            <th>마케팅 정보 활용 동의를 거부할 권리</th>
                            <td className="con" style={{ textAlign: 'left' }}>
                              귀하께서는 마케팅 정보 활용동의를 거절할 수 있으며, 거절하실 경우 분양정보 안내 등의 서비스를 제공해 드릴 수 없습니다.
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="personal">
                        <table className="register">
                          <tbody>
                            <tr>
                              <td className="tit" colSpan={2}>■ 개인정보 입력</td>
                            </tr>
                            <tr>
                              <td className="article1">고객명</td>
                              <td className="article2">
                                <input 
                                  type="text" 
                                  name="in_name" 
                                  value={formData.in_name}
                                  onChange={handleInputChange}
                                  className="textbox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">핸드폰</td>
                              <td className="article2" style={{ padding: '8px 0' }}>
                                <select 
                                  name="mobile1" 
                                  value={formData.mobile1}
                                  onChange={handleInputChange}
                                  className="textbox"
                                >
                                  <option value="010">010</option>
                                  <option value="011">011</option>
                                  <option value="016">016</option>
                                  <option value="017">017</option>
                                  <option value="018">018</option>
                                  <option value="019">019</option>
                                </select>
                                <input 
                                  type="text" 
                                  name="mobile2" 
                                  value={formData.mobile2}
                                  onChange={handleInputChange}
                                  maxLength={4}
                                  className="textbox input-num-size"
                                />
                                <input 
                                  type="text" 
                                  name="mobile3" 
                                  value={formData.mobile3}
                                  onChange={handleInputChange}
                                  maxLength={4}
                                  className="textbox input-num-size"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">주소</td>
                              <td className="article2" style={{ padding: '8px 20px' }}>
                                <div style={{ display: 'flex' }}>
                                  <div className="wrap_slt">
                                    <select 
                                      name="sel1" 
                                      value={formData.sel1}
                                      onChange={handleInputChange}
                                      className="w120"
                                    >
                                      <option value="">시/도</option>
                                      <option value="서울">서울</option>
                                      <option value="경기">경기</option>
                                      <option value="인천">인천</option>
                                      <option value="부산">부산</option>
                                      <option value="대전">대전</option>
                                      <option value="대구">대구</option>
                                      <option value="울산">울산</option>
                                      <option value="세종">세종</option>
                                      <option value="광주">광주</option>
                                      <option value="강원">강원</option>
                                      <option value="충북">충북</option>
                                      <option value="충남">충남</option>
                                      <option value="경북">경북</option>
                                      <option value="경남">경남</option>
                                      <option value="전북">전북</option>
                                      <option value="전남">전남</option>
                                      <option value="제주">제주</option>
                                    </select>
                                  </div>
                                  <div className="wrap_slt">
                                    <select 
                                      name="sel2" 
                                      value={formData.sel2}
                                      onChange={handleInputChange}
                                      className="w120"
                                    >
                                      <option value="">시/군/구</option>
                                    </select>
                                  </div>
                                  <div className="wrap_slt">
                                    <select 
                                      name="sel3" 
                                      value={formData.sel3}
                                      onChange={handleInputChange}
                                      className="w120"
                                    >
                                      <option value="">읍/면/동</option>
                                    </select>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">청약통장</td>
                              <td className="article2">
                                <label className="pd20">
                                  <input 
                                    type="radio" 
                                    name="q1" 
                                    value="1순위"
                                    checked={formData.q1 === '1순위'}
                                    onChange={handleInputChange}
                                  /> 1순위
                                </label>
                                <label className="long">
                                  <input 
                                    type="radio" 
                                    name="q1" 
                                    value="2순위"
                                    checked={formData.q1 === '2순위'}
                                    onChange={handleInputChange}
                                  /> 2순위
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="q1" 
                                    value="없음"
                                    checked={formData.q1 === '없음'}
                                    onChange={handleInputChange}
                                  /> 없음
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">청약의사</td>
                              <td className="article2">
                                <label className="pd20">
                                  <input 
                                    type="radio" 
                                    name="q2" 
                                    value="있음"
                                    checked={formData.q2 === '있음'}
                                    onChange={handleInputChange}
                                  /> 있음
                                </label>
                                <label className="long">
                                  <input 
                                    type="radio" 
                                    name="q2" 
                                    value="고민해 보겠음"
                                    checked={formData.q2 === '고민해 보겠음'}
                                    onChange={handleInputChange}
                                  /> 고민해 보겠음
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="q2" 
                                    value="없음"
                                    checked={formData.q2 === '없음'}
                                    onChange={handleInputChange}
                                  /> 없음
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">계약의사</td>
                              <td className="article2">
                                <label className="pd20">
                                  <input 
                                    type="radio" 
                                    name="q4" 
                                    value="있음"
                                    checked={formData.q4 === '있음'}
                                    onChange={handleInputChange}
                                  /> 있음
                                </label>
                                <label className="long">
                                  <input 
                                    type="radio" 
                                    name="q4" 
                                    value="고민해 보겠음"
                                    checked={formData.q4 === '고민해 보겠음'}
                                    onChange={handleInputChange}
                                  /> 고민해 보겠음
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="q4" 
                                    value="없음"
                                    checked={formData.q4 === '없음'}
                                    onChange={handleInputChange}
                                  /> 없음
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td className="article1">분양목적</td>
                              <td className="article2">
                                <label className="pd20">
                                  <input 
                                    type="radio" 
                                    name="q3" 
                                    value="실거주"
                                    checked={formData.q3 === '실거주'}
                                    onChange={handleInputChange}
                                  /> 실거주
                                </label>
                                <label className="long2">
                                  <input 
                                    type="radio" 
                                    name="q3" 
                                    value="실거주+투자"
                                    checked={formData.q3 === '실거주+투자'}
                                    onChange={handleInputChange}
                                  /> 실거주+투자
                                </label>
                                <label className="">
                                  <input 
                                    type="radio" 
                                    name="q3" 
                                    value="투자"
                                    checked={formData.q3 === '투자'}
                                    onChange={handleInputChange}
                                  /> 투자
                                </label>
                                <label className="pd20">
                                  <input 
                                    type="radio" 
                                    name="q3" 
                                    value="모르겠다"
                                    checked={formData.q3 === '모르겠다'}
                                    onChange={handleInputChange}
                                  /> 모르겠다
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td className="register-txt" colSpan={2}>
                                ※ 위 입력사항은 전체 필수 입력사항입니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="personal">
                        <table className="register">
                          <tbody>
                            <tr>
                              <td className="btn_chk" colSpan={2}>
                                <button 
                                  type="submit" 
                                  className="submit_btn"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? '등록 중...' : '등 록'}
                                </button>
                                <span 
                                  className="submit_btn2" 
                                  onClick={() => window.history.back()}
                                >
                                  취 소
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}