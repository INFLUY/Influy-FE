import { DefaultButton, PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdInput } from '@/components/common/DetailInput';
import { idSchema } from '@/schemas/profileSchema';
import { useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useCheckIdDuplicate } from '@/services/auth/mutation/useCheckIdDuplicationCheck';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetUserProfile } from '@/services/member/query/useGetUserProfile';

const UsernamePage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [prevId, setPrevId] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorText, setErrorText] = useState<string>('');
  const [validText, setValidText] = useState<string>('');
  const { showSnackbar } = useSnackbarStore();
  const { memberId } = useStrictId({ redirectOnFail: true });
  const { data: userProfile } = useGetUserProfile({ memberId: memberId! });

  useEffect(() => {
    if (userProfile) {
      setId(userProfile.username);
      setPrevId(userProfile.username);
    }
  }, [userProfile]);

  const isIdValid = () => {
    if (id.length === 0) return false;

    // 유효성 검사
    const result = idSchema.safeParse(id);
    return result.success;
  };

  useEffect(() => {
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
  }, [id]);

  // 다음 버튼 클릭 핸들러
  const handleClickSave = () => {
    if (prevId === id) {
      showSnackbar('이전과 같은 아이디입니다.');
    } else if (!isIdValid) {
      showSnackbar(errorText || '아이디를 입력해 주세요.');
      inputRef.current?.focus();
    } else if (errorText !== '') {
      return;
    } else {
      // 백 연동
      console.log(id);
      showSnackbar('저장되었습니다.');
    }
  };

  const debouncedId = useDebounce(id, 300);
  const isDebouncing = id !== debouncedId;

  const { data: duplicateCheckData, isLoading: isDuplicateLoading } =
    useCheckIdDuplicate(debouncedId, debouncedId.length > 0);

  // 중복 여부 판단
  const isDuplicated = useMemo(() => {
    return duplicateCheckData?.result === 'USERNAME_ALREADY_EXISTS';
  }, [duplicateCheckData]);

  useEffect(() => {
    if (isDuplicateLoading || isDebouncing) return;
    if (prevId === id) {
      return;
    }
    if (isDuplicated) {
      setValidText('');
      setErrorText('이미 사용 중인 아이디입니다.');
    } else if (debouncedId.length > 0) {
      setValidText('사용 가능한 아이디입니다.');
    }
  }, [duplicateCheckData, isDuplicateLoading, isDebouncing, isDuplicated]);

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
        아이디 변경
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-[.625rem] px-5 py-[3.25rem]">
        <div className="flex w-full flex-col gap-1">
          <h1 className="body1-b text-black">아이디</h1>
        </div>
        <IdInput
          id={'idInput'}
          text={id}
          handleChange={setId}
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
          disabledTheme="base"
          text="다음"
          disabled={
            !isIdValid ||
            isDuplicated ||
            isDuplicateLoading ||
            isDebouncing ||
            prevId === id
          }
          useDisabled={false}
          onClick={handleClickSave}
        />
      </div>
    </div>
  );
};

export default UsernamePage;
