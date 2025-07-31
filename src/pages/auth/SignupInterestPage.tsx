import {
  CloseComponent,
  DefaultButton,
  PageHeader,
  VanillaCategoryMultiSelector,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/store/snackbarStore';
import {
  useRegisterSeller,
  useRegisterUser,
} from '@/services/auth/mutation/useRegisterUser';
import { SnsLinkProps } from '@/types/common/AuthTypes.types';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
import {
  useKakaoStore,
  useSellerSignupStore,
  useUserSignupStore,
} from '@/store/registerStore';

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
    interestedCategories: sellerInterestedCategories,
    setInterestedCategories: setSellerInterestedCategories,
  } = useSellerSignupStore();
  const {
    id: userId,
    interestedCategories: userInterestedCategories,
    setInterestedCategories: setUserInterestedCategories,
  } = useUserSignupStore();
  const { kakaoId } = useKakaoStore();

  const itemCategory = useGetItemCategory();

  useEffect(() => {
    if (!kakaoId) {
      navigate(`${PATH.LOGIN.BASE}`, { replace: true });
      return;
    }
    if (userType === 'influencer') {
      if (!sellerId) {
        navigate(`../${PATH.REGISTER.TYPE.SELLER.ID}`);
      } else if (!sns.instagram) {
        navigate(`../${PATH.REGISTER.TYPE.SELLER.SNS}`);
      }
      setSelectedCategories(sellerInterestedCategories);
      return;
    } else if (userType === 'user') {
      if (!userId) {
        navigate(`../${PATH.REGISTER.TYPE.USER.ID}`);
      }
      setSelectedCategories(userInterestedCategories);
      return;
    }
  }, [userType]);

  useEffect(() => {
    if (userType === 'influencer') {
      setSellerInterestedCategories(selectedCategories);
    } else if (userType === 'user') {
      setUserInterestedCategories(selectedCategories);
    }
  }, [selectedCategories]);

  const { mutate: registerSeller } = useRegisterSeller();
  const { mutate: registerUser } = useRegisterUser();

  const handleSellerRegister = () => {
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
        kakaoId: kakaoId!!,
        interestedCategories: selectedCategories,
      },
      instagram: sns.instagram,
      ...optionalSns,
    });
  };

  const handleUserRegister = () => {
    registerUser({
      username: userId,
      kakaoId: kakaoId!!,
      interestedCategories: selectedCategories,
    });
  };

  const { showSnackbar } = useSnackbarStore();

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (selectedCategories.length === 0) {
      showSnackbar('카테고리를 선택해 주세요.');
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
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
        rightIcons={[<CloseComponent />]}
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
          categoryList={itemCategory?.categoryDtoList || []}
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
    </div>
  );
};

export default SignupInterestPage;
