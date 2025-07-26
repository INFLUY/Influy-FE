import { DefaultButton, PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
      >
        회원 탈퇴
      </PageHeader>
      <section className="flex flex-1 flex-col gap-6 px-5 pt-[3.125rem]">
        <div className="flex flex-col gap-[.5625rem] text-black">
          <h1 className="subhead-sb">정말 탈퇴하시겠습니까?</h1>
          <p className="caption-m">
            탈퇴하면 현재 모든 정보가 삭제돼요. 다시 가입해도 삭제된 정보는
            복구할 수 없어요.
          </p>
        </div>
        <DefaultButton activeTheme="grey" text="탈퇴하기" onClick={() => {}} />
      </section>
    </div>
  );
};

export default DeleteAccountPage;
