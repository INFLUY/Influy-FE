import { PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg?react';
import { PATH } from '@/routes/path';

const MyQuestion = () => {
  const navigate = useNavigate();

  const myQuestions = [
    {
      id: 1,
      nickname: '소현소현',
      last: '1일전',
      content:
        '안녕안녕하세요안녕하세요 안녕안녕하세안녕하세세요 안녕안녕하세요안녕하세요 안녕안녕하세안녕하세세요',
      mainImg: '/img1.png',
      messages: 3,
    },
    {
      id: 2,
      nickname: '소현',
      last: '2일전',
      content: '안녕하세요!',
      mainImg: '/product.png',
      messages: 1,
    },
    {
      id: 3,
      nickname: '혜선',
      last: '2일전',
      content:
        '안녕안녕하세요안녕하세요 안녕안녕하세안녕하세세요 안녕안녕하세요안녕하세요 안녕안녕하세안녕하세세요',
      mainImg: '/product.png',
      messages: 0,
    },
    {
      id: 4,
      nickname: '안녕',
      last: '1일전',
      content: '안녕하세요!!!!!',
      mainImg: '/img1.png',
      messages: 15,
    },
    {
      id: 5,
      nickname: '소현',
      last: '2일전',
      content: '안녕하세요!',
      mainImg: '/product.png',
      messages: 4,
    },
    {
      id: 6,
      nickname: '혜선',
      last: '2일전',
      content: '우왕',
      mainImg: '/product.png',
      messages: 0,
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
        내가 한 질문
      </PageHeader>
      <section className="bg-grey01 flex flex-1 flex-col py-[.8125rem]">
        {myQuestions.map((myQuestion) => (
          <div
            key={myQuestion.id}
            aria-label="톡박스로 이동"
            role="button"
            className="flex h-[6.25rem] items-center gap-[.625rem] px-3 py-4"
            onClick={() => navigate(PATH.HOME.BASE)} // TODO: 톡박스로 이동
          >
            <ProfileIcon className="h-[3.75rem] w-[3.75rem] shrink-0" />
            <span className="flex w-full flex-col gap-[.1563rem]">
              <span className="flex w-full flex-1 items-start justify-between">
                <span className="body2-m line-clamp-1 text-black">
                  {myQuestion.nickname}
                </span>
                <span className="caption-m text-grey07 shrink-0">
                  {myQuestion.last}
                </span>
              </span>
              <span className="text-grey08 line-clamp-2">
                {myQuestion.content}
              </span>
            </span>
            <span className="flex h-full shrink-0 flex-col items-end justify-between">
              <img
                src={myQuestion?.mainImg ?? undefined}
                alt="~~ 썸네일"
                className="bg-grey03 h-[2.125rem] w-[2.125rem] object-cover"
              />
              {myQuestion.messages !== 0 && (
                <div className="bg-main caption-m h-fit w-fit min-w-[1.375rem] rounded-[1.5625rem] px-[.4375rem] py-[.1875rem] text-center text-white">
                  {myQuestion.messages}
                </div>
              )}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyQuestion;
