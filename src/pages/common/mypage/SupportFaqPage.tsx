import { PageHeader } from '@/components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { USER_FAQ, SELLER_FAQ } from '@/constants/supportFaq';
import { PATH } from '@/routes/path';

const SupportFaqPage = () => {
  const navigate = useNavigate();
  const { supportFaqId } = useParams();
  const { pathname } = useLocation();
  const isSeller = pathname.includes(PATH.SELLER.BASE);
  const faqList = isSeller ? SELLER_FAQ : USER_FAQ;

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
        FAQ
      </PageHeader>
      <section className="flex flex-1 flex-col">
        <div className="border-b-grey02 flex flex-col gap-2 border-b px-5 py-6">
          <span className="body2-m text-grey07">
            {faqList[Number(supportFaqId)].category}
          </span>
          <h1 className="subhead-sb text-black">
            {faqList[Number(supportFaqId)].question}
          </h1>
        </div>
        <p className="body2-r flex w-full flex-1 px-5 py-6 whitespace-pre-wrap text-black">
          {faqList[Number(supportFaqId)].answer}
        </p>
      </section>
    </div>
  );
};

export default SupportFaqPage;
