const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col h-screen min-w-[20rem] w-screen max-w-[40rem] bg-white md:w-[28rem] overflow-auto scrollbar-hide">
      <main className="flex relative flex-1 flex-col">{children}</main>
    </div>
  );
};

export default GlobalLayout;
