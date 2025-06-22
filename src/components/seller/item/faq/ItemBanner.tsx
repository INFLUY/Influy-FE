const ItemBanner = ({ name, tagline }: { name: string; tagline: string }) => {
  return (
    <article className="border-grey02 flex w-full items-start justify-start gap-[.5625rem] border-b px-5 pt-4 pb-[.875rem]">
      <img
        src="/img1.png"
        alt={`${name} 이미지`}
        className="h-[3.125rem] w-[3.125rem] object-cover"
      />
      <div className="flex flex-col gap-[.125rem] text-black">
        <span className="body1-sb line-clamp-1">{name}</span>
        <span className="body2-m line-clamp-1">{tagline}</span>
      </div>
    </article>
  );
};

export default ItemBanner;
