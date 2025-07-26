// 내 상품 질문 관리 페이지
import { PageHeader, BottomNavBar, TalkBoxItemCard } from '@/components';

//api
import { useGetTalkBoxOpened } from '@/services/sellerItem/query/useGetTalkBoxOpened';

const TalkBoxItemListPage = () => {
  const { data: openedItems } = useGetTalkBoxOpened();
  return (
    <section
      className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto"
      aria-labelledby="talk-box-item-title"
    >
      <PageHeader>
        <p className="subhead-sb w-full text-left" id="talk-box-item-title">
          내 상품 질문 관리
        </p>
      </PageHeader>

      <div className="mt-4 flex flex-col gap-[.875rem] px-5">
        <h2 className="body2-m text-grey09 w-full">
          톡박스가 활성화된 상품({openedItems.cnt})
        </h2>
        <div className="flex w-full flex-col gap-6">
          {openedItems.talkBoxOpenedDtoList.map((item) => (
            <TalkBoxItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>

      <BottomNavBar />
    </section>
  );
};

export default TalkBoxItemListPage;
