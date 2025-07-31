import { PageHeader, TalkBoxQuestionItemCard } from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import {
  useNavigate,
  useParams,
  useSearchParams,
  generatePath,
} from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useEffect, useState } from 'react';
import {
  ActivateStep,
  CategorizeStep,
} from '@/components/seller/talkBox/onboarding/OnboardingStep';
import { QuestionCategoryDTO } from '@/types/seller/TalkBox.types';

//api
import { usePostGenerateQuestionCategory } from '@/services/talkBox/mutation/usePostGenerateQuestionCategory';
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { usePostTalkBoxOpenStatus } from '@/services/sellerItem/mutation/usePostTalkBoxOpenStatus';
import { usePostAddQuestionCategories } from '@/services/talkBox/mutation/usePostAddQuestionCategories';

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string[]>([]);

  const currentStep = searchParams.get('step');

  //  페이지 진입 시 URL의 step 쿼리 파라미터를 읽고, 없으면 activate로 리디렉트
  useEffect(() => {
    if (
      !currentStep ||
      (currentStep !== 'activate' && currentStep !== 'categorize')
    ) {
      navigate(`?step=activate`, { replace: true });
    }
    if (currentStep === 'categorize') {
      postGenerateQuestionCategory();
    }
  }, [currentStep, itemId]);

  // 하단 상품 정보 get api
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });

  // 카테고리 생성 post api
  const { mutate: postGenerateQuestionCategory } =
    usePostGenerateQuestionCategory({
      itemId: Number(itemId),
      onSuccessCallback: (data: string[]) => {
        console.log(data);
        setCategory(data);
      },
    });

  const { mutate: updateStatus } = usePostTalkBoxOpenStatus({
    itemId: Number(itemId),
    openStatus: 'OPENED',
  });

  const { mutate: addCategories } = usePostAddQuestionCategories({
    itemId: Number(itemId),
  });

  // 다음 단계인 'categorize'로 쿼리 파라미터 변경
  const handleActivateNext = () => {
    setSearchParams({ step: 'categorize' });
  };

  // 맨 마지막의 '설정 완료' 버튼  클릭 시 호출될 함수
  const handleCategorizeFinish = async () => {
    // 질문 카테고리 생성
    addCategories(category);
    // 톡박스 활성화
    updateStatus();
    const path = generatePath(
      `../../${PATH.SELLER.TALKBOX.ITEM.BASE}/${PATH.SELLER.TALKBOX.ITEM.TABS.PENDING}`,
      {
        itemId: String(itemId),
      }
    );
    await navigate(path, { replace: true, state: { isOnboarding: true } });
  };

  // step 값에 따라 적절한 화면(컴포넌트)을 렌더링
  const renderStepComponent = () => {
    switch (currentStep) {
      case 'activate':
        return <ActivateStep onNext={handleActivateNext} />;
      case 'categorize':
        return (
          <CategorizeStep
            onFinish={handleCategorizeFinish}
            category={category}
            setCategory={setCategory}
          />
        );
    }
  };

  return (
    <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <PageHeader
        leftIcons={[
          <XIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
            role="button"
            aria-label="뒤로 가기"
            tabIndex={0}
          />,
        ]}
        additionalStyles="border-0"
      >
        질문관리 시작
      </PageHeader>
      <section className="relative flex h-screen w-full flex-col items-end gap-11 pt-4">
        <div className="flex w-full flex-col gap-6 px-5">
          {itemOverview && (
            <TalkBoxQuestionItemCard
              itemName={itemOverview.itemName}
              tagline={itemOverview.tagline}
              mainImg={itemOverview.mainImg}
            />
          )}

          {/* 볼드 안내 문구 */}
          <p className="headline3 w-full font-bold text-black">
            {currentStep === 'activate' ? (
              <>
                이 상품의 톡박스를 시작하려면,
                <br />
                버튼을 활성화해 주세요.
              </>
            ) : currentStep === 'categorize' ? (
              <>
                분류기준을 등록하면,
                <br />
                AI가 질문을 자동으로 분류해줘요.
                <br />
                질문을 이런 식으로 나눠볼까요?
              </>
            ) : (
              <></>
            )}
          </p>
        </div>

        {renderStepComponent()}
      </section>
    </section>
  );
};
export default OnboardingLayout;
