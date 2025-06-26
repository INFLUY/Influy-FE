import {
  PageHeader,
  ProfileEditWrapper,
  ProfileImageUploader,
  FormLimitedTextInput,
  FormSNSInput,
  FormEmailInput,
  BackgroundImageUploader,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import { SellerProfileEditValues } from '@/types/seller/SellerProfile';
import { sellerProfileSchema } from '@/schemas/sellerProfileSchema';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

const snsInputs = [
  {
    name: 'instagram',
    placeholder: 'https://instagram.com/',
    icon: (
      <div
        className="bg-grey02 h-6 w-6 border-0"
        aria-label="인스타그램 아이콘"
      />
    ),
  },
  {
    name: 'youtube',
    placeholder: 'https://www.youtube.com/',
    icon: (
      <div className="bg-grey02 h-6 w-6 border-0" aria-label="유튜브 아이콘" />
    ),
  },
  {
    name: 'tiktok',
    placeholder: 'https://www.tiktok.com/@',
    icon: (
      <div className="bg-grey02 h-6 w-6 border-0" aria-label="틱톡 아이콘" />
    ),
  },
] as const;

const sellerProfileMock: SellerProfileEditValues = {
  backgroundImg: '',
  profileImg: '',
  nickname: '소현소현',
  instagram: '',
  youtube: '',
  tiktok: 'https://www.tiktok.com/@소현소현',
  email: 'influy@gmail.com',
  isPublic: true,
};
const SellerMyProfileEditPage = () => {
  const navigate = useNavigate();

  const methods = useForm<SellerProfileEditValues>({
    resolver: standardSchemaResolver(sellerProfileSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: sellerProfileMock,
  });
  const {
    handleSubmit,
    setFocus,
    control,
    formState: { isSubmitting },
  } = methods;

  const [nickname, instagram, youtube, tiktok, email] = useWatch({
    control,
    name: ['nickname', 'instagram', 'youtube', 'tiktok', 'email'] as const,
  });

  const handleSubmitSuccess = () => {};
  const handleSubmitFailed = () => {};

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
      >
        프로필 수정
      </PageHeader>

      <form
        className="flex h-fit w-full flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailed)}
      >
        {/* 상단 background image */}
        <BackgroundImageUploader name="backgroundImg" />

        <div className="flex flex-col items-start gap-8 self-stretch">
          {/* 프로실 사진 */}
          <ProfileEditWrapper title="프로필사진">
            <ProfileImageUploader name="profileImg" />
          </ProfileEditWrapper>

          {/* nickname input */}
          <ProfileEditWrapper title="닉네임">
            <FormLimitedTextInput<SellerProfileEditValues>
              name="nickname"
              maxLength={8}
              placeHolderContent="기존 nickname"
              rows={1}
            />
          </ProfileEditWrapper>

          {/* SNS inputs */}
          <ProfileEditWrapper title="SNS 설정">
            {snsInputs.map(({ name, placeholder, icon }) => (
              <FormSNSInput<SellerProfileEditValues>
                name={name}
                placeholder={placeholder}
                icon={icon}
              />
            ))}
          </ProfileEditWrapper>

          {/* email input */}
          <ProfileEditWrapper title="이메일">
            <FormEmailInput<SellerProfileEditValues> name="email" />
          </ProfileEditWrapper>
        </div>
      </form>
    </FormProvider>
  );
};
export default SellerMyProfileEditPage;
