import GlobalSnackBar from '@/components/common/GlobalSnackBar';
import GlobalModal from '@/components/common/GlobalModal';

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[100dvh] w-screen max-w-[40rem] min-w-[20rem] flex-1 flex-col overflow-hidden bg-white md:w-[28rem]">
      <main className="scrollbar-hide relative flex flex-1 flex-col overflow-y-auto">
        {children}
        <GlobalModal />
        <GlobalSnackBar />
      </main>
    </div>
  );
};

export default GlobalLayout;
