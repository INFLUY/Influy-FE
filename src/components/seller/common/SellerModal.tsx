import ModalPortal from '@/components/common/ModalPortal';
import { SellerModalProps } from '@/types/seller/SellerModalProps.types';
import { useEffect } from 'react';
import { ModalButton } from './Button';

const SellerModal = ({
  text,
  description,
  leftButtonText = '취소',
  leftButtonClick = () => setIsModalOpen(false),
  rightButtonText = '확인',
  rightButtonClick,
  onClose,
  setIsModalOpen,
}: SellerModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <ModalPortal>
      <div className="modal">
        <div className="modal-bg-layout" onClick={handleOnClose}>
          <div
            className="flex h-fit w-[17.9375rem] flex-col gap-7 rounded-[.1875rem] bg-white px-4 pt-[2.125rem] pb-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 break-words whitespace-break-spaces">
              <h1 className="body1-b break-words whitespace-break-spaces">
                {text}
              </h1>
              {description && (
                <p className="body2-m text-grey08">{description}</p>
              )}
            </div>
            <div className="flex gap-[.875rem]">
              <ModalButton
                onClick={leftButtonClick}
                text={leftButtonText}
                theme="white"
              />
              <ModalButton
                onClick={rightButtonClick}
                theme="black"
                text={rightButtonText}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SellerModal;
