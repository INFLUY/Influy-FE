import { BottomNavBar, PageHeader } from '@/components';

const SellerCalendarPage = () => {
  return (
    <section className="flex flex-1 items-center justify-center pt-11">
      <PageHeader>달력 관리</PageHeader>
      <div className="text-grey09 body2-m">준비 중입니다</div>
      <BottomNavBar userType="SELLER" />
    </section>
  );
};

export default SellerCalendarPage;
