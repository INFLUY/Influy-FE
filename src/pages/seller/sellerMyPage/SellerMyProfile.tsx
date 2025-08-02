import { useState } from 'react';
import { PATH } from '@/routes/path';
import {
  ExternalLinkBottomSheet,
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  Tab,
  Tabs,
  SellerMyProfileHeader,
  SellerModal,
  BottomNavBar,
} from '@/components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@/assets/icon/common/Add2Icon.svg?react';
import { useGetPrimaryNotification } from '@/services/notification/query/useGetPrimaryNotification';
import { useGetMarketLinks } from '@/services/marketLinks/query/useGetMarketLinks';
import { LinkType } from '@/types/seller/LinkType.types';
import { useDeleteMarketLink } from '@/services/marketLinks/mutation/useDeleteMarketLink';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetMyMarket } from '@/services/seller/query/useGetMarket';

const SellerMyProfile = () => {
  const [isAddLinkOpen, setIsAddLinkOpen] = useState<boolean>(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState<boolean>(false);
  const [isLinkDeleteModalOpen, setIsLinkDeleteModalOpen] =
    useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);

  const { showSnackbar } = useSnackbarStore();

  const TABS = [
    { id: 0, name: '상품', path: PATH.SELLER.MY.TABS.SELECTION },
    { id: 2, name: '보관', path: PATH.SELLER.MY.TABS.ARCHIVE },
    { id: 3, name: '리뷰', path: PATH.SELLER.MY.TABS.REVIEW },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleEditLink = (link: LinkType) => {
    setSelectedLink(link);
    setIsEditLinkOpen(true);
  };

  const { sellerId } = useStrictId();
  const { data: sellerMyMarket } = useGetMyMarket();

  const { data: links } = useGetMarketLinks({
    sellerId: Number(sellerId),
  });

  const handleAddLink = () => {
    if (links?.length < 5) {
      setIsAddLinkOpen(true);
    } else {
      showSnackbar('링크는 최대 5개까지만 추가할 수 있습니다.');
    }
  };

  // 삭제 모달 열기
  const handleClickDelete = () => {
    setIsLinkDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const handleDeleteModalClose = () => {
    setSelectedLink(null);
    setIsLinkDeleteModalOpen(false);
  };

  const { mutate: deleteLink } = useDeleteMarketLink(() =>
    showSnackbar('링크가 삭제되었습니다.')
  );

  // 삭제
  const handleDelete = () => {
    if (selectedLink?.id !== undefined) {
      deleteLink(selectedLink?.id);
    }
    handleDeleteModalClose();
    setSelectedLink(null);
  };

  const { data: primaryNotice } = useGetPrimaryNotification({
    sellerId: Number(sellerId),
  });

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerMyProfileHeader />
        {sellerMyMarket?.sellerProfile.backgroundImg && (
          <img
            src={sellerMyMarket?.sellerProfile.backgroundImg}
            alt="내 배경사진"
            className="inset-0 flex h-full w-full bg-white object-cover"
          />
        )}
      </div>
      {sellerMyMarket && (
        <SellerProfileCard
          sellerInfo={sellerMyMarket?.sellerProfile}
          seller={true}
        />
      )}
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <NoticeBanner
          title={primaryNotice?.title}
          count={primaryNotice?.totalAnnouncements || 0}
          onClickNotice={() => navigate(`./${PATH.SELLER.MY.NOTICE.BASE}`)}
          seller={true}
        />
      </div>

      <section className="divide-grey02 flex flex-1 flex-col divide-y-[12px]">
        {/* 링크 */}
        <div className="relative flex w-full">
          <div className="scrollbar-hide flex h-[3.5625rem] w-full items-center gap-[.625rem] self-stretch overflow-x-auto pr-[4.5rem] pl-5">
            {links?.map((link: LinkType) => (
              <ExternalLinkChip
                key={link?.id}
                link={link}
                handleEditLink={handleEditLink}
                handleClickDelete={handleClickDelete}
                setSelectedLink={setSelectedLink}
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

        {isEditLinkOpen && (
          <ExternalLinkBottomSheet
            existingLink={selectedLink || undefined}
            isOpen={isEditLinkOpen}
            setIsOpen={setIsEditLinkOpen}
            setSelectedLink={setSelectedLink}
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
        <Outlet context={{ sellerId: Number(sellerId) }} />
      </section>
      <BottomNavBar userType="SELLER" />
    </div>
  );
};

export default SellerMyProfile;
