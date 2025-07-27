import { DefaultButton, PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LimitedTextInputWithFocus } from '@/components/common/DetailInput';
import { nicknameSchema } from '@/schemas/profileSchema';

const UsernamePage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false); // 입력값이 한번이라도 바뀌었는지
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    const result = nicknameSchema.safeParse(nickname);
    if (!result.success) {
      const message = result.error.issues.map((err) => err.message);
      setErrorMessage(message[0]);
    } else {
      setErrorMessage('');
    }
  }, [nickname, isDirty]);

  // 다음 버튼 클릭 핸들러
  const handleClickSave = () => {
    setIsDirty(true);
    if (errorMessage !== '') {
      // showSnackbar(errorMessage); // TODO
      console.error(errorMessage);
      inputRef.current?.focus();
    } else {
      console.log(nickname);
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
        닉네임 변경
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-[.625rem] px-5 py-[3.25rem]">
        <div className="flex w-full flex-col gap-1">
          <h1 className="body1-b text-black">닉네임</h1>
        </div>
        <LimitedTextInputWithFocus
          text={nickname}
          setText={setNickname}
          maxLength={8}
          placeHolderContent="닉네임을 입력해 주세요."
          inputRef={inputRef}
          error={isDirty && !!errorMessage}
        />
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="저장하기"
          disabled={errorMessage !== ''}
          useDisabled={false}
          onClick={handleClickSave}
        />
      </div>
    </div>
  );
};

export default UsernamePage;
