# HiddenStamp - Mockup Specification (Phase 3)

## Overview

- **Flow**: Single Page, 3-Step (Upload → Processing → Result)
- **Theme**: Dark mode, Neon Green accent
- **Mockup**: `mockup/pages/index.html`

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0df20d` | Accent, buttons, icons, glow |
| `--bg-dark` | `#050505` | Body background |
| `--bg-neutral` | `#0a0a0a` | Card/surface background |
| `--border-neutral` | `#1a1a1a` | Dashed border, dividers |
| `--text-primary` | `#f1f5f9` | Headings, body text |
| `--text-secondary` | `#64748b` | Labels, descriptions |
| `--text-muted` | `rgba(255,255,255,0.3)` | Cancel, hints |
| `--font-display` | `Space Grotesk` | All text |
| `--glow-spread` | `0 0 25px rgba(13,242,13,0.4)` | Button hover |
| `--glow-bar` | `0 0 15px rgba(13,242,13,0.3)` | Progress bar |

---

## Screen Specifications

### Step 1: FileUploadZone

- [ ] Dashed border drop zone (16:10 ratio)
- [ ] `+` icon + "Drop files here" label
- [ ] Supported format hint (JPG, PNG, WebP up to 10MB)
- [ ] Click to open file picker
- [ ] Drag & drop support with visual feedback
- [ ] File list preview (name, size, remove button)
- [ ] Upload button (disabled when no files)
- [ ] Max 20 files

### Step 2: ConversionProgress

- [ ] "Converting... N%" text label
- [ ] Thin progress bar (2px, glow effect)
- [ ] Cancel button (muted text, uppercase)
- [ ] Cancel returns to Step 1

### Step 3: ProcessingResult

- [ ] Check circle icon with glow pulse animation
- [ ] "Download All" primary button (wide variant)
- [ ] "N files processed successfully" message
- [ ] "Start Over" button returns to Step 1

---

## Component Mapping (Mockup → Next.js)

| Mockup Element | Next.js Component | File Path |
|----------------|-------------------|-----------|
| `[data-component="FileUploadZone"]` | `FileUploadZone` | `components/FileUploadZone.tsx` |
| `[data-component="ConversionProgress"]` | `ConversionProgress` | `components/ConversionProgress.tsx` |
| `[data-component="ProcessingResult"]` | `ProcessingResult` | `components/ProcessingResult.tsx` |
| `[data-component="BackgroundGradient"]` | `BackgroundGradient` | `components/BackgroundGradient.tsx` |
| `.btn-primary` | `Button` (Shadcn) | `components/ui/button.tsx` |
| `.progress__track + .progress__bar` | `Progress` (Shadcn) | `components/ui/progress.tsx` |
| `.file-item` | inline in `FileUploadZone` | - |
| `.drop-zone` | inline in `FileUploadZone` | - |

---

## Props Interface (Next.js Transition)

```typescript
// FileUploadZone
interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFileCount: number;
  maxFileSize: number;
  supportedFormats: string[];
}

// ConversionProgress
interface ConversionProgressProps {
  percent: number;
  onCancel: () => void;
}

// ProcessingResult
interface ProcessingResultProps {
  fileCount: number;
  onDownload: () => void;
  onStartOver: () => void;
}

// BackgroundGradient
// No props - pure decorative component
```

---

## Interactions

| Action | Trigger | Result |
|--------|---------|--------|
| Drop files | Drag & drop on zone | Files added to list, button enabled |
| Click zone | Click drop zone | Native file picker opens |
| Remove file | Click `×` on file item | File removed from list |
| Upload | Click Upload button | Transition to Step 2 |
| Cancel | Click Cancel in Step 2 | Return to Step 1 (files preserved) |
| Download | Click Download All | Download simulation |
| Start Over | Click Start Over | Reset all state, return to Step 1 |

---

## Validation Rules

| Rule | Value | Error |
|------|-------|-------|
| Supported formats | JPEG, PNG, WebP | Skip silently |
| Max file size | 10MB | Skip silently |
| Max file count | 20 | Stop adding after limit |
| Duplicate check | By filename | Skip duplicates |

---

## Animation Specs

| Animation | Duration | Easing | Details |
|-----------|----------|--------|---------|
| Step transition | 500ms | ease | Fade + translateY(20px) |
| Drop zone hover | 300ms | ease | Border color + bg change |
| Button hover glow | instant | - | box-shadow |
| Button active | instant | - | scale(0.95) |
| Progress bar | 3000ms total | linear | Width 0→100% |
| Glow pulse (result) | 2000ms | ease-in-out | Opacity 0→1→0 infinite |

---

## Responsive Breakpoints

| Breakpoint | Change |
|------------|--------|
| `<640px` | Drop zone 4:3 ratio, buttons full width |
| `>=640px` | Drop zone 16:10 ratio, buttons constrained width |

---

## File Structure

```
mockup/
├── pages/
│   └── index.html          # Integrated 3-step mockup
├── styles/
│   └── main.css            # Design tokens + component styles
├── scripts/
│   └── app.js              # Flow controller + interactions
└── data/
    └── mock-response.json  # API response simulation data
```
