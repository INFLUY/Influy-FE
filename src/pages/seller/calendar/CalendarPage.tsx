import { BottomNavBar, PageHeader } from '@/components';

const SellerCalendarPage = () => {
  return (
    <section className="flex flex-1 items-center justify-center pt-11">
      <PageHeader>달력 관리</PageHeader>
      <div className="body1-sb">준비중입니다.</div>
      <BottomNavBar userType="SELLER" />
    </section>
  );
};

export default SellerCalendarPage;
