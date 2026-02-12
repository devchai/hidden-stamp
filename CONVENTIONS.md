# HiddenStamp - Coding Conventions

## Tech Stack

| 항목 | 선택 | 비고 |
|------|------|------|
| Framework | Next.js 15 (App Router) | React 19 |
| UI Library | Shadcn/ui | Radix UI 기반 |
| Styling | Tailwind CSS 4 | 다크 테마 전용 |
| Font | Space Grotesk | Google Fonts |
| Image Processing | sharp | 서버사이드 전용 |
| Zip | jszip | 다중 파일 다운로드 |
| Icons | lucide-react | Shadcn 기본 |
| Deploy | Vercel | Serverless |

## Design Tokens

```
Primary:          #0df20d (neon green)
Background Dark:  #050505
Neutral Dark:     #0a0a0a
Neutral Border:   #1a1a1a
Text Primary:     slate-100
Text Secondary:   slate-500
```

## Naming Rules (Summary)

| 대상 | 규칙 | 예시 |
|------|------|------|
| Component File | PascalCase.tsx | `FileUploadZone.tsx` |
| Hook | use-prefix camelCase.ts | `useProcessingJob.ts` |
| Utility | camelCase.ts | `formatFileSize.ts` |
| Variable | camelCase | `isProcessing`, `fileList` |
| Constant | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Type | PascalCase | `ImageFile`, `JobStatus` |
| CSS Class | kebab-case | `neon-glow`, `custom-dashed-border` |
| API Error | UPPER_SNAKE_CASE | `FILE_TOO_LARGE` |

> 상세: `docs/01-plan/naming.md`

## Project Structure (Summary)

```
app/                    # Pages + API Routes
components/             # Feature + UI components
  ui/                   # Shadcn primitives
hooks/                  # Custom hooks (state logic)
lib/                    # Utilities + server logic
types/                  # TypeScript types
```

> 상세: `docs/01-plan/structure.md`

## Code Style

### TypeScript

- **Strict Mode**: `tsconfig.json`에서 `strict: true`
- **Type-only Import**: `import type { ... }` 사용
- **No `any`**: 명시적 타입 지정 필수
- **Prefer `interface`**: 객체 타입은 interface, union/intersection은 type

### React / Next.js

- **Server Component 기본**: `'use client'`는 필요한 컴포넌트에만 명시
- **Named Export**: 컴포넌트는 `export function` 사용 (default export은 page만)
- **Props Type**: 컴포넌트 파일 내에서 Props interface 정의

```typescript
interface FileUploadZoneProps {
  onFilesSelected: (files: ImageFile[]) => void;
  disabled?: boolean;
}

export function FileUploadZone({ onFilesSelected, disabled }: FileUploadZoneProps) {
  // ...
}
```

### State Management

- **React State**: `useState` + `useReducer` (외부 상태 라이브러리 없음)
- **Custom Hook**: 복잡한 상태 로직은 반드시 Hook으로 분리
- **Lifting State**: 3-step flow 상태는 `page.tsx`에서 관리, 하위 컴포넌트에 props 전달

### Styling

- **Tailwind 우선**: inline style 사용 금지, Tailwind 유틸리티 클래스 사용
- **cn() 함수**: 조건부 클래스 결합에 `cn()` (clsx + tailwind-merge) 사용
- **Custom Class**: Tailwind로 표현 불가능한 경우에만 `globals.css`에 정의
- **반응형**: `md:` breakpoint 기준으로 모바일/데스크톱 분기

### Error Handling

- **Client**: try-catch + 사용자 친화적 에러 메시지 표시
- **Server (API Route)**: NextResponse.json으로 구조화된 에러 응답
- **Validation**: 클라이언트에서 선검증, 서버에서 재검증 (이중 검증)

```typescript
// API Error Response 형식
{ error: 'FILE_TOO_LARGE', message: 'File exceeds 10MB limit' }
```

## Commit Convention

```
feat: 새로운 기능 추가
fix: 버그 수정
style: UI/스타일 변경 (동작 변경 없음)
refactor: 코드 구조 개선 (동작 변경 없음)
docs: 문서 변경
chore: 설정, 빌드 관련 변경
```

## Constraints

| 항목 | 제한 | 비고 |
|------|------|------|
| 지원 이미지 | JPEG, PNG, WebP | MIME type 검사 |
| 파일 크기 | 10MB per file | Vercel 제한 고려 |
| 파일 수 | 20 files per job | 메모리 제한 |
| 출력 포맷 | PNG only | LSB 무손실 |
| 워터마크 텍스트 | 256 chars max | LSB 용량 |
