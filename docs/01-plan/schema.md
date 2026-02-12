# HiddenStamp - Data Schema

## Core Types

### ImageFile (업로드 이미지)

```typescript
interface ImageFile {
  id: string;                    // 클라이언트 생성 고유 ID (crypto.randomUUID)
  file: File;                    // 브라우저 File 객체
  name: string;                  // 원본 파일명 (example.jpg)
  size: number;                  // 파일 크기 (bytes)
  type: string;                  // MIME type (image/jpeg, image/png, image/webp)
  preview?: string;              // ObjectURL for thumbnail preview
}
```

### StampConfig (워터마크 설정)

```typescript
interface StampConfig {
  text: string;                  // 삽입할 워터마크 텍스트
  timestamp: boolean;            // 타임스탬프 자동 포함 여부
  outputFormat: 'png';           // 출력 포맷 (무손실 보장을 위해 PNG 고정)
}
```

### ProcessingJob (처리 작업)

```typescript
type JobStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error' | 'cancelled';

interface ProcessingJob {
  status: JobStatus;             // 현재 작업 상태
  files: ImageFile[];            // 업로드된 이미지 목록
  progress: number;              // 전체 진행률 (0-100)
  currentFileIndex: number;      // 현재 처리 중인 파일 인덱스
  results: ProcessedFile[];      // 처리 완료된 파일 목록
  error?: string;                // 에러 메시지
  startedAt?: number;            // 처리 시작 시간 (timestamp)
}
```

### ProcessedFile (처리 결과)

```typescript
interface ProcessedFile {
  id: string;                    // 원본 ImageFile.id와 동일
  originalName: string;          // 원본 파일명
  stampedName: string;           // 출력 파일명 (example_stamped.png)
  blob: Blob;                    // 워터마크 삽입된 이미지 바이너리
  size: number;                  // 출력 파일 크기 (bytes)
}
```

## API Types

### POST /api/stamp - Request

```typescript
// FormData로 전송
// - files: File[]              // 이미지 파일들 (multipart)
// - stampText: string           // 워터마크 텍스트
// - includeTimestamp: boolean   // 타임스탬프 포함 여부
```

### POST /api/stamp - Response

```typescript
// 단일 파일: 직접 이미지 바이너리 응답
// 다중 파일: zip 아카이브 응답

// Headers:
// Content-Type: image/png | application/zip
// Content-Disposition: attachment; filename="stamped_images.zip"

// Error Response:
interface ApiError {
  error: string;                 // 에러 코드
  message: string;               // 사용자 표시용 메시지
}
```

## Constraints (제약 조건)

| 항목 | 제약 | 근거 |
|------|------|------|
| 지원 포맷 | JPEG, PNG, WebP | 일반적 웹 이미지 포맷 |
| 최대 파일 크기 | 10MB per file | Vercel Serverless 제한 고려 |
| 최대 파일 수 | 20 files per job | 메모리 및 처리 시간 제한 |
| 출력 포맷 | PNG only | LSB 무손실 보장 |
| 워터마크 텍스트 | max 256 chars | LSB 데이터 용량 제한 |

## State Flow (상태 전이)

```
idle → uploading → processing → completed
                              → error
                   → cancelled

error → idle (Start Over)
completed → idle (Start Over)
cancelled → idle (자동 복귀)
```
