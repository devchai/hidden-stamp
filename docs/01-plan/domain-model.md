# HiddenStamp - Domain Model

## Entity Relationship

```
User (Browser)
  │
  ├── uploads ──→ ImageFile [1..*]
  │                  │
  │                  ├── has ──→ name, size, type, preview
  │                  │
  │                  └── belongs to ──→ ProcessingJob [1]
  │
  ├── configures ──→ StampConfig [1]
  │                     │
  │                     └── has ──→ text, timestamp, outputFormat
  │
  └── triggers ──→ ProcessingJob [1]
                      │
                      ├── has ──→ status, progress, error
                      │
                      ├── contains ──→ ImageFile [1..*]
                      │
                      ├── produces ──→ ProcessedFile [0..*]
                      │                   │
                      │                   └── has ──→ blob, stampedName, size
                      │
                      └── uses ──→ StampConfig [1]
```

## Core Flows

### Flow 1: File Upload

```
[Browser]                          [Client State]
    │                                    │
    ├─ drag & drop / click select ──→ files validated
    │                                    │
    ├─ file type check ────────────→ reject non-image
    ├─ file size check ────────────→ reject > 10MB
    ├─ file count check ───────────→ reject > 20 files
    │                                    │
    └─ files accepted ─────────────→ ImageFile[] created
                                         │
                                    status: idle → idle (files ready)
```

### Flow 2: Stamping Process

```
[Client]                    [API Route]                    [Sharp Engine]
    │                            │                              │
    ├─ FormData POST ──────→ receive files                     │
    │                            │                              │
    │                       validate request                    │
    │                            │                              │
    │                       for each file:                      │
    │                            ├──────────────→ load image buffer
    │                            │                ├──→ extract pixel data
    │                            │                ├──→ encode stamp via LSB
    │                            │                ├──→ output PNG buffer
    │                            │                └──→ return stamped buffer
    │                            │                              │
    │  ←── progress update ──┤                              │
    │                            │                              │
    │  ←── zip / image blob ─┘                              │
    │                                                           │
    └─ download triggered                                       │
```

### Flow 3: UI State Machine

```
┌──────────┐     upload      ┌──────────────┐
│          │ ──────────────→ │              │
│   UPLOAD │                 │  PROCESSING  │
│  Screen  │ ←───────────── │   Screen     │
│          │    cancel       │              │
└──────────┘                 └──────┬───────┘
      ↑                             │
      │         completed           │
      │                      ┌──────▼───────┐
      │                      │              │
      └───── start over ──── │    RESULT    │
                             │   Screen     │
                             │              │
                             └──────────────┘
```

## Boundary Definitions

### Client-Side (Browser)

| Responsibility | Description |
|---------------|-------------|
| File Selection | 파일 선택/드래그앤드롭, 유효성 검사 (type, size, count) |
| State Management | 3단계 UI 상태 전이 관리 |
| Progress Display | 서버로부터 받은 진행률 표시 |
| Download | 처리된 파일 Blob 다운로드 / zip 패키징 |

### Server-Side (API Route)

| Responsibility | Description |
|---------------|-------------|
| File Validation | 서버사이드 파일 유효성 재검증 |
| LSB Engine | sharp를 활용한 픽셀 단위 워터마크 삽입 |
| Output Generation | PNG 변환 및 zip 아카이브 생성 |
| Error Handling | 처리 실패 시 에러 응답 |

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| 워터마크 방식 | LSB Steganography | 육안 식별 불가, 구현 단순성 |
| 출력 포맷 | PNG 고정 | LSB 데이터 보존을 위한 무손실 필수 |
| 이미지 처리 위치 | Server-side (API Route) | sharp 라이브러리는 Node.js 전용 |
| 상태 관리 | Client-side (React State) | DB 불필요, 세션 단위 처리 |
| 다중 파일 다운로드 | jszip | 브라우저 호환성, 경량 |
