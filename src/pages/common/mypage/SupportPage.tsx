import { PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';

const SupportPage = () => {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      category: '마케팅',
      link: 'https://www.naver.com',
      question: '스토어 방문자와 통계는 어디서 확인하나요?',
    },
    {
      id: 2,
      category: '마케팅마케팅마케팅',
      link: 'https://www.naver.com',
      question:
        '스토어 방문자와 통계는 어디서 확인하나요? 스토어 방문자와 통계는 어디서 확인하나요? 스토어 방문자와 통계는 어디서 확인하나요? 스토어 방문자와 통계는 어디서 확인하나요?',
    },
    {
      id: 3,
      category: '정책/운영',
      link: 'https://www.naver.com',
      question: '스토어 운영 중단이나 탈퇴는 언제든 가능한가요?',
    },
    {
      id: 4,
      category: '마케팅',
      link: 'https://www.naver.com',
      question: '스토어 방문자와 통계는 어디서 확인하나요?',
    },
  ];

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
        INFLUY 고객센터
      </PageHeader>
      <section className="flex flex-1 flex-col gap-4 pt-6">
        <h1 className="subhead-sb px-5">가장 많이 묻는 질문</h1>
        <section className="flex w-full flex-1 flex-col">
          {questions.map((question) => (
            <a
              key={question.id}
              href={question.link}
              className="border-b-grey02 flex w-full cursor-pointer items-center justify-between gap-[.625rem] border-b bg-white px-5 py-6"
            >
              <span className="body2-m text-grey07 w-[3.375rem] shrink-0">
                {question.category}
              </span>
              <p className="body2-m w-full text-black">{question.question}</p>
            </a>
          ))}
        </section>
      </section>
    </div>
  );
};

export default SupportPage;
