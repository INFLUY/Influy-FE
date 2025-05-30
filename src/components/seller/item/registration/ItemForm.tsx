import {
  SaveButton,
  DefaultButton,
  LimitedTextInput,
  TipTooltip,
  CategoryMultiSelector,
  LinkInput,
  CategoryChip,
  WideTextArea,
  ItemImageUploader,
  PriceInput,
  SalePriceInput,
  PeriodDropdown,
  DatePickerCalender,
  TimePickerWheel,
  DateTimePicker,
  ItemSection,
  FormWideTextArea,
  FormLimitedTextInput,
} from '@/components';
import BottomSheet from '@/components/common/BottomSheet';
import CalendarIcon from '@/assets/icon/common/Calendar.svg?react';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ItemFormValues } from '@/types/item.types';
import CheckBoxOffIcon from '@/assets/icon/common/CheckBox24On.svg?react';
import CheckBoxOnIcon from '@/assets/icon/common/CheckBox24Off.svg?react';

interface ItemFormProps {
  mode: 'create' | 'edit';
}

export const ItemForm = ({ mode }: ItemFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isStartDateTimeSheetOpen, setIsStartDateTimeSheetOpen] =
    useState(false);
  const [isEndDateTimeSheetOpen, setIsEndDateTimeSheetOpen] = useState(false);

  const { watch, setValue } = useFormContext<ItemFormValues>();

  const hasStartDate = watch('hasStartDate');
  const handleSaveClick = () => {};

  return (
    <section className="box-border flex flex-col items-start gap-8">
      {/* 사진 업로드 */}

      <article className="flex h-fit w-full flex-col items-start">
        <p className="body1-b w-full px-5 py-0 text-black">사진 *</p>
        <ItemImageUploader
          images={images}
          onAddImage={(file) => {
            const url = URL.createObjectURL(file);
            setImages((prev) => [...prev, url]);
          }}
          onRemoveImage={(index) => {
            setImages((prev) => prev.filter((_, i) => i !== index));
          }}
        />
        <div className="w-full px-5">
          <TipTooltip text="첫 번째로 선택한 사진이 대표 사진으로 등록돼요!" />
        </div>
      </article>

      {/* 제목 */}
      <ItemSection label="제목 *">
        <FormLimitedTextInput
          name="titleText"
          maxLength={40}
          placeHolderContent="상품의 이름을 입력해 주세요."
          isRequired={true}
        />
      </ItemSection>

      {/* 상품 카테고리 */}
      <ItemSection
        label="상품 카테고리 *"
        tooltipText="1개 이상, 최대 3가지의 카테고리를 선택할 수 있습니다!"
      >
        <CategoryMultiSelector name="selectedCategoryList" />
      </ItemSection>

      {/* 기간 */}
      <ItemSection label="기간 *">
        <div className="flex w-full flex-col items-start gap-4">
          {/* 시작일 */}
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">시작일</p>
            <div className="body2-m border-grey03 flex h-fit w-full items-center justify-between rounded-sm border px-3.5 py-2.5">
              <span className="text-grey06">
                달력에서 시작일과 시간을 선택하세요.
              </span>
              <CalendarIcon onClick={() => setIsStartDateTimeSheetOpen(true)} />
            </div>
          </div>
          <div className="text-grey08 caption-m flex cursor-pointer items-center gap-[.375rem]">
            {hasStartDate ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
            진행 중인 상품만 보기
          </div>

          {/* 마감일 */}
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">마감일</p>
            <SalePriceInput name="salePrice" />
          </div>
        </div>
      </ItemSection>
      {/* 날짜 바텀 시트 */}
      {isStartDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsStartDateTimeSheetOpen(false)}
          isBottomSheetOpen={isStartDateTimeSheetOpen}
        >
          <DateTimePicker
            name="startISODateTime"
            type="시작일"
            onClose={() => setIsStartDateTimeSheetOpen(false)}
          />
        </BottomSheet>
      )}

      {/* 날짜 */}
      {isEndDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsEndDateTimeSheetOpen(false)}
          isBottomSheetOpen={isEndDateTimeSheetOpen}
        >
          <DateTimePicker
            name="endISODateTime"
            type="마감일"
            onClose={() => setIsEndDateTimeSheetOpen(false)}
          />
        </BottomSheet>
      )}

      {/* 한 줄 소개 */}
      <ItemSection
        label="한 줄 소개 *"
        tooltipText="제품의 특징을 간단하게 소개해 주세요!"
      >
        <FormLimitedTextInput
          name="summaryText"
          maxLength={18}
          placeHolderContent="제품 한 줄 소개를 입력해 주세요."
          isRequired={true}
        />
      </ItemSection>

      {/* 가격 */}
      <ItemSection label="가격 *">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">정가</p>
            <PriceInput name="price" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">할인가</p>
            <SalePriceInput name="salePrice" />
          </div>
        </div>
      </ItemSection>

      {/* 판매 링크 */}
      <ItemSection label="판매 링크">
        <LinkInput name="linkText" />
      </ItemSection>

      {/* 진행 회차 */}
      <ItemSection label="진행 회차">
        <PeriodDropdown name={'period'} />
      </ItemSection>

      {/* COMMENT */}
      <ItemSection label="COMMENT">
        <FormWideTextArea name={'commentText'} />
      </ItemSection>
    </section>
  );
};

/////////////

export const ItemRegistrationTest = () => {
  const [titleText, setTitleText] = useState('');
  const [linkText, setLinkText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [period, setPeriod] = useState<number | null>(null);
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>(
    []
  );

  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const [isStartDateTimeSheetOpen, setIsStartDateTimeSheetOpen] =
    useState(false);
  const [isEndDateTimeSheetOpen, setIsEndDateTimeSheetOpen] = useState(false);

  const handleSaveClick = () => {};
  useEffect(() => {
    console.log(isStartDateTimeSheetOpen);
  }, [isStartDateTimeSheetOpen]);
  return (
    <div className="box-border flex flex-col gap-y-10 px-5">
      <CategoryChip text={'뷰티'} />

      {/* 날짜 */}
      {isStartDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsStartDateTimeSheetOpen(false)}
          isBottomSheetOpen={isStartDateTimeSheetOpen}
        >
          <DateTimePicker
            name="startISODateTime"
            type="시작일"
            onClose={() => setIsStartDateTimeSheetOpen(false)}
          />
        </BottomSheet>
      )}

      {/* 날짜 */}
      {isEndDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsEndDateTimeSheetOpen(false)}
          isBottomSheetOpen={isEndDateTimeSheetOpen}
        >
          <DateTimePicker
            name="endISODateTime"
            type="마감일"
            onClose={() => setIsEndDateTimeSheetOpen(false)}
          />
        </BottomSheet>
      )}

      <SaveButton onClick={handleSaveClick} />
      <div className="bg-grey01 flex h-[5.5rem] w-full shrink-0 items-center justify-center gap-[.4375rem] px-5 pt-[.4375rem] pb-8">
        <DefaultButton
          onClick={handleSaveClick}
          disabled={false}
          activeColor="bg-red-300"
        />
        <DefaultButton onClick={handleSaveClick} />
      </div>
      <LimitedTextInput
        text={titleText}
        setText={setTitleText}
        maxLength={45}
        placeHolderContent="상품의 이름을 입력해 주세요."
        isRequired={true}
      />
      <LinkInput
        text={linkText}
        setText={setLinkText}
        placeHolderContent="링크 URL을 입력해 주세요."
        isRequired={true}
      />
      <WideTextArea
        text={commentText}
        setText={setCommentText}
        placeHolderContent="제품 선택 이유, 특징, 사용 경험 등 제품의 매력을 보여줄 수 있는 내용을 자유롭게 작성해 주세요."
        isRequired={true}
      />

      <TipTooltip
        text={
          '최대 3가지 카테고리를 선택할 수 있습니다!최대 3가지 카테고리를 선택할 수 있습니다!최대 3가지 카테고리를 선택할 수 있습니다!'
        }
      />
    </div>
  );
};
