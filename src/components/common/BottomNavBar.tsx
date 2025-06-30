import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import HeartIcon from '@/assets/icon/common/HeartNavbar.svg?react';
import CalendarIcon from '@/assets/icon/common/CalendarNavbar.svg?react';
import MyIcon from '@/assets/icon/common/MyNavbar.svg?react';
import { PATH } from '@/routes/path';

import { NavLink } from 'react-router-dom';
import cn from '@/utils/cn';

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
    to: PATH.SELLER.base, // 임시, 수정 필요
    label: '홈',
    icon: <HomeIcon className="h-6 w-6" />,
    aria: '홈',
  },
  {
    to: PATH.SELLER.base, // 임시, 수정 필요
    label: '찜',
    icon: <HeartIcon className="h-6 w-6" />,
    aria: '찜',
  },
  {
    to: PATH.SELLER.base, // 임시, 수정 필요
    label: '캘린더',
    icon: <CalendarIcon className="h-6 w-6" />,
    aria: '캘린더',
  },
  {
    to: PATH.SELLER.tabs.selection,
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
      className="border-t-grey03 bg-grey01 fixed bottom-0 z-40 flex w-full max-w-[40rem] min-w-[20rem] flex-col items-start border-t border-solid px-[1.375rem] pt-2.5 pb-[1.5625rem] md:w-[28rem]"
      aria-label="하단 네비게이션 바"
      role="navigation"
    >
      <ul className="flex h-10 w-full items-start justify-between">
        {items.map((item) => (
          <li key={item.label}>
            {type === 'link' && item.to ? (
              <NavLink
                to={item.to}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    'flex cursor-pointer flex-col items-center gap-0.5',
                    isActive ? 'text-black' : 'text-grey07'
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
