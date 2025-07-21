import { DefaultButton, PageHeader, SnackBar } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import EmailIcon from '@/assets/icon/common/sns/EmailIcon.svg?react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TextInput } from '@/components/common/DetailInput';
import { useSellerSignupStore } from '@/store/authStore';
import { emailSchema } from '@/schemas/profileSchema';

export const SignupEmailPage = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState<string>('');

  const { id: sellerId, sns, email, setEmail } = useSellerSignupStore();
  const [isDirty, setIsDirty] = useState(false); // 입력값이 한번이라도 바뀌었는지

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  useEffect(() => {
    if (!sellerId) {
      navigate(`../${PATH.REGISTER.type.seller.id}`);
    } else if (!sns.instagram) {
      navigate(`../${PATH.REGISTER.type.seller.sns}`);
    } else {
      setEmailValue(email);
    }
  }, []);

  const handleChangeEmail = (value: string) => {
    if (!isDirty) setIsDirty(true);
    setEmailValue(value);
  };

  // 건너뛰기 버튼 클릭 핸들러
  const handleClickSkip = () => {
    setEmail('');
    navigate(
      `${PATH.REGISTER.base}/${PATH.REGISTER.type.seller.base}/${PATH.REGISTER.type.seller.interest}`
    );
  };

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (!isDirty) setIsDirty(true);
    const result = emailSchema.safeParse(emailValue);
    if (!result.success) {
      const message = result.error.issues.map((err) => err.message);
      setSnackbar({
        open: true,
        message: message[0],
      });
    } else {
      setEmail(emailValue);
      navigate(
        `${PATH.REGISTER.base}/${PATH.REGISTER.type.seller.base}/${PATH.REGISTER.type.seller.interest}`
      );
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
        <div className="flex w-full flex-col gap-2">
          <h1 className="headline2 text-black">이메일을 입력해 주세요.</h1>
          <p className="body1-m text-grey08 flex gap-[.9375rem] break-keep whitespace-break-spaces">
            {`셀러 프로필의 이메일 아이콘에 등록됩니다.\n비즈니스 문의를 받고 싶은 이메일을\n등록해주세요.`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="body2-sb text-grey10 flex items-center gap-2">
            <EmailIcon className="h-6 w-6" />
            <span>이메일</span>
          </div>
          <TextInput
            text={emailValue}
            setText={handleChangeEmail}
            isValid={!isDirty || emailSchema.safeParse(emailValue).success}
            placeHolderContent="이메일 주소를 입력해 주세요."
          />
        </div>
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="건너뛰기"
          activeTheme="white"
          onClick={handleClickSkip}
        />
        <DefaultButton
          type="button"
          text="다음"
          disabled={!emailValue}
          useDisabled={false}
          onClick={handleClickNext}
        />
      </div>

      {/* 스낵바 */}
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
    </div>
  );
};

export default SignupEmailPage;
