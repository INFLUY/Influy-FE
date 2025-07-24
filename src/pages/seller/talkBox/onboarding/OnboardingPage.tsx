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

const mockCategories: QuestionCategoryDTO[] = [
  {
    questionCategoryId: 1,
    questionCategoryName: '사이즈',
  },
  {
    questionCategoryId: 2,
    questionCategoryName: '색상',
  },
  {
    questionCategoryId: 3,
    questionCategoryName: '배송',
  },
  {
    questionCategoryId: 4,
    questionCategoryName: '재입고',
  },
  {
    questionCategoryId: 5,
    questionCategoryName: '기타',
  },
];

const OnboardingLayout = () => {
  // TODO: 활성화 되어있다면 아이템 페이지로 나가는 로직 필요
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<QuestionCategoryDTO[]>([]);

  const currentStep = searchParams.get('step'); // 'step' 쿼리 파라미터를 읽습니다.
  console.log(currentStep);

  //   1. 페이지 진입 시 URL의 step 쿼리 파라미터를 읽고, 없으면 activate로 리디렉트
  useEffect(() => {
    if (
      !currentStep ||
      (currentStep !== 'activate' && currentStep !== 'categorize')
    ) {
      navigate(`?step=activate`, { replace: true });
    }
  }, [currentStep, itemId, navigate]);

  useEffect(() => {
    if (currentStep === 'categorize') {
      setCategory(mockCategories);
    }
  }, [currentStep]);

  const handleActivateNext = () => {
    // 다음 단계인 'categorize'로 쿼리 파라미터 변경
    setSearchParams({ step: 'categorize' });
  };

  // 3. '설정 완료' 버튼 (카테고리 설정 화면) 클릭 시 호출될 함수
  const handleCategorizeFinish = () => {
    const path = generatePath(
      `../../${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.tabs.pending}`,
      {
        itemId: String(itemId),
      }
    );
    navigate(path, { replace: true, state: { isOnboarding: true } });
  };

  // step 값에 따라 적절한 화면(컴포넌트)을 렌더링
  const renderStepComponent = () => {
    switch (currentStep) {
      case 'activate':
        // itemId를 props로 전달하여 각 화면에서 활용할 수 있도록 함
        return <ActivateStep onNext={handleActivateNext} />;
      case 'categorize':
        // itemId를 props로 전달하여 각 화면에서 활용할 수 있도록 함
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
          <TalkBoxQuestionItemCard
            title="헤이드 리본 레이어드 티"
            tagline="[소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템!"
            imgUrl="/img1.png"
          />
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
