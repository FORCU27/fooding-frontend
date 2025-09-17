'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { AdminBannerUpdateRequest, adminFileApi } from '@repo/api/admin';

interface Banner {
  id: string;
  name: string;
  description: string;
  active: boolean;
  priority: number;
  link?: string | null;
  linkType: 'INTERNAL' | 'EXTERNAL';
  imageUrl?: string | null;
  service?: string | null;
  placement?: string | null;
  parameters?: Record<string, unknown> | null;
}

interface EditBannerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminBannerUpdateRequest) => void;
  loading?: boolean;
  initialData?: Banner;
}

type FormState = {
  name: string;
  description: string;
  active: boolean;
  priority: number;
  link: string;
  linkType: 'INTERNAL' | 'EXTERNAL';
  service: string;
  placement: string;
  parametersJson: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: '',
  description: '',
  active: true,
  priority: 0,
  link: '',
  linkType: 'INTERNAL',
  service: '',
  placement: '',
  parametersJson: '',
};

export function EditBannerDialog({ open, onClose, onSubmit, loading = false, initialData }: EditBannerDialogProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageId, setImageId] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [parametersError, setParametersError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialImageUrl = useMemo(() => initialData?.imageUrl ?? '', [initialData?.imageUrl]);

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
        priority: initialData.priority,
        link: initialData.link ?? '',
        linkType: initialData.linkType,
        service: initialData.service ?? '',
        placement: initialData.placement ?? '',
        parametersJson: initialData.parameters
          ? JSON.stringify(initialData.parameters, null, 2)
          : '',
      });
      setErrors({});
      setImageId('');
      setImagePreview(initialData.imageUrl ?? '');
      setUploadError('');
      setParametersError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }

    if (!open) {
      setErrors({});
      setUploadError('');
      setParametersError('');
    }
  }, [initialData, open]);

  const resetAndClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setImageId('');
    setImagePreview('');
    setUploadError('');
    setParametersError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const validate = (state: FormState) => {
    const nextErrors: FormErrors = {};

    if (!state.name.trim()) {
      nextErrors.name = '이름은 필수입니다';
    }

    if (!state.description.trim()) {
      nextErrors.description = '설명은 필수입니다';
    }

    if (Number.isNaN(state.priority) || state.priority < 0) {
      nextErrors.priority = '우선순위는 0 이상이어야 합니다';
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      return;
    }

    let parsedParameters: Record<string, unknown> | undefined;
    if (formData.parametersJson.trim()) {
      try {
        parsedParameters = JSON.parse(formData.parametersJson.trim());
        setParametersError('');
      } catch {
        setParametersError('유효한 JSON 형식이 아닙니다.');
        return;
      }
    } else {
      setParametersError('');
    }

    const restForm = { ...formData };
    delete (restForm as { parametersJson?: string }).parametersJson;

    onSubmit({
      ...restForm,
      service: restForm.service.trim() || undefined,
      placement: restForm.placement.trim() || undefined,
      parameters: parsedParameters,
      imageId: imageId || undefined,
      link: restForm.link.trim() || undefined,
    });
    resetAndClose();
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setFormData((prev) => ({ ...prev, priority: Number.isNaN(value) ? 0 : value }));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('files', file);
      const response = await adminFileApi.upload(form);
      const uploaded = response.data?.[0];
      if (uploaded?.id) {
        setImageId(uploaded.id);
        if (uploaded.url) {
          setImagePreview(uploaded.url);
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview((e.target?.result as string) ?? '');
          };
          reader.readAsDataURL(file);
        }
      } else {
        setUploadError('파일 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      setUploadError('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setImageId('');
    setImagePreview(initialImageUrl);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>배너 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="이름"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              required
            />

            <TextField
              label="설명"
              value={formData.description}
              onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
              error={Boolean(errors.description)}
              helperText={errors.description}
              fullWidth
              multiline
              rows={3}
              required
            />

            <TextField
              label="우선순위"
              type="number"
              value={formData.priority}
              onChange={handleNumberChange}
              error={Boolean(errors.priority)}
              helperText={errors.priority}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel id="edit-banner-link-type">링크 타입</InputLabel>
              <Select
                labelId="edit-banner-link-type"
                value={formData.linkType}
                label="링크 타입"
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, linkType: event.target.value as 'INTERNAL' | 'EXTERNAL' }))
                }
              >
                <MenuItem value="INTERNAL">내부</MenuItem>
                <MenuItem value="EXTERNAL">외부</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="링크"
              value={formData.link}
              onChange={(event) => setFormData((prev) => ({ ...prev, link: event.target.value }))}
              fullWidth
              placeholder={formData.linkType === 'EXTERNAL' ? 'https://example.com' : '/path'}
            />

            <FormControl fullWidth>
              <InputLabel id="edit-banner-service">서비스</InputLabel>
              <Select
                labelId="edit-banner-service"
                value={formData.service}
                label="서비스"
                onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
              >
                <MenuItem value=''>전체</MenuItem>
                <MenuItem value='USER'>USER</MenuItem>
                <MenuItem value='CEO'>CEO</MenuItem>
                <MenuItem value='APP'>APP</MenuItem>
                <MenuItem value='POS'>POS</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="노출 위치"
              value={formData.placement}
              onChange={(event) => setFormData((prev) => ({ ...prev, placement: event.target.value }))}
              fullWidth
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(event) => setFormData((prev) => ({ ...prev, active: event.target.checked }))}
                />
              }
              label="활성화"
            />

            <Box>
              <TextField
                label="추가 파라미터(JSON)"
                value={formData.parametersJson}
                onChange={(event) => setFormData((prev) => ({ ...prev, parametersJson: event.target.value }))}
                fullWidth
                multiline
                minRows={3}
              />
              {parametersError && (
                <Typography variant="caption" color="error" display="block">
                  {parametersError}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                배너 이미지
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
                {imagePreview ? (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="배너 미리보기"
                    sx={{
                      width: 200,
                      height: 112,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 200,
                      height: 112,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      color: 'text.secondary',
                      fontSize: 12,
                    }}
                  >
                    미리보기 없음
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                  <Button variant="outlined" onClick={handleFileButtonClick} disabled={uploading || loading}>
                    {uploading ? '업로드 중...' : '이미지 업로드'}
                  </Button>
                  {imageId && (
                    <Button color="inherit" onClick={handleRemoveImage} disabled={uploading || loading}>
                      취소
                    </Button>
                  )}
                </Box>
              </Box>
              {uploadError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {uploadError}
                </Alert>
              )}
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                새 이미지를 업로드하면 기존 이미지가 교체됩니다. (권장 비율 16:9)
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetAndClose} disabled={loading}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={loading || uploading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
