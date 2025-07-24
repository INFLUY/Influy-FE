import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import HeartIcon from '@/assets/icon/common/HeartNavbar.svg?react';
import CalendarIcon from '@/assets/icon/common/CalendarNavbar.svg?react';
import SellerMyIcon from '@/assets/icon/seller/MyNavbar.svg?react';
import SellerMyIcon2 from '@/assets/icon/seller/MyNavbarActive.svg?react';
import UserMyIcon from '@/assets/icon/user/MyNavbar.svg?react';
import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';
import { NavLink } from 'react-router-dom';
import cn from '@/utils/cn';
import { PATH } from '@/routes/path';

const sellerTabRouteMap: Record<string, string[]> = {
  [`${PATH.SELLER.base}/${PATH.SELLER.home.base}`]: [
    `${PATH.SELLER.base}/${PATH.SELLER.home.base}`,
  ],
  [`${PATH.SELLER.base}/talk-box`]: [`${PATH.SELLER.base}/talk-box`],
  [`${PATH.SELLER.base}/${PATH.SELLER.calender.base}`]: [
    `${PATH.SELLER.base}/${PATH.SELLER.calender.base}`,
  ],
  [`${PATH.SELLER.base}/${PATH.SELLER.my.base}`]: [
    `${PATH.SELLER.base}/${PATH.SELLER.my.base}/${PATH.SELLER.my.tabs.selection}`,
    `${PATH.SELLER.base}/${PATH.SELLER.my.base}/${PATH.SELLER.my.tabs.stored}`,
    `${PATH.SELLER.base}/${PATH.SELLER.my.base}/${PATH.SELLER.my.tabs.review}`,
  ],
};

const userTabRouteMap: Record<string, string[]> = {
  [`${PATH.HOME.base}`]: [`${PATH.HOME.base}`],
  [`${PATH.LIKED.base}`]: [`${PATH.LIKED.base}`],
  [`${PATH.CALENDAR.base}`]: [`${PATH.CALENDAR.base}`],
  [`${PATH.MY.base}`]: [`${PATH.MY.base}`],
};

const isTabActive = (
  pathname: string,
  tabTo: string | undefined,
  userType?: 'SELLER' | 'USER'
): boolean => {
  if (!tabTo) return false;
  const validPaths =
    userType === 'SELLER' ? sellerTabRouteMap[tabTo] : userTabRouteMap[tabTo];
  if (!validPaths) return pathname === tabTo; // fallback
  return validPaths.includes(pathname);
};

export interface BottomNavItem {
  label: string;
  icon?: React.ReactNode;
  isActiveIcon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  aria: string;
}

interface BottomNavBarProps {
  userType?: 'USER' | 'SELLER';
  items?: BottomNavItem[];
  type?: 'link' | 'action';
}

const userNavItems: BottomNavItem[] = [
  {
    to: `${PATH.HOME.base}`,
    label: '홈',
    icon: <HomeIcon className="h-6 w-6" />,
    aria: '홈',
  },
  {
    to: `${PATH.LIKED.base}`,
    label: '찜',
    icon: <HeartIcon className="h-6 w-6" />,
    aria: '찜',
  },
  {
    to: `${PATH.CALENDAR.base}`,
    label: '캘린더',
    icon: <CalendarIcon className="h-6 w-6" />,
    aria: '캘린더',
  },
  {
    to: `${PATH.MY.base}`,
    label: '마이',
    icon: <UserMyIcon className="h-6 w-6" />,
    aria: '마이',
  },
];

const sellerNavItems: BottomNavItem[] = [
  {
    to: `${PATH.SELLER.base}/${PATH.SELLER.home.base}`,
    label: '홈',
    icon: <HomeIcon className="h-6 w-6" />,
    aria: '홈',
  },
  {
    to: `${PATH.SELLER.base}/talk-box`,
    label: '톡박스',
    icon: <TalkBoxIcon className="h-6 w-6" />,
    aria: '톡박스',
  },
  {
    to: `${PATH.SELLER.base}/${PATH.SELLER.calender.base}`,
    label: '캘린더',
    icon: <CalendarIcon className="h-6 w-6" />,
    aria: '캘린더',
  },
  {
    to: `${PATH.SELLER.base}/${PATH.SELLER.my.base}`,
    label: '마이',
    icon: <SellerMyIcon className="h-6 w-6" />,
    isActiveIcon: <SellerMyIcon2 className="h-6 w-6" />,
    aria: '마이',
  },
];

export const BottomNavBar = ({
  userType = 'USER',
  items,
  type = 'link',
}: BottomNavBarProps) => {
  const navItems: BottomNavItem[] =
    items ?? (userType === 'SELLER' ? sellerNavItems : userNavItems);
  return (
    <nav
      className="border-t-grey03 bg-grey01 fixed bottom-0 z-20 flex h-[4.0625rem] w-full max-w-[40rem] min-w-[20rem] flex-col items-start justify-center border-t border-solid md:w-[28rem]"
      aria-label="하단 네비게이션 바"
      role="navigation"
    >
      <ul className="flex h-full w-full items-center justify-between">
        {navItems?.map((item) => (
          <li
            key={item.label}
            className="flex h-full items-center justify-center"
          >
            {type === 'link' && item.to ? (
              (() => {
                const isActive = isTabActive(
                  location.pathname,
                  item.to,
                  userType
                );
                console.log(isActive);
                console.log(item.to);
                return (
                  <NavLink
                    to={item.to}
                    className={() =>
                      cn(
                        'flex h-full cursor-pointer flex-col items-center justify-center gap-0.5 px-5',
                        isActive ? 'text-black' : 'text-grey06'
                      )
                    }
                    aria-label={item.aria}
                  >
                    {isActive ? (item.isActiveIcon ?? item.icon) : item.icon}
                    <span className="caption-m">{item.label}</span>
                  </NavLink>
                );
              })()
            ) : (
              <button
                onClick={item.onClick}
                className="flex h-full w-full cursor-pointer items-center gap-1 px-5"
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
