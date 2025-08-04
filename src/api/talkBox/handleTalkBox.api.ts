// 스웨거 '질문 관리'
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS, API_DOMAINS } from '@/constants/api';
import {
  QuestionResponse,
  SingleQuestionAnswerDTO,
  UserTalkBoxChat,
} from '@/types/seller/TalkBox.types';
import {
  ApiResponse,
  Pagination,
  PaginationType,
} from '@/types/common/ApiResponse.types';
export const getAllQuestions = async ({
  questionCategoryId,
  isAnswered,
  page = 0,
  size = 10,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
  page?: number;
  size?: number;
}): Promise<QuestionResponse> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ALL_QUESTIONS_IN_CATEGORY, {
      questionCategoryId,
    }),
    {
      params: {
        isAnswered,
        page,
        size,
      },
    }
  );

  return response.data.result;
};

export const getQuestionsByTag = async ({
  questionTagId,
  isAnswered,
  page = 0,
  size = 10,
}: {
  questionTagId: number | null;
  isAnswered: boolean;
  page?: number;
  size?: number;
}): Promise<QuestionResponse> => {
  if (questionTagId === null) {
    throw new Error('questionTagId must not be null');
  }
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_QUESTIONS_BY_TAG, {
      questionTagId,
    }),
    {
      params: {
        isAnswered,
        page,
        size,
      },
    }
  );

  return response.data.result;
};

export const deleteCategoryQuestions = async ({
  itemId,
  questionCategoryId,
  questionIdList,
}: {
  itemId: number;
  questionCategoryId: number;
  questionIdList: number[];
}): Promise<void> => {
  await instance.delete(
    generateApiPath(SELLER_API_DOMAINS.SELLER_DELETE_QUESTIONS_IN_CATEGORY, {
      itemId,
      questionCategoryId,
    }),
    {
      data: { questionIdList },
    }
  );
};

export const getSingleQuestionAnswer = async ({
  itemId,
  questionCategoryId,
  questionTagId,
  questionId,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
  questionId: number;
}): Promise<SingleQuestionAnswerDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.GET_SINGLE_QUESTION_ANSWER, {
      itemId,
      questionCategoryId,
      questionTagId,
      questionId,
    })
  );
  return response.data.result;
};

export const getUserTalkBoxHistory = async ({
  itemId,
  page,
  size,
}: PaginationType & { itemId: number }) => {
  const url = generateApiPath(API_DOMAINS.GET_USER_TALK_BOX_HISTORY, {
    itemId,
  });

  const response = await instance.get<
    ApiResponse<Pagination<UserTalkBoxChat[] | [], 'chatList'>>
  >(url, { params: { page, size } });

  return response.data.result;
};
