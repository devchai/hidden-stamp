# HiddenStamp - 개발 플랜

## 프로젝트 개요
- **서비스명**: HiddenStamp
- **목적**: 이미지에 비인가적(invisible) 워터마크를 삽입하는 웹 서비스
- **스택**: Next.js + Shadcn + Tailwind CSS
- **배포**: Vercel

## 디자인 스펙 (docs/page_design 기반)
- **테마**: 다크 모드, 미니멀리스트
- **Primary**: `#0df20d` (네온 그린)
- **배경**: `#050505` ~ `#0a0a0a`
- **폰트**: Space Grotesk
- **효과**: neon-glow hover, dashed border drop zone, blur gradient

## 화면 구성 (Single Page - 3 Step Flow)
1. **파일 업로드 화면** - 드래그앤드롭 + 클릭 업로드
2. **변환 진행 화면** - 프로그레스 바 + 퍼센트 표시 + 취소 버튼
3. **결과/다운로드 화면** - 체크 아이콘 + Download All + 처리 결과 + Start Over

---

## Pipeline Phase 1: 스키마/용어 정의
- [x] 용어 사전 작성 (`docs/01-plan/glossary.md`)
- [x] 데이터 스키마 정의 (`docs/01-plan/schema.md`)
- [x] 도메인 모델 작성 (`docs/01-plan/domain-model.md`)

## Pipeline Phase 2: 코딩 컨벤션
- [x] 네이밍 규칙 정의 (`docs/01-plan/naming.md`)
- [x] 폴더 구조 규칙 정의 (`docs/01-plan/structure.md`)
- [x] 통합 컨벤션 문서 작성 (`CONVENTIONS.md`)

## Pipeline Phase 3: 목업
- [x] 통합 인터랙티브 목업 생성 (`mockup/pages/index.html`)
- [x] 디자인 토큰 + 컴포넌트별 CSS 분리 (`mockup/styles/main.css`)
- [x] 인터랙션 스크립트 (3-step flow) (`mockup/scripts/app.js`)
- [x] API 응답 시뮬레이션 데이터 (`mockup/data/mock-response.json`)
- [x] 목업 스펙 + 컴포넌트 매핑 문서 (`docs/02-design/mockup-spec.md`)

## Phase 1: 프로젝트 초기화
- [x] Next.js 프로젝트 생성 (App Router)
- [x] Tailwind CSS 설정
- [ ] Shadcn UI 초기화
- [x] Space Grotesk 폰트 설정
- [x] 커스텀 컬러 테마 설정 (primary, background-dark, neutral 등)
- [x] Git 초기화 (https://github.com/devchai/hidden-stamp)

## Phase 2: 디자인 시스템
- [x] globals.css에 다크 테마 및 커스텀 스타일 정의
- [x] neon-glow, custom-dashed-border 등 유틸리티 클래스 정의
- [x] 공통 레이아웃 컴포넌트 (BackgroundGradient)

## Phase 3: 파일 업로드 화면
- [x] FileUploadZone 컴포넌트 (드래그앤드롭 + 클릭)
- [x] 이미지 파일 필터링 (jpg, png, webp 등)
- [x] 다중 파일 선택 지원
- [ ] 파일 선택 시 썸네일 미리보기 (선택사항)
- [x] Upload 버튼 (파일 미선택 시 비활성화)

## Phase 4: 비인가적 워터마크 엔진 (핵심)
- [x] LSB(Least Significant Bit) 스테가노그래피 알고리즘 구현
- [x] Next.js API Route로 서버사이드 이미지 처리 (sharp 활용)
- [x] 워터마크 텍스트/데이터 인코딩 로직
- [x] 처리 진행률 계산 로직
- [x] 원본 이미지 품질 유지 보장

## Phase 5: 변환 진행 화면
- [x] ConversionProgress 컴포넌트
- [x] 프로그레스 바 애니메이션 (glow 효과 포함)
- [x] 퍼센트 실시간 업데이트
- [x] Cancel 버튼으로 처리 중단 지원

## Phase 6: 결과/다운로드 화면
- [x] ProcessingResult 컴포넌트
- [x] 체크 아이콘 + glow 애니메이션
- [x] Download All 버튼 (zip으로 묶어서 다운로드)
- [x] 처리 파일 수 표시 ("N files processed successfully")
- [x] Start Over 버튼으로 초기 화면 복귀

## Phase 7: 상태 관리 및 플로우 통합
- [x] 3단계 플로우 상태 관리 (upload → processing → result)
- [x] 파일 업로드 → API 호출 → 진행률 추적 → 결과 표시 흐름 연결
- [x] 에러 핸들링 (파일 크기 제한, 형식 오류 등)

## Phase 8: 배포 준비
- [x] 환경변수 설정
- [x] Vercel 배포 설정 (https://hidden-stamp.vercel.app/)
- [x] 메타 태그 및 SEO 기본 설정
- [ ] 반응형 디자인 검증

---

## 기술 결정 사항

### 비인가적 워터마크 방식
**LSB (Least Significant Bit) 스테가노그래피**
- 이미지 픽셀의 최하위 비트에 데이터를 숨김
- 육안으로 차이를 식별 불가
- sharp 라이브러리로 서버사이드에서 픽셀 단위 조작
- PNG 출력으로 무손실 보장

### 파일 처리 흐름
```
Client: 파일 선택 → FormData 전송
Server: sharp로 이미지 로드 → LSB 워터마크 삽입 → PNG 변환 → 응답
Client: Blob 수신 → zip 패키징 → 다운로드
```

### 주요 라이브러리
- `next` - 프레임워크
- `shadcn/ui` - UI 컴포넌트
- `tailwindcss` - 스타일링
- `sharp` - 서버사이드 이미지 처리
- `jszip` - 다중 파일 zip 다운로드
- `lucide-react` - 아이콘
