const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="scrollbar-hide flex h-screen w-screen max-w-[40rem] min-w-[20rem] flex-1 flex-col overflow-auto bg-white md:w-[28rem]">
      <main className="scrollbar-hide relative flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
