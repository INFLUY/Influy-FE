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
  SellerModal,
} from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@/assets/icon/common/Add2Icon.svg?react';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { useGetPrimaryNotification } from '@/services/notification/query/useGetPrimaryNotification';
import { useGetMarketLinks } from '@/services/marketLinks/query/useGetMarketLinks';
import { LinkType } from '@/types/seller/LinkType.types';
import { useDeleteMarketLink } from '@/services/marketLinks/mutation/useDeleteMarketLink';

const SellerMyProfile = ({ children }: { children: ReactNode }) => {
  const [isLinkSnackBarOpen, setIsLinkSnackBarOpen] = useState<boolean>(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState<boolean>(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState<boolean>(false);
  const [isLinkDeleteModalOpen, setIsLinkDeleteModalOpen] =
    useState<boolean>(false);
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);

  const TABS = [
    { id: 0, name: '상품', path: PATH.SELLER.tabs.selection },
    { id: 2, name: '보관', path: PATH.SELLER.tabs.stored },
    { id: 3, name: '리뷰', path: PATH.SELLER.tabs.review },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleEditLink = (linkId: number) => {
    setSelectedLinkId(linkId);
    setIsEditLinkOpen(true);
  };

  const sellerId = useStrictSellerId();

  const { data: links } = useGetMarketLinks({
    sellerId: Number(sellerId),
  });

  const handleAddLink = () => {
    if (links?.length < 5) {
      setIsAddLinkOpen(true);
    } else {
      setIsLinkSnackBarOpen(true);
    }
  };

  // 삭제 모달 열기
  const handleClickDelete = () => {
    setIsLinkDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const handleDeleteModalClose = () => {
    setSelectedLinkId(null);
    setIsLinkDeleteModalOpen(false);
  };

  const { mutate: deleteLink } = useDeleteMarketLink();

  // 삭제
  const handleDelete = () => {
    if (selectedLinkId !== null) {
      deleteLink(selectedLinkId);
    }
    handleDeleteModalClose();
    setSelectedLinkId(null);
  };

  const { data: primaryNotice } = useGetPrimaryNotification({
    sellerId: Number(sellerId),
  });

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerMyProfileHeader />
      </div>
      <SellerProfileCard seller={true} />
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <NoticeBanner
          title={primaryNotice?.title}
          count={primaryNotice?.totalAnnouncements || 0}
          onClickNotice={() => navigate(`./${PATH.SELLER.notice.base}`)}
          seller={true}
        />
      </div>

      <section className="divide-grey02 flex flex-col divide-y-[12px]">
        {/* 링크 */}
        <div className="relative flex w-full">
          <div className="scrollbar-hide flex h-[3.5625rem] w-full items-center gap-[.625rem] self-stretch overflow-x-auto py-3 pr-[4.5rem] pl-5">
            {links?.map((link: LinkType) => (
              <ExternalLinkChip
                key={link?.id}
                linkId={link?.id}
                name={link?.linkName}
                url={link?.link}
                handleEditLink={handleEditLink}
                handleClickDelete={handleClickDelete}
                setSelectedLinkId={setSelectedLinkId}
              />
            ))}
          </div>
          {/* 링크 추가 버튼 */}
          <div className="absolute right-0 z-10 flex h-full w-[4.5rem] shrink-0 flex-col items-end justify-center gap-2.5 py-2.5 pr-5 pl-3 [background:linear-gradient(90deg,rgba(248,248,249,0.00)_0%,#FFFFFF_30.56%)]">
            <button
              type="button"
              className="border-grey08 flex h-[1.875rem] w-[1.875rem] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full border bg-white"
              onClick={handleAddLink}
            >
              <AddIcon className="text-grey08 h-[.675rem] w-[.675rem]" />
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
        {isLinkDeleteModalOpen && (
          <SellerModal
            text={`링크를 삭제하시겠습니까?`}
            leftButtonClick={handleDeleteModalClose}
            rightButtonClick={handleDelete}
            onClose={handleDeleteModalClose}
            setIsModalOpen={setIsLinkDeleteModalOpen}
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
