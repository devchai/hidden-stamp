# HiddenStamp - Glossary (용어 사전)

## Business Terms (비즈니스 용어)

| Term (EN) | Term (KO) | Definition | Global Standard Mapping |
|-----------|-----------|------------|------------------------|
| HiddenStamp | 히든스탬프 | 이미지에 비가시적 워터마크를 삽입하는 웹 서비스 | Digital Watermarking Service |
| Invisible Watermark | 비가시 워터마크 | 육안으로 식별 불가능한 방식으로 이미지에 삽입된 데이터 | Steganographic Watermark |
| Stamping | 스탬핑 | 이미지에 비가시 워터마크를 삽입하는 처리 과정 | Watermark Embedding |
| Stamp Data | 스탬프 데이터 | 이미지에 숨겨지는 텍스트/식별 정보 | Payload (Steganography) |
| Original Image | 원본 이미지 | 사용자가 업로드한 처리 전 이미지 파일 | Source Image |
| Stamped Image | 스탬프 이미지 | 워터마크가 삽입 완료된 출력 이미지 | Watermarked Image |
| Drop Zone | 드롭존 | 파일 드래그앤드롭 업로드 영역 | File Drop Area |
| Processing Job | 처리 작업 | 하나 이상의 이미지에 대한 워터마크 삽입 작업 단위 | Batch Processing Task |
| Start Over | 다시 시작 | 결과 화면에서 업로드 화면으로 복귀하는 액션 | Reset / New Session |

## Global Standards (글로벌 표준 용어)

| Term | Definition | Reference |
|------|------------|-----------|
| LSB Steganography | Least Significant Bit - 픽셀의 최하위 비트를 변경하여 데이터를 숨기는 기법 | Digital Steganography |
| PNG | Portable Network Graphics - 무손실 압축 이미지 포맷 | ISO/IEC 15948 |
| JPEG | Joint Photographic Experts Group - 손실 압축 이미지 포맷 | ISO/IEC 10918 |
| WebP | Google이 개발한 이미지 포맷 (손실/무손실 지원) | Google WebP |
| MIME Type | 파일 형식을 식별하는 인터넷 표준 | RFC 6838 |
| Blob | Binary Large Object - 브라우저에서 바이너리 데이터를 나타내는 객체 | Web API |
| FormData | 폼 데이터를 key-value 쌍으로 전송하는 Web API | Web API |
| API Route | Next.js 서버사이드 엔드포인트 | Next.js (App Router) |

## Term Usage Rules (용어 사용 규칙)

1. **코드**: 영문 사용 (`StampedImage`, `processingJob`, `dropZone`)
2. **UI/문서**: 한국어 우선 (스탬프 이미지, 처리 작업)
3. **API 응답**: camelCase 영문 (`stampedImage`, `stampData`)
4. **파일명**: kebab-case 영문 (`stamped-image.png`, `processing-job.ts`)
5. **컴포넌트명**: PascalCase (`FileUploadZone`, `ConversionProgress`, `ProcessingResult`)

## UI Text Mapping (화면 텍스트)

| Screen | UI Text (EN) | Component |
|--------|-------------|-----------|
| Upload | "Drop files here" | FileUploadZone |
| Upload | "Upload" | UploadButton |
| Progress | "Converting... {n}%" | ConversionProgress |
| Progress | "Cancel" | CancelButton |
| Result | "Download All" | DownloadButton |
| Result | "{n} files processed successfully" | ResultSummary |
| Result | "Start over" | StartOverLink |
| Nav | "HiddenStamp" | NavBrand |
