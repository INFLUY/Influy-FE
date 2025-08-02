import {
  PageHeader,
  ProfileEditWrapper,
  ProfileImageUploader,
  FormLimitedTextInput,
  FormSNSInput,
  FormEmailInput,
  BackgroundImageUploader,
  DefaultButton,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  SellerEditProfileType,
  SellerProfileType,
} from '@/types/seller/SellerProfile.types';
import { sellerProfileSchema } from '@/schemas/sellerProfileSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import { useEffect } from 'react';
import { usePatchSellerProfile } from '@/services/seller/mutation/usePatchSellerProfile';

const snsInputs = [
  {
    name: 'instagram',
    placeholder: 'https://www.instagram.com/',
    icon: (
      <InstagramIcon className="text-grey10" aria-label="인스타그램 아이콘" />
    ),
  },
  {
    name: 'youtube',
    placeholder: 'https://www.youtube.com/',
    icon: <YoutubeIcon className="text-grey10" aria-label="유튜브 아이콘" />,
  },
  {
    name: 'tiktok',
    placeholder: 'https://www.tiktok.com/@',
    icon: <TiktokIcon className="text-grey10" aria-label="틱톡 아이콘" />,
  },
] as const;

const SellerMyProfileEditPage = () => {
  const navigate = useNavigate();

  const { data: sellerMyProfile } = useGetSellerProfile();

  const methods = useForm<SellerProfileType>({
    resolver: standardSchemaResolver(sellerProfileSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nickname: '',
      backgroundImg: null,
      profileImg: null,
      instagram: 'https://www.instagram.com/',
      tiktok: '',
      youtube: '',
      email: '',
    },
  });

  useEffect(() => {
    if (sellerMyProfile)
      methods.reset({
        nickname: sellerMyProfile.nickname,
        backgroundImg: sellerMyProfile.backgroundImg ?? null,
        profileImg: sellerMyProfile.profileImg ?? null,
        instagram: 'https://www.instagram.com/' + sellerMyProfile.instagram,
        tiktok: sellerMyProfile.tiktok ?? '',
        youtube: sellerMyProfile.youtube ?? '',
        email: sellerMyProfile.email ?? '',
      });
  }, [sellerMyProfile]);

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const { mutate: patchSellerProfile } = usePatchSellerProfile(() =>
    navigate(-1)
  );

  const handleSubmitSuccess = async (formData: SellerProfileType) => {
    const {
      nickname,
      profileImg,
      backgroundImg,
      email,
      instagram,
      tiktok,
      youtube,
    } = formData;

    const isValid = (val: unknown): val is string =>
      val !== undefined && val !== null && val !== '';

    const formattedData: SellerEditProfileType = {
      profile: {
        nickname,
        profileUrl: profileImg,
      },
      backgroundImg,
      ...(isValid(email) && { email }),
      instagram,
      ...(isValid(tiktok) && { tiktok }),
      ...(isValid(youtube) && { youtube }),
    };

    patchSellerProfile({ data: formattedData });
  };

  return (
    <FormProvider {...methods}>
      {/* 상단바 */}
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
            role="button"
            aria-label="뒤로 가기"
          />,
        ]}
        additionalStyles="bg-white"
      >
        프로필 수정
      </PageHeader>

      <form
        className="flex h-fit w-full flex-col gap-4 pt-11"
        onSubmit={handleSubmit(handleSubmitSuccess)}
      >
        {/* 상단 background image */}
        <BackgroundImageUploader name="backgroundImg" />

        <div className="mb-30 flex flex-col items-start gap-8 self-stretch">
          {/* 프로실 사진 */}
          <ProfileEditWrapper title="프로필사진">
            <ProfileImageUploader name="profileImg" />
          </ProfileEditWrapper>

          {/* nickname input */}
          <ProfileEditWrapper title="닉네임">
            <FormLimitedTextInput<SellerProfileType>
              name="nickname"
              maxLength={8}
              placeHolderContent="닉네임"
              rows={1}
            />
          </ProfileEditWrapper>

          {/* SNS inputs */}
          <ProfileEditWrapper title="SNS 설정">
            {snsInputs.map(({ name, placeholder, icon }) => (
              <FormSNSInput<SellerProfileType>
                key={name}
                name={name}
                placeholder={placeholder}
                icon={icon}
              />
            ))}
          </ProfileEditWrapper>

          {/* email input */}
          <ProfileEditWrapper title="이메일">
            <FormEmailInput<SellerProfileType> name="email" />
          </ProfileEditWrapper>
        </div>

        {/* 저장하기 버튼 */}
        <section className="fixed bottom-0 z-20 flex w-screen max-w-[640px] min-w-[320px] shrink-0 items-center justify-center gap-[7px] border-0 bg-white px-5 pt-2.5 pb-4 md:w-[448px]">
          <DefaultButton
            type="submit"
            text="저장하기"
            disabled={isSubmitting || !isValid}
            useDisabled={false}
          />
        </section>
      </form>
    </FormProvider>
  );
};
export default SellerMyProfileEditPage;
