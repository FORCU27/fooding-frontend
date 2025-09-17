'use client';

import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  AdminCouponResponse,
  AdminUpdateCouponRequest,
  BenefitType,
  CouponStatus,
  CouponType,
  DiscountType,
  ProvideType,
} from '@repo/api/admin';

import {
  BENEFIT_TYPE_OPTIONS,
  COUPON_STATUS_OPTIONS,
  COUPON_TYPE_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  PROVIDE_TYPE_OPTIONS,
} from './options';

type FormFieldErrors = Partial<Record<keyof FormState, string>>;

type FormState = {
  storeId: string;
  benefitType: BenefitType;
  type: CouponType;
  discountType: DiscountType;
  provideType: ProvideType;
  name: string;
  conditions: string;
  totalQuantity: string;
  discountValue: string;
  issueStartOn: string;
  issueEndOn: string;
  expiredOn: string;
  status: CouponStatus;
};

type SelectField = 'benefitType' | 'type' | 'discountType' | 'provideType' | 'status';

const INITIAL_FORM: FormState = {
  storeId: '',
  benefitType: 'DISCOUNT',
  type: 'GENERAL',
  discountType: 'FIXED',
  provideType: 'ALL',
  name: '',
  conditions: '',
  totalQuantity: '',
  discountValue: '',
  issueStartOn: '',
  issueEndOn: '',
  expiredOn: '',
  status: 'ACTIVE',
};

interface EditCouponDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateCouponRequest) => void;
  loading?: boolean;
  initialData?: AdminCouponResponse | null;
  fixedStoreId?: number;
}

export function EditCouponDialog({ open, onClose, onSubmit, loading, initialData, fixedStoreId }: EditCouponDialogProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormFieldErrors>({});

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        storeId: fixedStoreId ? String(fixedStoreId) : initialData.storeId ? String(initialData.storeId) : '',
        benefitType: initialData.benefitType,
        type: initialData.type,
        discountType: initialData.discountType,
        provideType: initialData.provideType,
        name: initialData.name,
        conditions: initialData.conditions ?? '',
        totalQuantity: initialData.totalQuantity !== null ? String(initialData.totalQuantity) : '',
        discountValue: String(initialData.discountValue),
        issueStartOn: initialData.issueStartOn ?? '',
        issueEndOn: initialData.issueEndOn ?? '',
        expiredOn: initialData.expiredOn ?? '',
        status: initialData.status,
      });
      setErrors({});
    }
  }, [initialData, fixedStoreId, open]);

  const handleFieldChange = <T extends keyof FormState>(field: T, value: FormState[T]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: SelectField) =>
    (event: SelectChangeEvent) => {
      handleFieldChange(field, event.target.value as FormState[SelectField]);
    };

  useEffect(() => {
    if (open && fixedStoreId && !initialData) {
      setFormData((prev) => ({ ...prev, storeId: String(fixedStoreId) }));
    }
  }, [open, fixedStoreId, initialData]);

  const validate = (state: FormState) => {
    const nextErrors: FormFieldErrors = {};

    if (!fixedStoreId && state.storeId.trim().length > 0) {
      const parsed = Number(state.storeId.trim());
      if (Number.isNaN(parsed) || parsed <= 0) {
        nextErrors.storeId = '숫자만 입력해 주세요';
      }
    }

    if (!state.name.trim()) {
      nextErrors.name = '쿠폰명은 필수입니다';
    }

    if (state.totalQuantity.trim().length > 0) {
      const parsed = Number(state.totalQuantity.trim());
      if (Number.isNaN(parsed) || parsed < 0) {
        nextErrors.totalQuantity = '0 이상의 숫자를 입력해 주세요';
      }
    }

    const discountValue = Number(state.discountValue.trim());
    if (state.discountValue.trim().length === 0 || Number.isNaN(discountValue) || discountValue <= 0) {
      nextErrors.discountValue = '할인값은 0보다 커야 합니다';
    } else if (state.discountType === 'PERCENT' && discountValue > 100) {
      nextErrors.discountValue = '퍼센트 할인은 100 이하만 가능합니다';
    }

    if (!state.issueStartOn) {
      nextErrors.issueStartOn = '발급 시작일은 필수입니다';
    }

    if (state.issueEndOn && state.issueStartOn && state.issueEndOn < state.issueStartOn) {
      nextErrors.issueEndOn = '발급 마감일은 시작일 이후여야 합니다';
    }

    if (state.expiredOn) {
      if (state.issueEndOn && state.expiredOn < state.issueEndOn) {
        nextErrors.expiredOn = '사용 기한은 발급 마감일 이후여야 합니다';
      }
      if (!nextErrors.expiredOn && state.issueStartOn && state.expiredOn < state.issueStartOn) {
        nextErrors.expiredOn = '사용 기한은 발급 시작일 이후여야 합니다';
      }
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const buildPayload = (state: FormState): AdminUpdateCouponRequest => {
    const storeId = fixedStoreId ?? (state.storeId.trim().length > 0 ? Number(state.storeId.trim()) : null);
    const totalQuantity = state.totalQuantity.trim().length > 0 ? Number(state.totalQuantity.trim()) : null;

    return {
      storeId,
      benefitType: state.benefitType,
      type: state.type,
      discountType: state.discountType,
      provideType: state.provideType,
      name: state.name.trim(),
      conditions: state.conditions.trim() || undefined,
      totalQuantity,
      discountValue: Number(state.discountValue.trim()),
      issueStartOn: state.issueStartOn,
      issueEndOn: state.issueEndOn || null,
      expiredOn: state.expiredOn || null,
      status: state.status,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(formData);

    if (Object.keys(validation).length === 0) {
      onSubmit(buildPayload(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>쿠폰 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            {!fixedStoreId ? (
              <TextField
                label='가게 ID'
                value={formData.storeId}
                onChange={(e) => handleFieldChange('storeId', e.target.value)}
                error={Boolean(errors.storeId)}
                helperText={errors.storeId || '비워두면 전체 적용'}
                fullWidth
              />
            ) : (
              <TextField label='가게 ID' value={String(fixedStoreId)} fullWidth disabled />
            )}

            <TextField
              label='쿠폰명'
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
              required
              fullWidth
            />

            <TextField
              label='사용 조건'
              value={formData.conditions}
              onChange={(e) => handleFieldChange('conditions', e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>혜택 타입</InputLabel>
                <Select
                  label='혜택 타입'
                  value={formData.benefitType}
                  onChange={handleSelectChange('benefitType')}
                >
                  {BENEFIT_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>쿠폰 타입</InputLabel>
                <Select
                  label='쿠폰 타입'
                  value={formData.type}
                  onChange={handleSelectChange('type')}
                >
                  {COUPON_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>할인 타입</InputLabel>
                <Select
                  label='할인 타입'
                  value={formData.discountType}
                  onChange={handleSelectChange('discountType')}
                >
                  {DISCOUNT_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>제공 대상</InputLabel>
                <Select
                  label='제공 대상'
                  value={formData.provideType}
                  onChange={handleSelectChange('provideType')}
                >
                  {PROVIDE_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              <TextField
                label={formData.discountType === 'PERCENT' ? '할인율 (%)' : '할인 금액'}
                value={formData.discountValue}
                onChange={(e) => handleFieldChange('discountValue', e.target.value)}
                error={Boolean(errors.discountValue)}
                helperText={errors.discountValue}
                required
                fullWidth
              />

              <TextField
                label='총 발급 수량'
                value={formData.totalQuantity}
                onChange={(e) => handleFieldChange('totalQuantity', e.target.value)}
                error={Boolean(errors.totalQuantity)}
                helperText={errors.totalQuantity || '미입력 시 제한 없음'}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <TextField
                label='발급 시작일'
                type='date'
                value={formData.issueStartOn}
                onChange={(e) => handleFieldChange('issueStartOn', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.issueStartOn)}
                helperText={errors.issueStartOn}
                required
              />

              <TextField
                label='발급 마감일'
                type='date'
                value={formData.issueEndOn}
                onChange={(e) => handleFieldChange('issueEndOn', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.issueEndOn)}
                helperText={errors.issueEndOn}
              />

              <TextField
                label='사용 기한'
                type='date'
                value={formData.expiredOn}
                onChange={(e) => handleFieldChange('expiredOn', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.expiredOn)}
                helperText={errors.expiredOn}
                required={false}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel>상태</InputLabel>
              <Select
                label='상태'
                value={formData.status}
                onChange={handleSelectChange('status')}
              >
                {COUPON_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            취소
          </Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
