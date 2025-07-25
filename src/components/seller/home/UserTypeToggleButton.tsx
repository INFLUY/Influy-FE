import { PATH } from '@/routes/path';
import cn from '@/utils/cn';
import { useLocation, useNavigate } from 'react-router-dom';

const UserTypeToggleButton = ({
  userType,
}: {
  userType: 'influencer' | 'user';
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleUserTypeChange = () => {
    if (pathname.includes(PATH.SELLER.BASE)) navigate(PATH.HOME.BASE);
    else navigate(`${PATH.SELLER.BASE}/${PATH.SELLER.HOME.BASE}`);
  };

  return (
    <div className="relative h-[2.0625rem] w-[9.3125rem]">
      <input
        id="user-type-toggle button"
        type="checkbox"
        className="hidden"
        checked={userType === 'user'}
        onChange={handleUserTypeChange}
      />
      <label
        htmlFor={`user-type-toggle button`}
        className="bg-grey07 flex h-full w-full cursor-pointer items-center gap-2 rounded-[1.0625rem]"
      />
      <span
        className={cn(
          'body2-m pointer-events-none absolute top-1 left-1 z-10 flex h-[1.5625rem] w-[4.25rem] items-center justify-center rounded-full bg-white',
          userType === 'user' && 'bg-transparent text-white'
        )}
      >
        인플루언서
      </span>
      <span
        className={cn(
          'body2-m pointer-events-none absolute top-1 right-1 z-10 flex h-[1.5625rem] w-[4.25rem] items-center justify-center rounded-full bg-white',
          userType !== 'user' && 'bg-transparent text-white'
        )}
      >
        일반
      </span>
    </div>
  );
};

export default UserTypeToggleButton;
