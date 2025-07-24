import {
  DefaultButton,
  PageHeader,
  SnackBar,
  VanillaCategoryMultiSelector,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useSellerSignupStore, useUserSignupStore } from '@/store/authStore';
import PRODUCT_CATEGORIES from '@/constants/productCategories';

export const SignupInterestPage = () => {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { reset: sellerSignupStateReset } = useSellerSignupStore();
  const {
    id: userId,
    setInterestedCategories,
    reset: userSignupStateReset,
  } = useUserSignupStore();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      navigate(`../${PATH.REGISTER.TYPE.USER.ID}`);
    }
  }, []);

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (selectedCategories.length === 0) {
      setIsSnackbarOpen(true);
      return;
    }

    setInterestedCategories(selectedCategories);

    // 백 연동

    userSignupStateReset();
    useUserSignupStore.persist.clearStorage();
    sellerSignupStateReset();
    useSellerSignupStore.persist.clearStorage();
    navigate(PATH.WELCOME.BASE);
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
