import { DefaultButton, PageHeader, SnackBar } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TextInput } from '@/components/common/DetailInput';
import { useSellerSignupStore } from '@/store/authStore';
import { snsSchema } from '@/schemas/profileSchema';

export const SignupSnsLinkPage = () => {
  const navigate = useNavigate();

  const [instagramUrl, setInstagramUrl] = useState<string>('');
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [tiktokUrl, setTiktokUrl] = useState<string>('');
  const instagramRef = useRef<HTMLInputElement | null>(null);
  const youtubeRef = useRef<HTMLInputElement | null>(null);
  const tiktokRef = useRef<HTMLInputElement | null>(null);

  const { id: sellerId, sns, setSns } = useSellerSignupStore();

  useEffect(() => {
    if (!sellerId) {
      navigate(`../${PATH.REGISTER.type.seller.id}`);
    }
    // 기존에 저장된 SNS 정보가 있다면 초기화
    if (sns) {
      setInstagramUrl(sns.instagram || '');
      setYoutubeUrl(sns.youtube || '');
      setTiktokUrl(sns.tiktok || '');
    }
  }, []);

  const [isDirty, setIsDirty] = useState(false); // 입력값이 한번이라도 바뀌었는지
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  const partialSnsSchema = snsSchema.partial();

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    if (!isDirty) setIsDirty(true);
    if (!instagramUrl) {
      setSnackbar({
        open: true,
        message: '인스타그램 URL을 입력해 주세요.',
      });
      instagramRef.current?.focus();
    } else {
      const result = snsSchema.safeParse({
        instagram: instagramUrl,
        youtube: youtubeUrl,
        tiktok: tiktokUrl,
      });
      if (!result.success) {
        const firstError = result.error.issues[0];
        switch (firstError.path[0]) {
          case 'instagram':
            instagramRef.current?.focus();
            break;
          case 'youtube':
            youtubeRef.current?.focus();
            break;
          case 'tiktok':
            tiktokRef.current?.focus();
            break;
        }

        setSnackbar({
          open: true,
          message: firstError.message,
        });
      } else {
        setSns({
          instagram: instagramUrl,
          youtube: youtubeUrl,
          tiktok: tiktokUrl,
        });
        navigate(`../${PATH.REGISTER.type.seller.email}`);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
        rightIcons={[
          <XIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate('')}
          />,
        ]}
      >
        회원가입
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-11 px-5 py-[3.25rem]">
        <div className="flex w-full flex-col gap-2">
          <h1 className="headline2 text-black">SNS URL을 입력해 주세요.</h1>
          <p className="body1-m text-grey08 flex gap-[.9375rem] break-keep whitespace-break-spaces">
            인스타그램 URL은 필수로 입력해야해요.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="body2-sb flex items-center gap-2 text-black">
            <InstagramIcon className="h-6 w-6" />
            <span>
              인스타그램 <span className="text-main">*</span>
            </span>
          </div>
          <TextInput
            text={instagramUrl}
            setText={setInstagramUrl}
            inputRef={instagramRef}
            isValid={
              !isDirty ||
              snsSchema.safeParse({ instagram: instagramUrl }).success
            }
            placeHolderContent="링크 URL을 입력해 주세요."
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="body2-sb flex items-center gap-2 text-black">
            <YoutubeIcon className="h-6 w-6" />
            <span>유튜브</span>
          </div>
          <TextInput
            text={youtubeUrl}
            setText={setYoutubeUrl}
            inputRef={youtubeRef}
            isValid={
              partialSnsSchema.safeParse({ youtube: youtubeUrl }).success
            }
            placeHolderContent="링크 URL을 입력해 주세요."
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="body2-sb flex items-center gap-2 text-black">
            <TiktokIcon className="h-6 w-6" />
            <span>틱톡</span>
          </div>
          <TextInput
            text={tiktokUrl}
            setText={setTiktokUrl}
            inputRef={tiktokRef}
            isValid={partialSnsSchema.safeParse({ tiktok: tiktokUrl }).success}
            placeHolderContent="링크 URL을 입력해 주세요."
          />
        </div>
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="다음"
          disabled={
            !snsSchema.safeParse({
              instagram: instagramUrl,
              tiktok: tiktokUrl,
              youtube: youtubeUrl,
            }).success
          }
          useDisabled={false}
          onClick={handleClickNext}
        />
      </div>

      {/* 스낵바 */}
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
    </div>
  );
};

export default SignupSnsLinkPage;
