import { DefaultButton, LoadingSpinner, PageHeader } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useModalStore } from '@/store/useModalStore';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useDeleteAccount } from '@/services/auth/mutation/useDeleteAccount';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetMarket } from '@/services/seller/query/useGetMarket';
import { usePutSellerPublic } from '@/services/seller/mutation/usePutSellerPublic';

const SellerDeleteAccountPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSeller = pathname.includes(PATH.SELLER.BASE);
  const { showModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { sellerId } = useStrictId();

  const { mutate: deleteAccount } = useDeleteAccount(() => {
    navigate(PATH.HOME.BASE);
  });

  const { data: sellerMyProfile, isLoading } = useGetMarket({
    sellerId: sellerId!,
  });

  const { mutate: putSellerPublic } = usePutSellerPublic((response) => {
    if (!response.isPublic) {
      showSnackbar('계정이 비공개로 전환되었습니다.');
    }
  });

  const handlePublicProfileClick = () => {
    if (sellerMyProfile?.isPublic) {
      putSellerPublic({ status: false });
    } else {
      showSnackbar('이미 비공개처리 되어있습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleDeleteAccountClick = () => {
    showModal({
      text: `계정 탈퇴하시겠습니까?\n회원님의 모든 정보와 상품이 삭제되며\n되돌릴 수 없습니다.`,
      leftButtonText: '취소',
      rightButtonText: '탈퇴',
      rightButtonClick: () => {
        deleteAccount();
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
      >
        회원 탈퇴
      </PageHeader>
      <section className="flex flex-1 flex-col gap-14 px-5 py-[3.125rem]">
        {isSeller && (
          <article className="flex flex-col gap-6">
            <div className="flex flex-col gap-[.5625rem] text-black">
              <h1 className="subhead-sb">
                프로필을 비공개로 전환할 수 있어요.
              </h1>
              <p className="caption-m">
                프로필 공개 설정을 변경해 보세요. 비공개된 프로필은 일반 유저가
                볼 수 없습니다. 언제든 공개로 전환할 수 있습니다.
              </p>
            </div>
            <DefaultButton
              text="프로필 비공개하기"
              onClick={handlePublicProfileClick}
            />
          </article>
        )}

        <article className="flex flex-col gap-6">
          <div className="flex flex-col gap-[.5625rem] text-black">
            <h1 className="subhead-sb">정말 탈퇴하시겠습니까?</h1>
            <p className="caption-m">
              탈퇴하면 현재 모든 정보가 삭제돼요. 다시 가입해도 삭제된 정보는
              복구할 수 없어요.
            </p>
          </div>
          <DefaultButton
            activeTheme="grey"
            text="탈퇴하기"
            onClick={handleDeleteAccountClick}
          />
        </article>
      </section>
    </div>
  );
};

export default SellerDeleteAccountPage;
