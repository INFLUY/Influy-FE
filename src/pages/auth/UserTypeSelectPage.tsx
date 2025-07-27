import { DefaultButton, PageHeader, SnackBar } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import LoudSpeaker from '@/assets/icon/common/LoudSpeaker.svg?react';
import ShoppingCart from '@/assets/icon/common/ShoppingCart.svg?react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectUserButtonType, UserType } from '@/types/common/AuthTypes.types';
import cn from '@/utils/cn';
import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';

export const UserTypeSelectPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) navigate(PATH.HOME.BASE, { replace: true });
  }, []);

  const userType: SelectUserButtonType[] = [
    {
      type: 'influencer',
      title: '인플루언서',
      description: `나의 상품을\n소개하고 싶어요`,
      icon: <LoudSpeaker className="w-6" />,
    },
    {
      type: 'user',
      title: '일반 유저',
      description: `상품 구매와\n구경이 목적이에요`,
      icon: <ShoppingCart className="w-6" />,
    },
  ];

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const handleClickNext = () => {
    if (!selectedType) {
      setIsSnackbarOpen(true);
    } else {
      if (selectedType === 'influencer') {
        navigate(
          `${PATH.REGISTER.BASE}/${PATH.REGISTER.TYPE.SELLER.BASE}/${PATH.REGISTER.TYPE.SELLER.ID}`
        );
      } else {
        navigate(
          `${PATH.REGISTER.BASE}/${PATH.REGISTER.TYPE.USER.BASE}/${PATH.REGISTER.TYPE.USER.ID}`
        );
      }
    }
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
        rightIcons={[
          <XIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate('')}
          />,
        ]}
      >
        회원가입
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-11 px-5 py-[3.25rem]">
        <h1 className="headline2 text-black">사용자 유형을 선택해 주세요.</h1>
        <p className="flex gap-[.9375rem]">
          {userType.map((item) => (
            <button
              key={item.type}
              type="button"
              className={cn(
                'border-grey03 flex h-[10.9375rem] w-40 shrink-0 cursor-pointer flex-col items-start justify-between gap-2.5 rounded-sm border border-solid bg-white p-5 text-start',
                { 'bg-black text-white': selectedType === item.type }
              )}
              onClick={() => setSelectedType(item.type)}
            >
              <span className="flex items-center gap-2">
                <span className="subhead-sb">{item.title}</span>
                {item.icon}
              </span>
              <span className="whitespace-pre">{item.description}</span>
            </button>
          ))}
        </p>
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="다음"
          disabled={!selectedType}
          useDisabled={false}
          onClick={handleClickNext}
        />
      </div>

      {/* 스낵바 */}
      {isSnackbarOpen && (
        <SnackBar handleSnackBarClose={() => setIsSnackbarOpen(false)}>
          사용자 유형을 선택해 주세요.
        </SnackBar>
      )}
    </div>
  );
};

export default UserTypeSelectPage;
