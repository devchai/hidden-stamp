/**
 * HiddenStamp Mockup - Interactive Flow Controller
 *
 * 3-step flow: Upload → Processing → Result
 * Pure JS, no framework dependencies.
 */

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILE_COUNT = 20;

const state = {
  currentStep: 'upload',
  files: [],
  progress: 0,
  processingTimer: null,
};

// ── DOM References ──────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
  steps: () => $$('[data-step]'),
  dropZone: () => $('[data-component="FileUploadZone"] .drop-zone'),
  fileInput: () => $('#file-input'),
  fileList: () => $('.file-list'),
  uploadBtn: () => $('#btn-upload'),
  progressLabel: () => $('.progress__percent'),
  progressBar: () => $('.progress__bar'),
  cancelBtn: () => $('#btn-cancel'),
  downloadBtn: () => $('#btn-download'),
  startOverBtn: () => $('#btn-start-over'),
  resultMessage: () => $('.result__message'),
};

// ── Step Transition ─────────────────────────────
function goToStep(stepName) {
  state.currentStep = stepName;
  els.steps().forEach((el) => {
    el.classList.toggle('active', el.dataset.step === stepName);
  });
}

// ── File Helpers ────────────────────────────────
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function validateFile(file) {
  if (!SUPPORTED_FORMATS.includes(file.type)) return 'Unsupported format';
  if (file.size > MAX_FILE_SIZE) return 'File too large (max 10MB)';
  return null;
}

function addFiles(fileArray) {
  for (const file of fileArray) {
    if (state.files.length >= MAX_FILE_COUNT) break;
    const error = validateFile(file);
    if (error) continue;
    if (state.files.some((f) => f.name === file.name)) continue;
    state.files.push(file);
  }
  renderFileList();
  updateUploadButton();
}

function removeFile(index) {
  state.files.splice(index, 1);
  renderFileList();
  updateUploadButton();
}

function renderFileList() {
  const container = els.fileList();
  if (!container) return;

  if (state.files.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = state.files
    .map(
      (file, i) => `
    <div class="file-item">
      <span class="file-item__name">${file.name}</span>
      <span class="file-item__size">${formatFileSize(file.size)}</span>
      <button class="file-item__remove" data-remove="${i}" aria-label="Remove file">&times;</button>
    </div>`
    )
    .join('');

  container.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFile(Number(btn.dataset.remove)));
  });
}

function updateUploadButton() {
  const btn = els.uploadBtn();
  if (!btn) return;
  btn.disabled = state.files.length === 0;
}

// ── Processing Simulation ───────────────────────
function startProcessing() {
  goToStep('processing');
  state.progress = 0;
  updateProgressUI();

  const totalDuration = 3000;
  const interval = 50;
  const increment = 100 / (totalDuration / interval);

  state.processingTimer = setInterval(() => {
    state.progress = Math.min(state.progress + increment, 100);
    updateProgressUI();

    if (state.progress >= 100) {
      clearInterval(state.processingTimer);
      state.processingTimer = null;
      setTimeout(() => showResult(), 400);
    }
  }, interval);
}

function updateProgressUI() {
  const pct = Math.round(state.progress);
  const label = els.progressLabel();
  const bar = els.progressBar();
  if (label) label.textContent = pct + '%';
  if (bar) bar.style.width = pct + '%';
}

function cancelProcessing() {
  if (state.processingTimer) {
    clearInterval(state.processingTimer);
    state.processingTimer = null;
  }
  state.progress = 0;
  goToStep('upload');
}

// ── Result ──────────────────────────────────────
function showResult() {
  const msg = els.resultMessage();
  if (msg) {
    msg.textContent = `${state.files.length} file${state.files.length > 1 ? 's' : ''} processed successfully`;
  }
  goToStep('result');
}

function startOver() {
  state.files = [];
  state.progress = 0;
  renderFileList();
  updateUploadButton();
  goToStep('upload');
}

function simulateDownload() {
  const btn = els.downloadBtn();
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = 'DOWNLOADING...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1500);
}

// ── Event Binding ───────────────────────────────
function init() {
  // Set initial step
  goToStep('upload');

  // Drop zone - click to open file picker
  const dropZone = els.dropZone();
  const fileInput = els.fileInput();

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      addFiles(Array.from(e.dataTransfer.files));
    });

    fileInput.addEventListener('change', (e) => {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    });
  }

  // Upload button
  const uploadBtn = els.uploadBtn();
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      if (state.files.length > 0) startProcessing();
    });
  }

  // Cancel button
  const cancelBtn = els.cancelBtn();
  if (cancelBtn) {
    cancelBtn.addEventListener('click', cancelProcessing);
  }

  // Download button
  const downloadBtn = els.downloadBtn();
  if (downloadBtn) {
    downloadBtn.addEventListener('click', simulateDownload);
  }

  // Start over button
  const startOverBtn = els.startOverBtn();
  if (startOverBtn) {
    startOverBtn.addEventListener('click', startOver);
  }
}

document.addEventListener('DOMContentLoaded', init);
