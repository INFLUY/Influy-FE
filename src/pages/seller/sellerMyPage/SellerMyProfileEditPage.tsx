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
import { SellerProfileEditValues } from '@/types/seller/SellerProfile';
import { sellerProfileSchema } from '@/schemas/sellerProfileSchema';
import { useForm, FormProvider } from 'react-hook-form';
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
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: sellerProfileMock,
  });
  const {
    handleSubmit,

    formState: { isSubmitting, isValid },
  } = methods;

  const handleSubmitSuccess = async (formData: SellerProfileEditValues) => {
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
        className="flex h-fit w-full flex-col gap-4"
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
                key={name}
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

        {/* 저장하기 버튼 */}
        <section className="fixed bottom-0 z-50 flex w-screen max-w-[40rem] min-w-[20rem] shrink-0 items-center justify-center gap-[.4375rem] border-0 bg-white px-5 pt-2.5 pb-4 md:w-[28rem]">
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
