# HiddenStamp - Project Structure

## Folder Structure

```
hidden-stamp/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font, theme, metadata)
│   ├── page.tsx                  # Main page (3-step flow)
│   ├── globals.css               # Global styles, custom classes
│   └── api/
│       └── stamp/
│           └── route.ts          # POST - watermark processing endpoint
│
├── components/                   # React Components
│   ├── ui/                       # Shadcn UI primitives
│   │   ├── button.tsx
│   │   └── progress.tsx
│   ├── FileUploadZone.tsx        # Step 1: drag & drop upload
│   ├── ConversionProgress.tsx    # Step 2: progress bar + cancel
│   ├── ProcessingResult.tsx      # Step 3: download + start over
│   └── BackgroundGradient.tsx    # Decorative blur gradient
│
├── hooks/                        # Custom React Hooks
│   ├── useProcessingJob.ts       # Processing job state management
│   └── useFileUpload.ts          # File selection & validation
│
├── lib/                          # Utilities & Infrastructure
│   ├── constants.ts              # App constants (limits, formats)
│   ├── stamp-engine.ts           # LSB steganography core (server-side)
│   ├── validators.ts             # File validation (type, size, count)
│   └── utils.ts                  # General utilities (formatFileSize, etc.)
│
├── types/                        # TypeScript Type Definitions
│   └── index.ts                  # ImageFile, ProcessingJob, StampConfig, etc.
│
├── public/                       # Static assets
│
├── docs/                         # Documentation
│   ├── 01-plan/                  # Phase 1-2 deliverables
│   │   ├── glossary.md
│   │   ├── schema.md
│   │   ├── domain-model.md
│   │   ├── naming.md
│   │   └── structure.md
│   └── page_design/              # Design mockups
│       ├── file_upload_screen/
│       ├── conversion_progress_screen/
│       └── processing_results_screen/
│
├── .env.example                  # Environment template (Git tracked)
├── .env.local                    # Local env values (Git ignored)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CONVENTIONS.md                # Coding convention summary
```

## File Placement Rules

| 파일 종류 | 위치 | 기준 |
|-----------|------|------|
| Page | `app/` | Next.js App Router convention |
| API | `app/api/` | Next.js Route Handler convention |
| Feature Component | `components/` | 화면별 주요 컴포넌트 |
| UI Primitive | `components/ui/` | Shadcn에서 생성된 공용 컴포넌트 |
| Custom Hook | `hooks/` | 상태 관리 로직 분리 |
| Server Logic | `lib/` | 서버 전용 코드 (stamp-engine 등) |
| Shared Utility | `lib/` | 클라이언트/서버 공용 유틸리티 |
| Type Definition | `types/` | 모든 TypeScript 타입 |
| Static Asset | `public/` | 이미지, 아이콘 등 정적 파일 |
| Documentation | `docs/` | 설계/기획 문서 |

## Component Separation Criteria

| 조건 | 분리 여부 |
|------|-----------|
| 독립된 UI 상태를 가짐 | 별도 컴포넌트로 분리 |
| 3-step flow의 각 단계 | 반드시 분리 (FileUploadZone, ConversionProgress, ProcessingResult) |
| 재사용 가능한 UI 패턴 | `components/ui/`에 배치 |
| 50줄 이상의 JSX | 하위 컴포넌트로 분리 고려 |
| 복잡한 상태 로직 | Hook으로 분리 (`hooks/`) |

## Environment Variables

### .env.example

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HiddenStamp

# Stamp Config (defaults, can be overridden)
STAMP_MAX_FILE_SIZE=10485760          # 10MB in bytes
STAMP_MAX_FILE_COUNT=20
STAMP_MAX_TEXT_LENGTH=256
```

### Security Rules

- `NEXT_PUBLIC_` prefix: 클라이언트 노출 허용 (앱 URL, 앱 이름만)
- 서버 전용 설정: prefix 없이 (`STAMP_*`)
- 이 프로젝트는 DB/인증 없음 → DB_, AUTH_ 관련 변수 불필요
