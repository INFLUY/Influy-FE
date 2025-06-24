import { ReactNode, useState } from 'react';
import { PATH } from '@/routes/path';
import {
  ExternalLinkBottomSheet,
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  Tab,
  Tabs,
  SellerMyProfileHeader,
  SnackBar,
} from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { NoticeType } from '@/types/common/NoticeType.types';
import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';
import cn from '@/utils/cn';

const SellerMyProfile = ({ children }: { children: ReactNode }) => {
  const [isLinkSnackBarOpen, setIsLinkSnackBarOpen] = useState<boolean>(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState<boolean>(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState<boolean>(false);
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);

  const TABS = [
    { id: 0, name: '상품', path: PATH.SELLER.tabs.selection },
    { id: 2, name: '보관', path: PATH.SELLER.tabs.stored },
    { id: 3, name: '리뷰', path: PATH.SELLER.tabs.review },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 임시 링크
  const LINKS = [
    { id: 0, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 1, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 2, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 3, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 4, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
  ];

  const handleAddLink = () => {
    if (LINKS.length < 5) {
      setIsAddLinkOpen(true);
    } else {
      setIsLinkSnackBarOpen(true);
    }
  };

  const handleEditLink = (linkId: number) => {
    setSelectedLinkId(linkId);
    setIsEditLinkOpen(true);
  };

  // 임시 공지사항
  const NOTICES: NoticeType[] = [
    {
      id: 0,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
      isPrimary: true,
    },
    {
      id: 1,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerMyProfileHeader />
      </div>
      <SellerProfileCard seller={true} />
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <NoticeBanner
          title={NOTICES[0]?.title}
          count={NOTICES?.length}
          onClickNotice={() => navigate(`./${PATH.SELLER.notice.base}`)}
          seller={true}
        />
      </div>

      <section className="divide-grey02 flex flex-col divide-y-[12px]">
        {/* 링크 */}
        <div className="relative flex w-full">
          <div
            className={cn(
              'scrollbar-hide flex w-full items-center gap-[.625rem] self-stretch overflow-x-auto py-3 pr-[4.5rem] pl-5',
              {
                'justify-end': LINKS.length === 0,
              }
            )}
          >
            {LINKS.map((link) => (
              <ExternalLinkChip
                key={link.id}
                linkId={link.id}
                name={link.name}
                url={link.url}
                handleEditLink={handleEditLink}
              />
            ))}
          </div>
          {/* 링크 추가 버튼 */}
          <div className="absolute right-0 z-10 flex h-full w-[4.5rem] shrink-0 flex-col items-end justify-center gap-2.5 py-2.5 pr-5 pl-3 [background:linear-gradient(90deg,rgba(248,248,249,0.00)_0%,#FFFFFF_30.56%)]">
            <button
              type="button"
              className="bg-grey02 border-grey04 flex h-fit w-fit shrink-0 cursor-pointer items-center gap-2.5 rounded-full border p-[.4375rem]"
              onClick={handleAddLink}
            >
              <PlusIcon className="text-grey07 h-4 w-4" />
            </button>
          </div>
        </div>
        {isLinkSnackBarOpen && (
          <SnackBar handleSnackBarClose={() => setIsLinkSnackBarOpen(false)}>
            링크는 최대 5개까지만 추가할 수 있습니다.
          </SnackBar>
        )}
        {isEditLinkOpen && (
          <ExternalLinkBottomSheet
            linkId={selectedLinkId}
            isOpen={isEditLinkOpen}
            setIsOpen={setIsEditLinkOpen}
            setSelectedLinkId={setSelectedLinkId}
          />
        )}
        {isAddLinkOpen && (
          <ExternalLinkBottomSheet
            isOpen={isAddLinkOpen}
            setIsOpen={setIsAddLinkOpen}
          />
        )}
        {/* 탭 */}
        <Tabs>
          {TABS.map((tab) => (
            <Tab
              key={tab.name}
              handleClickTab={() => navigate(tab.path, { replace: true })}
              isTabActive={pathname.includes(tab.path)}
            >
              {tab.name}
            </Tab>
          ))}
        </Tabs>
        {children}
      </section>
    </div>
  );
};

export default SellerMyProfile;
