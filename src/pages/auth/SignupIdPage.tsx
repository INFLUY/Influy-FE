import { CloseComponent, DefaultButton, PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { IdInput } from '@/components/common/DetailInput';
import { idSchema } from '@/schemas/profileSchema';
import { useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useCheckIdDuplicate } from '@/services/auth/useCheckIdDuplicationCheck';
import { useSnackbarStore } from '@/store/snackbarStore';
import {
  useKakaoStore,
  useSellerSignupStore,
  useUserSignupStore,
} from '@/store/registerStore';

export const SignupIdPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const userType = path[path.length - 2];

  const [id, setId] = useState<string>('');

  const { id: sellerId, setId: setSellerId } = useSellerSignupStore();
  const { id: userId, setId: setUserId } = useUserSignupStore();

  const { kakaoId } = useKakaoStore();

  useEffect(() => {
    if (!kakaoId) {
      navigate(`${PATH.LOGIN.BASE}`, { replace: true });
      return;
    }
    // userType에 따라 초기 아이디 값을 설정
    if (userType === 'influencer') {
      setId(sellerId);
    } else if (userType === 'user') {
      setId(userId);
    }
  }, [userType]);

  const [isDirty, setIsDirty] = useState(false); // 입력값이 한번이라도 바뀌었는지

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorText, setErrorText] = useState<string>('');
  const [validText, setValidText] = useState<string>('');
  const { showSnackbar } = useSnackbarStore();

  const isIdValid = () => {
    if (id.length === 0) return false;

    // 유효성 검사
    const result = idSchema.safeParse(id);
    return result.success;
  };

  useEffect(() => {
    if (!isDirty) return;
    const result = idSchema.safeParse(id);
    // 유효성 검사 실패했을 때
    if (!result.success) {
      const message = result.error.issues.map((err) => err.message);
      setErrorText(message[0]);
    } else {
      // 오류 없을 때
      setErrorText('');
    }
    setValidText('');
  }, [id, isDirty]);

  // 아이디 입력 핸들러
  const handleChangeId = (text: string) => {
    if (!isDirty) setIsDirty(true);
    setId(text);
  };

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    setIsDirty(true);
    if (!isIdValid) {
      showSnackbar(errorText || '아이디를 입력해 주세요.');
      inputRef.current?.focus();
    } else {
      if (userType === 'influencer') {
        setSellerId(id);
        navigate(`../${PATH.REGISTER.TYPE.SELLER.SNS}`);
      } else if (userType === 'user') {
        setUserId(id);
        navigate(`../${PATH.REGISTER.TYPE.USER.INTEREST}`);
      }
    }
  };

  const debouncedId = useDebounce(id, 300);
  const isDebouncing = id !== debouncedId;

  const shouldCheckDuplicate = useMemo(() => {
    return debouncedId.length > 0 && isDirty;
  }, [debouncedId, isDirty]);

  const { data: duplicateCheckData, isLoading: isDuplicateLoading } =
    useCheckIdDuplicate(debouncedId, shouldCheckDuplicate);

  // 중복 여부 판단
  const isDuplicated = useMemo(() => {
    return duplicateCheckData?.result === 'USERNAME_ALREADY_EXISTS';
  }, [duplicateCheckData]);

  useEffect(() => {
    if (!isDirty || isDuplicateLoading || isDebouncing) return;
    if (isDuplicated) {
      setValidText('');
      setErrorText('이미 사용 중인 아이디입니다.');
    } else if (shouldCheckDuplicate) {
      // API 호출 조건도 확인
      setValidText('사용 가능한 아이디입니다.');
    }
  }, [
    duplicateCheckData,
    isDirty,
    isDuplicateLoading,
    isDebouncing,
    shouldCheckDuplicate,
    isDuplicated,
  ]);
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
        <div className="flex w-full flex-col gap-2">
          <h1 className="headline2 text-black">
            사용할 아이디를 입력해주세요.
          </h1>
          <p className="body1-m text-grey08 flex gap-[.9375rem] break-keep whitespace-break-spaces">
            {userType === 'influencer' &&
              `인스타그램 아이디와 동일하게 설정하는 것을 추천드려요.`}
            {userType === 'user' &&
              `질문을 남기면 인플루언서에게 아이디가 표시되므로,\n타 SNS 아이디와 동일하게 설정하는 것을 추천 드려요.`}
          </p>
        </div>
        <IdInput
          id={'idInput'}
          text={id}
          handleChange={handleChangeId}
          maxLength={30}
          descriptionText="영어 소문자, 숫자, 바(_), 마침표(.)로 구성된 아이디를 입력해주세요."
          errorText={errorText}
          validText={validText}
          placeHolderContent="아이디를 입력해 주세요."
          ref={inputRef}
        />
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="다음"
          disabled={
            !isIdValid || isDuplicated || isDuplicateLoading || isDebouncing
          }
          useDisabled={false}
          onClick={handleClickNext}
        />
      </div>
    </div>
  );
};

export default SignupIdPage;
