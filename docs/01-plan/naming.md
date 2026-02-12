# HiddenStamp - Naming Convention

## File Naming

| 대상 | 규칙 | 예시 |
|------|------|------|
| React Component | PascalCase | `FileUploadZone.tsx`, `ConversionProgress.tsx` |
| Hook | camelCase (use- prefix) | `useProcessingJob.ts`, `useFileUpload.ts` |
| Utility | camelCase | `formatFileSize.ts`, `validateImage.ts` |
| Type 정의 | camelCase | `types.ts`, `stamp.types.ts` |
| API Route | route.ts (Next.js convention) | `app/api/stamp/route.ts` |
| Constants | camelCase | `constants.ts` |
| CSS/Style | kebab-case | `globals.css` |
| Config | kebab-case | `tailwind.config.ts`, `next.config.ts` |

## Variable / Function Naming

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수 | camelCase | `fileList`, `stampConfig`, `isProcessing` |
| 함수 | camelCase (동사 시작) | `handleUpload()`, `processImage()`, `resetJob()` |
| Boolean | is/has/can prefix | `isUploading`, `hasFiles`, `canDownload` |
| Handler | handle- prefix | `handleDrop()`, `handleCancel()`, `handleDownload()` |
| 상수 | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `SUPPORTED_FORMATS`, `MAX_FILE_COUNT` |
| Enum/Union | PascalCase | `JobStatus`, `OutputFormat` |
| Type/Interface | PascalCase (I- prefix 없음) | `ImageFile`, `ProcessingJob`, `StampConfig` |

## Component Naming

| 대상 | 규칙 | 예시 |
|------|------|------|
| Page Component | page.tsx (Next.js) | `app/page.tsx` |
| Layout | layout.tsx (Next.js) | `app/layout.tsx` |
| Feature Component | PascalCase (기능 설명) | `FileUploadZone`, `ConversionProgress`, `ProcessingResult` |
| UI Primitive | PascalCase (Shadcn) | `Button`, `Progress`, `Card` |
| Compound Component | Parent.Child | 사용하지 않음 (단순 구조 유지) |

## CSS Class Naming

| 대상 | 규칙 | 예시 |
|------|------|------|
| Tailwind | 유틸리티 클래스 직접 사용 | `bg-primary text-background-dark` |
| Custom Class | kebab-case | `custom-dashed-border`, `neon-glow`, `glow-bar` |
| CSS Variable | -- prefix, kebab-case | `--primary`, `--background-dark` |

## API Route Naming

| 대상 | 규칙 | 예시 |
|------|------|------|
| Endpoint | kebab-case, 명사 중심 | `/api/stamp` |
| HTTP Method | REST convention | `POST /api/stamp` |
| Query Param | camelCase | `?includeTimestamp=true` |
| Response Field | camelCase | `{ stampedName, originalName }` |
| Error Code | UPPER_SNAKE_CASE | `FILE_TOO_LARGE`, `INVALID_FORMAT` |

## Import Order

```typescript
// 1. React / Next.js
import { useState } from 'react';
import Image from 'next/image';

// 2. External libraries
import JSZip from 'jszip';

// 3. Internal - components
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/FileUploadZone';

// 4. Internal - hooks / services
import { useProcessingJob } from '@/hooks/useProcessingJob';

// 5. Internal - types / constants
import type { ImageFile, ProcessingJob } from '@/types';
import { MAX_FILE_SIZE } from '@/lib/constants';
```
