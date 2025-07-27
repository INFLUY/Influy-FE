import ModalPortal from '@/components/common/ModalPortal';
import { useEffect } from 'react';
import { ModalButton } from '@/components/seller/common/Button';
import { useModalStore } from '@/store/useModalStore';

const GlobalModal = () => {
  const { isOpen, config, hideModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !config) return null;

  const handleOnClose = () => {
    if (config.onClose) {
      config.onClose();
    } else {
      hideModal();
    }
  };

  const handleRightModalButtonClick = () => {
    config.rightButtonClick();
    handleOnClose();
  };

  return (
    <ModalPortal>
      <div className="modal">
        <div className="modal-bg-layout" onClick={handleOnClose}>
          <div
            className="flex h-fit w-fit flex-col gap-7 rounded-[.1875rem] bg-white px-4 pt-[2.125rem] pb-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 break-words whitespace-break-spaces">
              <p className="body1-b break-words whitespace-break-spaces">
                {config.text}
              </p>
              {config.description && (
                <p className="body2-m text-grey08">{config.description}</p>
              )}
            </div>
            <div className="flex gap-[.875rem]">
              <ModalButton
                onClick={config.leftButtonClick || hideModal}
                text={config.leftButtonText || '취소'}
                theme="white"
              />
              <ModalButton
                onClick={handleRightModalButtonClick}
                theme="black"
                text={config.rightButtonText || '확인'}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default GlobalModal;
