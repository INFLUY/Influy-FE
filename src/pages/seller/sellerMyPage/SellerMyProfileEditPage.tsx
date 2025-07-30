import {
  PageHeader,
  ProfileEditWrapper,
  ProfileImageUploader,
  FormLimitedTextInput,
  FormSNSInput,
  FormEmailInput,
  BackgroundImageUploader,
  DefaultButton,
  LoadingSpinner,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { SellerProfileType } from '@/types/seller/SellerProfile.types';
import { sellerProfileSchema } from '@/schemas/sellerProfileSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';

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

  if (!sellerMyProfile) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const methods = useForm<SellerProfileType>({
    resolver: standardSchemaResolver(sellerProfileSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      id: sellerMyProfile.id,
      sellerId: sellerMyProfile.sellerId,
      username: sellerMyProfile.username,
      nickname: sellerMyProfile.nickname,
      backgroundImg: sellerMyProfile.backgroundImg ?? undefined,
      profileImg: sellerMyProfile.profileImg ?? undefined,
      instagram: 'https://www.instagram.com/' + sellerMyProfile.instagram,
      tiktok: sellerMyProfile.tiktok ?? undefined,
      youtube: sellerMyProfile.youtube ?? undefined,
      email: sellerMyProfile.email ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const handleSubmitSuccess = async (formData: SellerProfileType) => {
    // 서버 제출용 데이터로 가공
    console.log('성공: ', formData);
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
        <section className="fixed bottom-0 z-20 flex w-screen max-w-[40rem] min-w-[20rem] shrink-0 items-center justify-center gap-[.4375rem] border-0 bg-white px-5 pt-2.5 pb-4 md:w-[28rem]">
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
