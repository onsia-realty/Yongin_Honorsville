# SuperClaude v3 사용 가이드라인 🚀

SuperClaude는 Claude Code를 강화하여 개발 작업을 더욱 효율적으로 만들어주는 프레임워크입니다.

## 🎯 SuperClaude란 무엇인가요?

SuperClaude는 Claude Code에 다음과 같은 기능을 추가합니다:
- 🛠️ **16개의 전문 명령어** - 일반적인 개발 작업을 위한 특화된 도구들
- 🎭 **스마트 페르소나** - 다양한 도메인의 전문가들이 자동으로 도움을 제공
- 🔧 **MCP 서버 통합** - 문서, UI 컴포넌트, 브라우저 자동화 기능
- 📋 **작업 관리** - 진행 상황을 추적하고 관리
- ⚡ **토큰 최적화** - 더 긴 대화를 위한 효율적인 리소스 사용

## 📦 설치 방법

### 1단계: Python 패키지 설치

**옵션 A: PyPI에서 설치 (권장)**
```bash
uv add SuperClaude
```

**옵션 B: 소스에서 설치**
```bash
git clone https://github.com/SuperClaude-Org/SuperClaude_Framework.git
cd SuperClaude_Framework
uv sync
```

### 2단계: 설치 프로그램 실행

설치가 완료되면 다음 중 하나의 방법으로 SuperClaude 설치 프로그램을 실행하세요:

```bash
# 빠른 설정 (대부분의 사용자에게 권장)
python3 -m SuperClaude install

# 또는 간단한 명령어로
SuperClaude install

# 상호작용 방식 설치 (구성 요소 선택 가능)
SuperClaude install --interactive

# 최소 설치 (핵심 프레임워크만)
SuperClaude install --minimal

# 개발자 설정 (모든 기능 포함)
SuperClaude install --profile developer
```

**완료!** 🎉 설치 프로그램이 모든 것을 자동으로 설정합니다.

## 🚀 빠른 시작

설치가 완료되면 Claude Code에서 다음을 시도해보세요:

```bash
# 도움말 보기
/sc:help

# 파일 분석하기
/sc:analyze README.md

# 빌드 실행하기
/sc:build

# 코드 개선하기
/sc:improve messy-file.js

# 문제 해결하기
/sc:troubleshoot "오류 메시지"
```

## 🛠️ 주요 명령어

### 개발 명령어
- **`/sc:implement`** - 기능 구현 (v2의 /build 대신 사용)
- **`/sc:build`** - 프로젝트 빌드 및 컴파일
- **`/sc:design`** - 시스템 설계 도움

### 분석 명령어
- **`/sc:analyze`** - 코드 분석 및 조사
- **`/sc:troubleshoot`** - 문제 해결 및 디버깅
- **`/sc:explain`** - 코드 설명 및 교육

### 품질 개선 명령어
- **`/sc:improve`** - 코드 개선 및 최적화
- **`/sc:test`** - 테스트 실행 및 관리
- **`/sc:cleanup`** - 코드 정리 및 기술부채 해결

### 문서화 명령어
- **`/sc:document`** - 문서 생성 및 작성

### 기타 유용한 명령어
- **`/sc:git`** - Git 워크플로우 지원
- **`/sc:estimate`** - 작업 시간 추정
- **`/sc:task`** - 작업 관리
- **`/sc:index`** - 사용 가능한 명령어 탐색
- **`/sc:load`** - 프로젝트 컨텍스트 로드
- **`/sc:spawn`** - 복잡한 작업 조율

## 🎭 스마트 페르소나 시스템

SuperClaude는 작업 유형에 따라 자동으로 적절한 전문가를 활성화합니다:

- 🏗️ **architect** - 시스템 설계 및 아키텍처
- 🎨 **frontend** - UI/UX 및 접근성
- ⚙️ **backend** - API 및 인프라
- 🔍 **analyzer** - 디버깅 및 문제 해결
- 🛡️ **security** - 보안 및 취약점 분석
- ✍️ **scribe** - 문서화 및 작성
- 🔧 **refactorer** - 코드 품질 개선
- ⚡ **performance** - 성능 최적화
- 🧪 **qa** - 품질 보증 및 테스트
- 🚀 **devops** - 인프라 및 배포
- 📚 **mentor** - 교육 및 지식 전달

**자동 활성화 예시:**
- `auth.js` 파일 분석 → 보안 전문가 자동 활성화 🛡️
- React 컴포넌트 작업 → 프론트엔드 전문가 자동 활성화 🎨
- 성능 문제 디버깅 → 성능 최적화 전문가 자동 활성화 ⚡

## 🔧 MCP 서버 통합

SuperClaude는 다음과 같은 외부 도구들과 연동됩니다:

- **Context7** - 공식 라이브러리 문서 및 패턴 검색
- **Sequential** - 복잡한 다단계 분석 및 체계적 사고
- **Magic** - 현대적인 UI 컴포넌트 생성
- **Playwright** - 브라우저 자동화 및 E2E 테스트

이러한 도구들은 필요에 따라 자동으로 활성화되며, 더 나은 결과를 제공합니다.

## 🚩 유용한 플래그들

### 분석 플래그
- `--think` - 다중 파일 분석 (~4K 토큰)
- `--think-hard` - 심층 아키텍처 분석 (~10K 토큰)
- `--ultrathink` - 최대 깊이 분석 (~32K 토큰)

### 효율성 플래그
- `--uc` / `--ultracompressed` - 30-50% 토큰 절약
- `--validate` - 작업 전 검증 및 위험 평가
- `--safe-mode` - 최대 검증으로 안전한 실행

### MCP 서버 제어
- `--c7` - Context7 활성화 (문서 검색)
- `--seq` - Sequential 활성화 (복잡한 분석)
- `--magic` - Magic 활성화 (UI 컴포넌트)
- `--play` - Playwright 활성화 (브라우저 자동화)

### 작업 관리
- `--loop` - 반복적 개선 모드
- `--delegate` - 하위 에이전트에 작업 위임
- `--wave-mode` - 다단계 조율 실행

## 💡 사용 팁

### 1. 간단하게 시작하기
```bash
# 기본 명령어들로 시작하세요
/sc:analyze src/
/sc:implement 사용자-인증
/sc:improve slow-file.js
```

### 2. 자동화 활용하기
SuperClaude는 대부분의 작업을 자동으로 처리합니다:
- 적절한 전문가 자동 선택
- 필요한 도구 자동 활성화
- 최적의 작업 흐름 자동 구성

### 3. 복잡한 작업의 경우
```bash
# 큰 프로젝트 분석
/sc:analyze --think-hard entire-project/

# 반복적 개선
/sc:improve --loop messy-codebase/

# 시스템 설계
/sc:design --ultrathink new-microservice
```

### 4. 성능 최적화
```bash
# 토큰 절약이 필요한 경우
/sc:analyze --uc large-project/

# 빠른 분석이 필요한 경우
/sc:troubleshoot --quick "에러 메시지"
```

## 🔄 v2에서 v3로 업그레이드

**중요한 변경사항:**
- `/build` 명령어가 변경되었습니다!
  - v2: `/build myFeature` (기능 구현)
  - v3: `/sc:build` (컴파일/패키징), `/sc:implement myFeature` (기능 구현)

**마이그레이션:**
- `v2 /build myFeature` → `v3 /sc:implement myFeature`

## 📂 설치된 파일 구조

SuperClaude는 `~/.claude/` 디렉토리에 설치됩니다:

```
~/.claude/
├── CLAUDE.md              # 메인 프레임워크 진입점
├── COMMANDS.md             # 사용 가능한 슬래시 명령어
├── FLAGS.md                # 명령어 플래그 및 옵션
├── PERSONAS.md             # 스마트 페르소나 시스템
├── PRINCIPLES.md           # 개발 원칙
├── RULES.md                # 운영 규칙
├── MCP.md                  # MCP 서버 통합
├── MODES.md                # 운영 모드
├── ORCHESTRATOR.md         # 지능형 라우팅
├── settings.json           # 설정 파일
└── commands/               # 개별 명령어 정의
    ├── analyze.md
    ├── build.md
    ├── implement.md
    └── ... (13개 더)
```

## 🛠️ 관리 명령어

### 업데이트
```bash
# 업데이트 확인 및 실행
SuperClaude update

# 강제 업데이트 (로컬 변경사항 덮어씀)
SuperClaude update --force
```

### 백업
```bash
# 백업 생성
SuperClaude backup --create

# 백업 목록 보기
SuperClaude backup --list

# 백업에서 복원
SuperClaude backup --restore
```

### 제거
```bash
# SuperClaude 제거 (백업 유지)
SuperClaude uninstall

# 완전 제거 (모든 파일 삭제)
SuperClaude uninstall --complete
```

## 🚨 문제 해결

### 일반적인 문제들

**"Python not found"**
```bash
# python3 대신 python 시도
python --version

# PATH 확인
which python3
```

**"Claude CLI not found"**
- Claude Code가 먼저 설치되어 있는지 확인
- `claude --version`으로 확인
- https://claude.ai/code 에서 설치 도움말 참조

**"MCP 서버 설치 실패"**
- Node.js 설치 확인: `node --version`
- npm 사용 가능 확인: `npm --version`
- 먼저 `--minimal` 또는 `--quick`으로 설치 시도

### 플랫폼별 문제

**Windows:**
- `python3` 대신 `python` 사용
- 권한 오류 시 관리자 권한으로 실행
- Python이 PATH에 있는지 확인

**macOS:**
- 보안 및 개인정보 설정에서 SuperClaude 승인 필요할 수 있음
- Python 3.8+ 없으면 `brew install python3` 사용

**Linux:**
- `python3-pip` 설치되어 있는지 확인
- 일부 패키지 설치에 `sudo` 필요할 수 있음
- `~/.local/bin`이 PATH에 있는지 확인

## 🎯 다음 단계

**설치 완료 후:**

1. **바로 사용해보기** - `/sc:analyze some-file.js` 또는 `/sc:build` 시도 ✨
2. **학습에 부담 느끼지 마세요** - SuperClaude가 대부분 자동으로 처리합니다
3. **자유롭게 실험하기** - `/sc:improve`, `/sc:troubleshoot` 같은 명령어들은 관용적입니다
4. **궁금할 때 가이드 읽기** - 무슨 일이 일어났는지 이해하고 싶을 때 `Docs/` 확인
5. **피드백 제공** - 무엇이 잘 작동하고 무엇이 그렇지 않은지 알려주세요

**진짜 비밀:** SuperClaude는 새로운 것을 많이 배울 필요 없이 기존 워크플로우를 향상시키도록 설계되었습니다. 평소 Claude Code를 사용하듯이 사용하되, 얼마나 더 똑똑해졌는지 확인해보세요! 🎯

**여전히 확신이 서지 않나요?** `/sc:help`와 `/sc:analyze README.md`부터 시작하세요. 실제로 얼마나 위협적이지 않은지 보실 수 있을 것입니다.

## 📚 추가 자료

- 📖 [완전한 사용자 가이드](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/superclaude-user-guide.md)
- 🛠️ [명령어 가이드](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/commands-guide.md)
- 🏳️ [플래그 가이드](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/flags-guide.md)
- 🎭 [페르소나 가이드](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/personas-guide.md)
- 📦 [설치 가이드](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/installation-guide.md)

## 🤝 기여하기

SuperClaude 개선에 도움을 주세요:
- 🐛 **버그 리포트** - 무엇이 작동하지 않는지 알려주세요
- 📝 **문서화** - 더 나은 설명을 도와주세요
- 🧪 **테스트** - 다양한 설정에서의 테스트 커버리지
- 💡 **아이디어** - 새로운 기능이나 개선사항 제안

## 📄 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE 파일](https://opensource.org/licenses/MIT) 참조

---

*SuperClaude v3으로 더 스마트한 개발 경험을 시작하세요! 🚀*

---

*마지막 업데이트: 2024년 7월 - 이 가이드에서 잘못되거나 혼란스러운 부분이 있다면 알려주세요!*