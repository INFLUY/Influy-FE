const QuestionCountBadge = ({ count }: { count: number }) => {
  return (
    <div
      aria-label={`미응답 질문 ${count}개`}
      role="status"
      className="bg-main caption-m rounded-full px-[.4375rem] py-[.1875rem] text-white"
    >
      {count < 1000 ? count : '999+'}
    </div>
  );
};

export default QuestionCountBadge;
