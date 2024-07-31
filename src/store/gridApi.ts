import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { GameDifficultyType, GameStateFactoryResponse, generateGrid } from '@/utils/GameStateFactory.ts';
import { setGrid } from '@/store/gameSlice.ts';
import { WordListSubjects } from '@/utils/word-list-builder.ts';

export interface GridParams {
  subject: WordListSubjects;
  difficulty?: GameDifficultyType;
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setGrid(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGenerateGridQuery } = gridApi;
