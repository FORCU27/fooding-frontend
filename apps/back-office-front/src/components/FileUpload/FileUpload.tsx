import React, { useCallback, useEffect, useState } from 'react';
import {
  Upload as UploadIcon,
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { Box, Typography, IconButton, Paper, Alert, Snackbar } from '@mui/material';

import { fileRepository, FileAccess, FileUploadProgress } from '@/repository/file-repository';

interface FileUploadProps {
  id: string;
  access?: FileAccess;
  onUploadComplete?: (files: FileUploadProgress[]) => void;
  onError?: (error: string) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  fileUrls?: string;
  onRemove?: (removedUrl: string) => void;
}

interface UploadedFile {
  url: string;
  isExisting: true;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  access = 'private',
  onUploadComplete,
  onError,
  accept = '*',
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024,
  fileUrls = '',
  onRemove,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileUploadProgress[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (fileUrls) {
      const urls = fileUrls.split(',').filter((url) => url.trim());
      setUploadedFiles(urls.map((url) => ({ url, isExisting: true })));
    } else {
      setUploadedFiles([]);
    }
  }, [fileUrls]);

  const totalFileCount = uploadedFiles.length;
  const isMaxFilesReached = totalFileCount >= maxFiles;

  const handleFiles = useCallback(
    async (newFiles: FileList | null) => {
      if (!newFiles) return;

      // maxFiles가 1일 경우, 기존 파일들을 모두 제거
      if (maxFiles === 1) {
        setFiles([]);
        if (uploadedFiles.length > 0) {
          uploadedFiles.forEach((file) => {
            onRemove?.(file.url);
          });
          setUploadedFiles([]);
        }
      } else if (totalFileCount + newFiles.length > maxFiles) {
        const error = `최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`;
        setErrorMessage(error);
        onError?.(error);
        return;
      }

      const filesToUpload = Array.from(newFiles).map((file) => ({
        file,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...filesToUpload]);

      const uploadPromises = filesToUpload.map(async ({ file }) => {
        try {
          if (file.size > maxSize) {
            throw new Error(`${file.name}의 크기가 제한을 초과했습니다.`);
          }

          const uploaded = await fileRepository.upload(file, access);

          setFiles((prev) =>
            prev.map((f) => (f.file === file ? { ...f, uploaded, progress: 100 } : f)),
          );

          return { file, progress: 100, uploaded };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '업로드 실패';
          setFiles((prev) =>
            prev.map((f) => (f.file === file ? { ...f, error: errorMessage } : f)),
          );
          setErrorMessage(errorMessage);
          onError?.(errorMessage);
          return { file, progress: 0, error: errorMessage };
        }
      });

      const results = await Promise.all(uploadPromises);
      onUploadComplete?.(results);
    },
    [access, totalFileCount, maxFiles, maxSize, onError, onUploadComplete, uploadedFiles, onRemove],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (isMaxFilesReached) {
        setErrorMessage(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      handleFiles(e.dataTransfer.files);
    },
    [handleFiles, isMaxFilesReached, maxFiles],
  );

  const handleInputClick = (e: React.MouseEvent) => {
    if (isMaxFilesReached) {
      e.preventDefault();
      e.stopPropagation();
      setErrorMessage(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    const fileInput = document.querySelector(
      `input[type="file"][data-upload="${id}"]`,
    ) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // 파일 선택 후 input value 초기화
    e.target.value = '';
  };

  const removeExistingFile = (urlToRemove: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.url !== urlToRemove));
    onRemove?.(urlToRemove);
  };

  const isImageUrl = (url: string) => {
    try {
      const extension = url.split('.').pop()?.toLowerCase();
      if (!extension) return false;
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
    } catch {
      return false;
    }
  };

  const getFileExtension = (url: string) => {
    try {
      return url.split('.').pop()?.toUpperCase() || 'FILE';
    } catch {
      return 'FILE';
    }
  };

  const getFileName = (url: string) => {
    try {
      const fileName = new URL(url).pathname.split('/').pop() || '파일';
      return decodeURIComponent(fileName);
    } catch {
      return '파일';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        variant='outlined'
        sx={{
          p: 3,
          position: 'relative',
          border: '2px dashed',
          borderColor: isMaxFilesReached ? 'grey.400' : dragActive ? 'primary.main' : 'grey.300',
          bgcolor: isMaxFilesReached ? 'grey.100' : dragActive ? 'primary.50' : 'background.paper',
          transition: 'all 200ms ease-in-out',
          cursor: isMaxFilesReached ? 'not-allowed' : 'pointer',
          opacity: isMaxFilesReached ? 0.7 : 1,
          '&:hover': {
            borderColor: isMaxFilesReached ? 'grey.400' : 'primary.main',
            bgcolor: isMaxFilesReached ? 'grey.100' : 'primary.50',
          },
        }}
        onDragEnter={!isMaxFilesReached ? handleDrag : undefined}
        onDragLeave={!isMaxFilesReached ? handleDrag : undefined}
        onDragOver={!isMaxFilesReached ? handleDrag : undefined}
        onDrop={!isMaxFilesReached ? handleDrop : undefined}
        onClick={handleInputClick}
      >
        <input
          type='file'
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleChange}
          data-upload={id}
          disabled={isMaxFilesReached}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0,
          }}
          aria-label='파일 선택'
        />

        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <UploadIcon
            sx={{
              fontSize: 48,
              color: isMaxFilesReached ? 'grey.400' : 'text.secondary',
              mb: 2,
            }}
          />
          <Typography
            variant='body1'
            color={isMaxFilesReached ? 'text.disabled' : 'text.secondary'}
          >
            {isMaxFilesReached
              ? `최대 파일 개수(${maxFiles}개)에 도달했습니다`
              : '파일을 드래그하여 업로드하거나 클릭하여 선택하세요'}
          </Typography>
          <Typography
            variant='caption'
            color={isMaxFilesReached ? 'text.disabled' : 'text.secondary'}
            sx={{ mt: 1, display: 'block' }}
          >
            최대 {maxFiles}개 파일, {(maxSize / 1024 / 1024).toFixed(0)}MB 이하
          </Typography>
        </Box>
      </Paper>

      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {uploadedFiles.map((file, index) => (
            <Paper
              key={`existing-${index}`}
              sx={{
                p: 2,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isImageUrl(file.url) ? (
                <Box
                  component='img'
                  src={file.url}
                  alt={getFileName(file.url)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    // 이미지 로드 실패 시 파일 아이콘으로 대체
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: 'grey.100',
                  display: isImageUrl(file.url) ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <FileIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant='caption' sx={{ fontSize: '0.6rem', mt: 0.5 }}>
                  {getFileExtension(file.url)}
                </Typography>
              </Box>
              <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
                <Typography variant='body2' noWrap>
                  {getFileName(file.url)}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {isImageUrl(file.url) ? '이미지' : '파일'}
                </Typography>
              </Box>
              <IconButton
                size='small'
                onClick={() => removeExistingFile(file.url)}
                aria-label='파일 제거'
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileUpload;
