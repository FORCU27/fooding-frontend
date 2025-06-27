import ConfirmModal from '@/components/Modal/ConfirmModal';

interface CouponUseModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CouponUseModal = ({ open, onConfirm, onClose }: CouponUseModalProps) => {
  return (
    <ConfirmModal
      open={open}
      title='쿠폰'
      confirmLabel='사용하기'
      cancelLabel='취소'
      onConfirm={onConfirm}
      onCancel={onClose}
      onClose={onClose}
    >
      <p className='body-2 text-gray-4 pt-[40px] pb-[60px]'>
        사용하시면
        <br />
        카카오톡으로 인증 메시지가 전달됩니다.
      </p>
    </ConfirmModal>
  );
};

export default CouponUseModal;
