// TODO: remove this eslint
/* eslint-disable @typescript-eslint/naming-convention */

import {
  type QueryFunction,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQueries,
} from '@tanstack/react-query'
import type { UseSuspenseQueryResultOnLoading, UseSuspenseQueryResultOnSuccess } from './useSuspenseQuery'

// Avoid TS depth-limit error in case of large array literal
type MAXIMUM_DEPTH = 20

type UseQueryOptionsForUseSuspenseQueries<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TEnabled extends boolean | undefined = true,
> = Omit<UseQueryOptions<TQueryFnData, unknown, TData, TQueryKey>, 'context' | 'suspense'> & {
  enabled?: TEnabled
}

interface ToInferOption<TQueryFnData, TQueryKey extends QueryKey> {
  queryFn?: QueryFunction<TQueryFnData, TQueryKey>
}
interface ToInferWithEnabledOption<TQueryFnData, TQueryKey extends QueryKey, TEnabled>
  extends ToInferOption<TQueryFnData, TQueryKey> {
  enabled: TEnabled
}
interface ToInferWithSelectOption<TQueryFnData, TData, TQueryKey extends QueryKey>
  extends ToInferOption<TQueryFnData, TQueryKey> {
  select?: (data: any) => TData
}
interface ToInferWithSelectEnabledOption<TQueryFnData, TData, TQueryKey extends QueryKey, TEnabled>
  extends ToInferWithEnabledOption<TQueryFnData, TQueryKey, TEnabled> {
  select?: (data: any) => TData
}

type GetOption<T> =
  // enabled: false
  T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, infer TQueryKey, false>
    ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey, false>
    : T extends ToInferWithEnabledOption<infer TQueryFnData, infer TQueryKey, false>
      ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TQueryFnData, TQueryKey, false>
      : // enabled: true
        T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, infer TQueryKey, true>
        ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey>
        : T extends ToInferWithEnabledOption<infer TQueryFnData, infer TQueryKey, true>
          ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TQueryFnData, TQueryKey>
          : // enabled: boolean
            T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, infer TQueryKey, boolean>
            ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey, boolean>
            : T extends ToInferWithEnabledOption<infer TQueryFnData, infer TQueryKey, boolean>
              ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TQueryFnData, TQueryKey, boolean>
              : // enabled: undefined
                T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, infer TQueryKey, undefined>
                ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey>
                : T extends ToInferWithEnabledOption<infer TQueryFnData, infer TQueryKey, undefined>
                  ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TQueryFnData, TQueryKey>
                  : // no enabled
                    T extends ToInferWithSelectOption<infer TQueryFnData, infer TData, infer TQueryKey>
                    ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey>
                    : T extends ToInferOption<infer TQueryFnData, infer TQueryKey>
                      ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TQueryFnData, TQueryKey>
                      : UseQueryOptionsForUseSuspenseQueries

type SuspenseQueriesOptions<
  T extends unknown[],
  TResult extends unknown[] = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? UseQueryOptionsForUseSuspenseQueries[]
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResult, GetOption<Head>]
      : T extends [infer Head, ...infer Tail]
        ? SuspenseQueriesOptions<[...Tail], [...TResult, GetOption<Head>], [...TDepth, 1]>
        : unknown[] extends T
          ? T
          : T extends UseQueryOptionsForUseSuspenseQueries<infer TQueryFnData, infer TData, infer TQueryKey>[]
            ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TData, TQueryKey>[]
            : UseQueryOptionsForUseSuspenseQueries[]

// results
type GetResult<T> = T extends { queryFnData: any; data: infer TData }
  ? UseSuspenseQueryResultOnSuccess<TData>
  : T extends { queryFnData: infer TQueryFnData }
    ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
    : T extends { data: infer TData }
      ? UseSuspenseQueryResultOnSuccess<TData>
      : T extends [any, infer TData]
        ? UseSuspenseQueryResultOnSuccess<TData>
        : T extends [infer TQueryFnData]
          ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
          : T extends [infer TQueryFnData]
            ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
            : // enabled: false
              T extends ToInferWithSelectEnabledOption<unknown, unknown, QueryKey, false>
              ? UseSuspenseQueryResultOnLoading
              : T extends ToInferWithEnabledOption<unknown, QueryKey, false>
                ? UseSuspenseQueryResultOnLoading
                : // enabled: true
                  T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, QueryKey, true>
                  ? UseSuspenseQueryResultOnSuccess<unknown extends TData ? TQueryFnData : TData>
                  : T extends ToInferWithEnabledOption<infer TQueryFnData, QueryKey, true>
                    ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
                    : // enabled: boolean
                      T extends ToInferWithSelectEnabledOption<infer TQueryFnData, infer TData, QueryKey, boolean>
                      ?
                          | UseSuspenseQueryResultOnSuccess<unknown extends TData ? TQueryFnData : TData>
                          | UseSuspenseQueryResultOnLoading
                      : T extends ToInferWithEnabledOption<infer TQueryFnData, QueryKey, boolean>
                        ? UseSuspenseQueryResultOnSuccess<TQueryFnData> | UseSuspenseQueryResultOnLoading
                        : // no enabled
                          T extends ToInferWithSelectOption<infer TQueryFnData, infer TData, QueryKey>
                          ? UseSuspenseQueryResultOnSuccess<unknown extends TData ? TQueryFnData : TData>
                          : T extends ToInferOption<infer TQueryFnData, QueryKey>
                            ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
                            : // enabled: undefined
                              T extends ToInferWithSelectEnabledOption<
                                  infer TQueryFnData,
                                  infer TData,
                                  QueryKey,
                                  undefined
                                >
                              ? UseSuspenseQueryResultOnSuccess<unknown extends TData ? TQueryFnData : TData>
                              : T extends ToInferWithEnabledOption<infer TQueryFnData, QueryKey, undefined>
                                ? UseSuspenseQueryResultOnSuccess<TQueryFnData>
                                : UseSuspenseQueryResultOnSuccess<unknown>

export type QueriesResults<
  T extends any[],
  TResult extends any[] = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? UseQueryResult[]
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResult, GetResult<Head>]
      : T extends [infer Head, ...infer Tail]
        ? QueriesResults<[...Tail], [...TResult, GetResult<Head>], [...TDepth, 1]>
        : T extends UseQueryOptionsForUseSuspenseQueries<infer TQueryFnData, infer TData>[]
          ? UseSuspenseQueryResultOnSuccess<unknown extends TData ? TQueryFnData : TData>[]
          : (UseSuspenseQueryResultOnSuccess<unknown> | UseSuspenseQueryResultOnLoading)[]

type UseSuspenseQueries = <T extends any[]>(arg: {
  queries: readonly [...SuspenseQueriesOptions<T>]
  context?: UseQueryOptions['context']
}) => QueriesResults<T>
export const useSuspenseQueries: UseSuspenseQueries = <T extends any[]>({
  queries,
  context,
}: {
  queries: readonly [...SuspenseQueriesOptions<T>]
  context?: UseQueryOptions['context']
}) =>
  useQueries({
    queries: queries.map((query: typeof queries) => ({ ...query, suspense: true })),
    context,
  }) as QueriesResults<T>
