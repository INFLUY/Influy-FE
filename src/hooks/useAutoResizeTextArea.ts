import { useEffect, RefObject } from 'react';

/**
 * textarea의 높이를 내용에 따라 자동으로 조절해주는 커스텀 훅
 *
 * @param ref - textarea 요소의 ref
 * @param value - textarea의 현재 값 (내용이 변경될 때마다 높이 조절)
 */
const useAutoResizeTextArea = (
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
  maxLines?: number
) => {
  useEffect(() => {
    if (ref?.current) {
      const maxHeight = maxLines ? 21 * maxLines : Infinity;
      ref.current.style.height = 'auto'; // 높이 초기화
      ref.current.style.height = `${Math.min(maxHeight, ref.current.scrollHeight)}px`; // 스크롤 높이에 맞춰 자동 조절
    }
  }, [value, ref, maxLines]);
};

export default useAutoResizeTextArea;
