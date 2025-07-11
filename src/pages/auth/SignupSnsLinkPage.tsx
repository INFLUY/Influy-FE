import { PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useNavigate } from 'react-router-dom';

export const SignupSnsLinkPage = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default SignupSnsLinkPage;
