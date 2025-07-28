import { PageHeader } from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import FAQ from '@/constants/supportFaq';
import { SUPPORT_FAQ_DETAIL } from '@/utils/generatePath';

const SupportPage = () => {
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
        INFLUY 고객센터
      </PageHeader>
      <section className="flex flex-1 flex-col gap-4 pt-6">
        <h1 className="subhead-sb px-5">가장 많이 묻는 질문</h1>
        <ul className="flex w-full flex-1 flex-col">
          {FAQ.map((faq) => (
            <li
              key={faq.id}
              className="border-b-grey02 flex w-full cursor-pointer items-center justify-between gap-[.625rem] border-b bg-white px-5 py-6"
              onClick={() =>
                navigate(
                  generatePath(SUPPORT_FAQ_DETAIL, { supportFaqId: faq.id })
                )
              }
            >
              <span className="body2-m text-grey07 w-[3.375rem] shrink-0">
                {faq.category}
              </span>
              <p className="body2-m w-full text-black">{faq.question}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SupportPage;
