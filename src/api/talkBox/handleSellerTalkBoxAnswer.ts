// swagger 셀러 톡박스 답변
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { TagAnswerResponse, AnswerType } from '@/types/seller/TalkBox.types';

export const getTagAnswers = async ({
  itemId,
  questionCategoryId,
  questionTagId,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
}): Promise<TagAnswerResponse> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ANSWER, {
      itemId,
      questionCategoryId,
    }),
    {
      params: {
        questionTagId,
      },
    }
  );

  return response.data.result;
};

export interface PostBulkAnswerRequest {
  questionIdList: number[];
  answerContent: string;
}

export interface PostBulkAnswerResponse {
  answeredCnt: number;
  answerDtoList: {
    questionId: number;
    answerId: number;
    answerType: AnswerType;
  }[];
}

export const postBulkAnswer = async ({
  itemId,
  questionCategoryId,
  data,
}: {
  itemId: number;
  questionCategoryId: number;
  data: PostBulkAnswerRequest;
}): Promise<PostBulkAnswerResponse> => {
  const response = await instance.post(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ANSWER, {
      itemId,
      questionCategoryId,
    }),
    data
  );

  return response.data.result;
};

export interface PostIndividualAnswerRequest {
  answerContent: string;
}

export interface PostIndividualAnswerResponse {
  questionId: number;
  answerId: number;
  answerType: AnswerType;
}

export const postIndividualAnswer = async ({
  itemId,
  questionCategoryId,
  questionTagId,
  questionId,
  answerContent,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
  questionId: number;
  answerContent: string;
}): Promise<PostIndividualAnswerResponse> => {
  const response = await instance.post(
    generateApiPath(SELLER_API_DOMAINS.POST_INDIVIDUAL_ANSWER, {
      itemId,
      questionCategoryId,
      questionTagId,
      questionId,
    }),
    {
      answerContent,
    },
    {
      params: {
        answerType: 'INDIVIDUAL',
      },
    }
  );

  return response.data.result;
};
