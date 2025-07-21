import {
  DefaultButton,
  PageHeader,
  SnackBar,
  VanillaCategoryMultiSelector,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useSellerSignupStore, useUserSignupStore } from '@/store/authStore';
import PRODUCT_CATEGORIES from '@/constants/productCategories';
import {
  useRegisterSeller,
  useRegisterUser,
} from '@/services/auth/useRegisterUser';
import { SnsLinkProps } from '@/types/common/AuthTypes.types';

export const SignupInterestPage = () => {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const location = useLocation();
  const path = location.pathname.split('/');
  const userType = path[path.length - 2];

  const {
    id: sellerId,
    sns,
    email,
    setInterestedCategories: setSellerInterestedCategories,
    reset: sellerSignupStateReset,
  } = useSellerSignupStore();
  const {
    id: userId,
    setInterestedCategories: setUserInterestedCategories,
    reset: userSignupStateReset,
  } = useUserSignupStore();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    // userType에 따라 초기 아이디 값을 설정
    if (userType === 'influencer') {
      if (!sellerId) {
        navigate(`../${PATH.REGISTER.type.seller.id}`);
      } else if (!sns.instagram) {
        navigate(`../${PATH.REGISTER.type.seller.sns}`);
      }
    } else if (userType === 'user') {
      if (!userId) {
        navigate(`../${PATH.REGISTER.type.user.id}`);
      }
    }
  }, [userType]);

  const onSuccess = () => {
    userSignupStateReset();
    useUserSignupStore.persist.clearStorage();
    sellerSignupStateReset();
    useSellerSignupStore.persist.clearStorage();
    navigate(PATH.WELCOME.base);
  };

  const { mutate: registerSeller } = useRegisterSeller(() => onSuccess);
  const { mutate: registerUser } = useRegisterUser(() => onSuccess);

  const handleSellerRegister = () => {
    setSellerInterestedCategories(selectedCategories);
    const sns: SnsLinkProps & { email?: string } = {
      ...useSellerSignupStore.getState().sns,
      email: email,
    };

    const optionalSns = Object.fromEntries(
      Object.entries(sns).filter(([key, value]) => {
        if (key === 'instagram') return false;
        return value;
      })
    );

    registerSeller({
      userInfo: {
        username: sellerId,
        kakaoId: 31523, // 임시로 설정, 실제로는 카카오 로그인 후 받아와야 함
        intersetedCategories: selectedCategories,
      },
      instagram: sns.instagram,
      ...optionalSns,
    });
  };

  const handleUserRegister = () => {
    setUserInterestedCategories(selectedCategories);

    registerUser({
      username: userId,
      kakaoId: 31523, // 임시로 설정, 실제로는 카카오 로그인 후 받아와야 함
      intersetedCategories: selectedCategories,
    });
  };

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (selectedCategories.length === 0) {
      setIsSnackbarOpen(true);
      return;
    }

    // 백 연동
    if (userType === 'influencer') {
      handleSellerRegister();
    } else if (userType === 'user') {
      handleUserRegister();
    }
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col">
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
        <h1 className="headline2 text-black">
          관심있는 카테고리를 선택해 주세요.
        </h1>
        <VanillaCategoryMultiSelector
          selectedCategory={selectedCategories}
          setSelectedCategory={setSelectedCategories}
          categoryList={PRODUCT_CATEGORIES}
          theme="interest"
          max={999}
        />
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="다음"
          disabled={selectedCategories.length === 0}
          useDisabled={false}
          onClick={handleClickNext}
        />
      </div>

      {/* 스낵바 */}
      {isSnackbarOpen && (
        <SnackBar handleSnackBarClose={() => setIsSnackbarOpen(false)}>
          카테고리를 선택해 주세요.
        </SnackBar>
      )}
    </div>
  );
};

export default SignupInterestPage;
