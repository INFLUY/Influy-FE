import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { DefaultButton } from '@/components';
import LoginBg from '@/assets/image/LoginBgImg.svg';
import { useEffect } from 'react';
import {
  useAuthStore,
  useSellerSignupStore,
  useUserSignupStore,
} from '@/store/authStore';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { sellerId, setKakaoId } = useAuthStore();
  const { reset: sellerSignupStateReset } = useSellerSignupStore();
  const { reset: userSignupStateReset } = useUserSignupStore();

  useEffect(() => {
    userSignupStateReset();
    useUserSignupStore.persist.clearStorage();
    sellerSignupStateReset();
    useSellerSignupStore.persist.clearStorage();
    setKakaoId(null);
  }, []);

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (sellerId !== null) {
      navigate(`${PATH.SELLER.BASE}/${PATH.SELLER.HOME.BASE}`, {
        replace: true,
      });
    } else {
      navigate(PATH.HOME.BASE, { replace: true });
    }
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      <section className="z-20 flex h-full w-full flex-1 px-5 py-[6rem]">
        <h1 className="headline2 whitespace-pre text-white">
          {`인플루이에 오신 것을\n환영합니다!`}
        </h1>
      </section>
      <div className="fixed bottom-[2.3125rem] z-20 flex w-full px-5">
        <DefaultButton
          type="button"
          text="지금 바로 둘러보기"
          onClick={handleClickNext}
        />
      </div>
      <div className="absolute inset-0 flex">
        <div className="absolute z-[5] h-full w-full bg-[#000000] opacity-50" />
        <img src={LoginBg} className="object-cover" alt="" />
      </div>
    </div>
  );
};

export default WelcomePage;
