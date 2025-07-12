import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import HeartIcon from '@/assets/icon/common/HeartNavbar.svg?react';
import CalendarIcon from '@/assets/icon/common/CalendarNavbar.svg?react';
import MyIcon from '@/assets/icon/common/MyNavbar.svg?react';
import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';
import { NavLink } from 'react-router-dom';
import cn from '@/utils/cn';
import { PATH } from '@/routes/path';

export interface BottomNavItem {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  aria: string;
}

interface BottomNavBarProps {
  items?: BottomNavItem[];
  type?: 'link' | 'action';
}
const navItems: BottomNavItem[] = [
  {
    to: `${PATH.SELLER.base}/${PATH.SELLER.home.base}`,
    label: '홈',
    icon: <HomeIcon className="h-6 w-6" />,
    aria: '홈',
  },
  {
    to: `${PATH.SELLER.base}/like`,
    label: '찜',
    icon: <HeartIcon className="h-6 w-6" />,
    aria: '찜',
  },
  {
    to: `${PATH.SELLER.base}/talk-box`,
    label: '톡박스',
    icon: <TalkBoxIcon className="h-6 w-6" />,
    aria: '톡박스',
  },
  {
    to: `${PATH.SELLER.base}/calender`,
    label: '캘린더',
    icon: <CalendarIcon className="h-6 w-6" />,
    aria: '캘린더',
  },
  {
    to: `${PATH.SELLER.base}/${PATH.SELLER.tabs.selection}`,
    label: '마이',
    icon: <MyIcon className="h-6 w-6" />,
    aria: '마이',
  },
];

export const BottomNavBar = ({
  items = navItems,
  type = 'link',
}: BottomNavBarProps) => {
  return (
    <nav
      className="border-t-grey03 bg-grey01 fixed bottom-0 z-50 flex w-full max-w-[40rem] min-w-[20rem] flex-col items-start border-t border-solid px-5 py-2.5 md:w-[28rem]"
      aria-label="하단 네비게이션 바"
      role="navigation"
    >
      <ul className="flex h-10 w-full items-start justify-between">
        {items.map((item) => (
          <li key={item.label}>
            {type === 'link' && item.to ? (
              <NavLink
                to={item.to}
                className={() =>
                  cn(
                    'flex cursor-pointer flex-col items-center gap-0.5',
                    isTabActive(location.pathname, item.to)
                      ? 'text-black'
                      : 'text-grey06'
                  )
                }
                aria-label={item.aria}
              >
                {item.icon}
                <span className="caption-m">{item.label}</span>
              </NavLink>
            ) : (
              <button
                onClick={item.onClick}
                className="flex cursor-pointer items-center gap-1"
                aria-label={item.aria}
                type="button"
              >
                {item.icon}
                <span className="caption-m">{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const tabRouteMap: Record<string, string[]> = {
  [`${PATH.SELLER.base}`]: [
    `${PATH.SELLER.base}/${PATH.SELLER.tabs.selection}`,
    `${PATH.SELLER.base}/${PATH.SELLER.tabs.stored}`,
    `${PATH.SELLER.base}/${PATH.SELLER.tabs.review}`,
  ],
  [`${PATH.SELLER.base}/${PATH.SELLER.home.base}`]: [
    `${PATH.SELLER.base}/${PATH.SELLER.home.base}`,
    `${PATH.SELLER.base}/${PATH.SELLER.home.base}/${PATH.SELLER.home.more.endingSoon}`,
    `${PATH.SELLER.base}/${PATH.SELLER.home.base}/${PATH.SELLER.home.more.trending}`,
    `${PATH.SELLER.base}/${PATH.SELLER.home.base}/${PATH.SELLER.home.more.category}`,
  ],
  [`${PATH.SELLER.base}/like`]: [`${PATH.SELLER.base}/like`],
  [`${PATH.SELLER.base}/talk-box`]: [`${PATH.SELLER.base}/talk-box`],
  [`${PATH.SELLER.base}/calender`]: [`${PATH.SELLER.base}/calender`],
};

const isTabActive = (pathname: string, tabTo: string | undefined): boolean => {
  if (!tabTo) return false;
  const validPaths = tabRouteMap[tabTo];
  if (!validPaths) return pathname === tabTo; // fallback
  return validPaths.includes(pathname);
};
