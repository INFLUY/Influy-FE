import {
  AccoutSettingsMenuButton,
  LoadingSpinner,
  PageHeader,
  ToggleButton,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/store/snackbarStore';
import { usePutSellerPublic } from '@/services/seller/mutation/usePutSellerPublic';
import { useGetMarket } from '@/services/seller/query/useGetMarket';
import { useStrictId } from '@/hooks/auth/useStrictId';

const SellerAccountSettingsPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { sellerId } = useStrictId();

  const { data: sellerMyProfile, isLoading } = useGetMarket({
    sellerId: sellerId!,
  });

  const { mutate: putSellerPublic } = usePutSellerPublic((response) => {
    if (response.isPublic) {
      showSnackbar('계정이 공개로 전환되었습니다.');
    } else {
      showSnackbar('계정이 비공개로 전환되었습니다.');
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  const isPublic = sellerMyProfile?.isPublic;

  const handlePublicProfileClick = () => {
    putSellerPublic({ status: !isPublic });
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
        알림 설정
      </PageHeader>
      <section className="flex flex-1 flex-col pt-[.5625rem]">
        <AccoutSettingsMenuButton
          title="아이디 변경"
          subText={sellerMyProfile?.sellerProfile.username}
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.ID);
          }}
        />

        <article className="flex h-[5.1875rem] items-center justify-between px-5">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1">
              <p className="body1-m text-grey10">프로필 비공개 전환</p>
              <span className="text-grey07 body2-m">
                {!isPublic
                  ? '현재 계정이 비공개 상태입니다.'
                  : '비공개 전환 시, 셀러 본인만 접근 가능합니다.'}
              </span>
            </div>
            <ToggleButton
              name="프로필 비공개 전환"
              isChecked={!isPublic}
              setIsChecked={handlePublicProfileClick}
            />
          </div>
        </article>

        <AccoutSettingsMenuButton
          title="회원 탈퇴"
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.DELETE);
          }}
        />
      </section>
    </div>
  );
};

export default SellerAccountSettingsPage;
