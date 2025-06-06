import {
  TipTooltip,
  CategoryMultiSelector,
  FormLinkInput,
  ItemImageUploader,
  FormPriceInput,
  FormSalePriceInput,
  PeriodDropdown,
  DateTimePicker,
  ItemSection,
  FormWideTextArea,
  FormLimitedTextInput,
} from '@/components';
import BottomSheet from '@/components/common/BottomSheet';
import CalendarIcon from '@/assets/icon/common/Calendar.svg?react';
import { useEffect, useState } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { ItemFormValues } from '@/types/item.types';
import CheckBoxOnIcon from '@/assets/icon/common/CheckBox24On.svg?react';
import CheckBoxOffIcon from '@/assets/icon/common/CheckBox24Off.svg?react';

interface ItemFormProps {
  mode: 'create' | 'edit';
  imagesWrapperRef: React.RefObject<HTMLDivElement | null>;
  categoryWrapperRef: React.RefObject<HTMLDivElement | null>;
  startDateWrapperRef: React.RefObject<HTMLDivElement | null>;
  endDateWrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const ItemForm = ({
  mode,
  imagesWrapperRef,
  categoryWrapperRef,
  startDateWrapperRef,
  endDateWrapperRef,
}: ItemFormProps) => {
  const [isStartDateTimeSheetOpen, setIsStartDateTimeSheetOpen] =
    useState(false);
  const [isEndDateTimeSheetOpen, setIsEndDateTimeSheetOpen] = useState(false);

  const { control } = useFormContext<ItemFormValues>();

  // 1. startISODateTime 용 useController
  const {
    field: { value: startISODateTime, onChange: onStartISOChange },
  } = useController({
    name: 'startISODateTime',
    control,
  });

  // 2. hasStartDate 용 useController
  const {
    field: { value: hasStartDate, onChange: onHasStartDateChange },
  } = useController({
    name: 'hasStartDate',
    control,
  });

  // 3. endISODateTime 용 useController
  const {
    field: { value: endISODateTime, onChange: onEndISOChange },
  } = useController({
    name: 'endISODateTime',
    control,
  });
  // 4. hasEndDate 용 useController
  const {
    field: { value: hasEndDate, onChange: onHasEndDateChange },
  } = useController({
    name: 'hasEndDate',
    control,
  });

  const handleNoStartDate = () => {
    if (startISODateTime) {
      onStartISOChange(null);
    } else if (hasStartDate && !startISODateTime) {
      onHasStartDateChange(false);
      onStartISOChange(undefined);
    } else {
      onHasStartDateChange(true);
      onStartISOChange(null);
    }
  };

  const handleNoEndDate = () => {
    if (endISODateTime) {
      onEndISOChange(null);
    } else if (hasEndDate && !endISODateTime) {
      onHasEndDateChange(false);
      onEndISOChange(undefined);
    } else {
      onHasEndDateChange(true);
      onEndISOChange(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '달력에서 시작일과 시간을 선택하세요.';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <section className="mb-[8.25rem] box-border flex flex-col items-start gap-8">
      {/* 사진 업로드 */}
      <article
        ref={imagesWrapperRef}
        tabIndex={-1}
        className="flex h-fit w-full flex-col items-start"
      >
        <p className="body1-b w-full px-5 py-0 text-black">사진 *</p>
        <ItemImageUploader name="images" />

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
        />
      </ItemSection>

      {/* 상품 카테고리 */}
      <ItemSection
        label="상품 카테고리 *"
        tooltipText="1개 이상, 최대 3가지의 카테고리를 선택할 수 있습니다!"
      >
        <CategoryMultiSelector
          name="selectedCategoryList"
          ref={categoryWrapperRef}
        />
      </ItemSection>

      {/* 기간 */}
      <ItemSection label="기간 *">
        <div className="flex w-full flex-col items-start gap-4">
          {/* 시작일 */}
          <div
            ref={startDateWrapperRef}
            tabIndex={-1}
            className="flex w-full flex-col items-start justify-center gap-1.5"
          >
            <p className="caption-m">시작일</p>
            <div className="body2-m border-grey03 flex h-fit w-full items-center justify-between rounded-sm border px-3.5 py-2.5">
              <span className="text-grey06">
                {formatDate(startISODateTime)}
              </span>
              <button
                type="button"
                onClick={() => setIsStartDateTimeSheetOpen(true)}
              >
                <CalendarIcon />
              </button>
            </div>
          </div>

          {/* 시작 없어요 체크박스 */}
          <div className="text-grey10 body2-m flex items-center gap-[0.5rem]">
            <button
              onClick={handleNoStartDate}
              type="button"
              className="cursor-pointer"
            >
              {!startISODateTime && hasStartDate ? (
                <CheckBoxOnIcon />
              ) : (
                <CheckBoxOffIcon />
              )}
            </button>
            시작일이 없어요
          </div>

          {/* 마감일 */}
          <div
            ref={endDateWrapperRef}
            tabIndex={-1}
            className="flex w-full flex-col items-start justify-center gap-1.5"
          >
            <p className="caption-m">마감일</p>
            <div className="body2-m border-grey03 flex h-fit w-full items-center justify-between rounded-sm border px-3.5 py-2.5">
              <span className="text-grey06">{formatDate(endISODateTime)}</span>
              <CalendarIcon onClick={() => setIsEndDateTimeSheetOpen(true)} />
            </div>
          </div>

          {/* 마감일 없어요 체크박스 */}
          <div className="text-grey10 body2-m flex items-center gap-[0.5rem]">
            <button
              onClick={handleNoEndDate}
              className="cursor-pointer"
              type="button"
            >
              {!endISODateTime && hasEndDate ? (
                <CheckBoxOnIcon />
              ) : (
                <CheckBoxOffIcon />
              )}
            </button>
            마감일이 없어요
          </div>
        </div>
      </ItemSection>

      {/* 시작일 날짜 바텀 시트 */}
      {isStartDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsStartDateTimeSheetOpen(false)}
          isBottomSheetOpen={isStartDateTimeSheetOpen}
        >
          <DateTimePicker
            dateTimeName="startISODateTime"
            hasDateName="hasStartDate"
            type="시작일"
            onClose={() => setIsStartDateTimeSheetOpen(false)}
          />
        </BottomSheet>
      )}

      {/* 마감일 바텀 시트 */}
      {isEndDateTimeSheetOpen && (
        <BottomSheet
          onClose={() => setIsEndDateTimeSheetOpen(false)}
          isBottomSheetOpen={isEndDateTimeSheetOpen}
        >
          <DateTimePicker
            dateTimeName="endISODateTime"
            hasDateName="hasEndDate"
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
        />
      </ItemSection>

      {/* 가격 */}
      <ItemSection label="가격 *">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">정가</p>
            <FormPriceInput name="price" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1.5">
            <p className="caption-m">할인가</p>
            <FormSalePriceInput name="salePrice" />
          </div>
        </div>
      </ItemSection>

      {/* 판매 링크 */}
      <ItemSection label="판매 링크">
        <FormLinkInput name="linkText" />
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
