import { DefaultButton, PageHeader, TipTooltip } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IdInput } from '@/components/common/DetailInput';
import { idSchema } from '@/schemas/profileSchema';
import { useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useCheckIdDuplicate } from '@/services/auth/useCheckIdDuplicationCheck';
import { PATH } from '@/routes/path';

const UsernamePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSeller = pathname.includes(PATH.SELLER.BASE);

  const [id, setId] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false); // 입력값이 한번이라도 바뀌었는지

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorText, setErrorText] = useState<string>('');
  const [validText, setValidText] = useState<string>('');
  // const { showSnackbar } = useSnackbarStore();

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
  const handleClickSave = () => {
    setIsDirty(true);
    if (!isIdValid) {
      // showSnackbar(errorText || '아이디를 입력해 주세요.'); // TODO: 스낵바
      inputRef.current?.focus();
    } else {
      // 백 연동
      console.log(id);
      // showSnackbar('저장되었습니다.'); // TODO: 스낵바
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
    <div className="flex h-full w-full flex-1 flex-col gap-6 pt-11">
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
        아이디 변경
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-[.625rem] px-5 py-[3.25rem]">
        <div className="flex w-full flex-col gap-1">
          <h1 className="body1-b text-black">아이디</h1>
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
        {isSeller && (
          <div className="pt-[.875rem]">
            <TipTooltip text="아이디는 등록하신 상품 썸네일에 표시되며, 타 SNS에서 사용하고 계시는 아이디와 동일하게 사용하시면 좋습니다." />
          </div>
        )}
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="다음"
          disabled={
            !isIdValid || isDuplicated || isDuplicateLoading || isDebouncing
          }
          useDisabled={false}
          onClick={handleClickSave}
        />
      </div>
    </div>
  );
};

export default UsernamePage;
