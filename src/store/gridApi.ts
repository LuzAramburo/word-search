import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { GameStateFactoryResponse, generateGrid } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.ts';

export interface GridParams {
  subject: WordListSubjects;
  difficulty?: number;
}

const customBaseQuery: BaseQueryFn<{arg: GridParams}, GameStateFactoryResponse> = async ({ arg }) => {
  try {
    const result = await generateGrid(arg);
    return { data: result };
  } catch (error) {
    return { error: { status: 'CUSTOM_ERROR', data: error } };
  }
};

export const gridApi = createApi({
  reducerPath: 'gridApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    generateGrid: builder.query<GameStateFactoryResponse, GridParams>({
      query: (arg) => ({ arg }),
    }),
  }),
});

export const { useGenerateGridQuery } = gridApi;
