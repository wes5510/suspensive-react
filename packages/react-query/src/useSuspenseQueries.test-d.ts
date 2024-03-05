/* eslint-disable react-hooks/rules-of-hooks */
import { sleep } from '@suspensive/test-utils'
import { type UseQueryOptions } from '@tanstack/react-query'
import { expectTypeOf } from 'vitest'
import { useSuspenseQueries } from './useSuspenseQueries'

const queryKey = ['key'] as const
const queryFn = () => sleep(10).then(() => ({ text: 'response' }) as const)
const boolean = Math.random() > 0.5
const select = (data: Awaited<ReturnType<typeof queryFn>>) => data.text
const genQueryOptions: (
  extraOptions?: Pick<UseQueryOptions, 'enabled' | 'suspense'>
) => UseQueryOptions<Awaited<ReturnType<typeof queryFn>>> = (extraOptions) => ({
  queryKey,
  queryFn,
  ...extraOptions,
})

const genQueryOptionsWithSelect: (
  extraOptions?: Pick<UseQueryOptions, 'enabled' | 'suspense'>
) => UseQueryOptions<Awaited<ReturnType<typeof queryFn>>, unknown, ReturnType<typeof select>> = (extraOptions) => ({
  queryKey,
  queryFn,
  select,
  ...extraOptions,
})

// enabled: no
const [noEnabled, noEnabledSelect, noEnabledQueryOptions, noEnabledQueryOptionsWithSelect] = useSuspenseQueries({
  queries: [
    { queryKey, queryFn },
    { queryKey, queryFn, select },
    genQueryOptions(),
    genQueryOptionsWithSelect(),
  ] as const,
})
expectTypeOf(noEnabled.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(noEnabledSelect.data).toEqualTypeOf<ReturnType<typeof select>>()
expectTypeOf(noEnabledQueryOptions.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(noEnabledQueryOptionsWithSelect.data).toEqualTypeOf<ReturnType<typeof select>>()

expectTypeOf(noEnabled.isLoading).toEqualTypeOf<false>()
expectTypeOf(noEnabledSelect.isLoading).toEqualTypeOf<false>()
expectTypeOf(noEnabledQueryOptions.isLoading).toEqualTypeOf<false>()
expectTypeOf(noEnabledQueryOptionsWithSelect.isLoading).toEqualTypeOf<false>()

expectTypeOf(noEnabled.isSuccess).toEqualTypeOf<true>()
expectTypeOf(noEnabledSelect.isSuccess).toEqualTypeOf<true>()
expectTypeOf(noEnabledQueryOptions.isSuccess).toEqualTypeOf<true>()
expectTypeOf(noEnabledQueryOptionsWithSelect.isSuccess).toEqualTypeOf<true>()

expectTypeOf(noEnabled.status).toEqualTypeOf<'success'>()
expectTypeOf(noEnabledSelect.status).toEqualTypeOf<'success'>()
expectTypeOf(noEnabledQueryOptions.status).toEqualTypeOf<'success'>()
expectTypeOf(noEnabledQueryOptionsWithSelect.status).toEqualTypeOf<'success'>()

// @ts-expect-error no isFetching
noEnabled.isFetching
// @ts-expect-error no isFetching
noEnabledSelect.isFetching
// @ts-expect-error no error
noEnabled.error
// @ts-expect-error no error
noEnabledSelect.error
// @ts-expect-error no isError
noEnabled.isError
// @ts-expect-error no isError
noEnabledSelect.isError
useSuspenseQueries({
  queries: [
    // @ts-expect-error no suspense
    { queryKey, queryFn, suspense: false },
    // @ts-expect-error no suspense
    { queryKey, queryFn, select, suspense: true },
    { ...genQueryOptions({ suspense: false }) },
    { ...genQueryOptionsWithSelect({ suspense: true }) },
  ] as const,
})

// enabled: undefined
const [undefinedEnabled, undefinedEnabledSelect, undefinedEnabledQueryOptions, undefinedEnabledQueryOptionsWithSelect] =
  useSuspenseQueries({
    queries: [
      { enabled: undefined, queryKey, queryFn },
      { enabled: undefined, queryKey, queryFn, select },
      { ...genQueryOptions({ enabled: undefined }) },
      { ...genQueryOptionsWithSelect({ enabled: undefined }) },
    ],
  })
expectTypeOf(undefinedEnabled.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(undefinedEnabledSelect.data).toEqualTypeOf<ReturnType<typeof select>>()
expectTypeOf(undefinedEnabledQueryOptions.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(undefinedEnabledQueryOptionsWithSelect.data).toEqualTypeOf<ReturnType<typeof select>>()

expectTypeOf(undefinedEnabled.isLoading).toEqualTypeOf<false>()
expectTypeOf(undefinedEnabledSelect.isLoading).toEqualTypeOf<false>()
expectTypeOf(undefinedEnabledQueryOptions.isLoading).toEqualTypeOf<false>()
expectTypeOf(undefinedEnabledQueryOptionsWithSelect.isLoading).toEqualTypeOf<false>()

expectTypeOf(undefinedEnabled.isSuccess).toEqualTypeOf<true>()
expectTypeOf(undefinedEnabledSelect.isSuccess).toEqualTypeOf<true>()
expectTypeOf(undefinedEnabledQueryOptions.isSuccess).toEqualTypeOf<true>()
expectTypeOf(undefinedEnabledQueryOptionsWithSelect.isSuccess).toEqualTypeOf<true>()

expectTypeOf(undefinedEnabled.status).toEqualTypeOf<'success'>()
expectTypeOf(undefinedEnabledSelect.status).toEqualTypeOf<'success'>()
expectTypeOf(undefinedEnabledQueryOptions.status).toEqualTypeOf<'success'>()
expectTypeOf(undefinedEnabledQueryOptionsWithSelect.status).toEqualTypeOf<'success'>()

// @ts-expect-error no isFetching
undefinedEnabled.isFetching
// @ts-expect-error no isFetching
undefinedEnabledSelect.isFetching
// @ts-expect-error no error
undefinedEnabled.error
// @ts-expect-error no error
undefinedEnabledSelect.error
// @ts-expect-error no isError
undefinedEnabled.isError
// @ts-expect-error no isError
undefinedEnabledSelect.isError
useSuspenseQueries({
  queries: [
    // @ts-expect-error no suspense
    { enabled: undefined, queryKey, queryFn, suspense: false },
    // @ts-expect-error no suspense
    { enabled: undefined, queryKey, queryFn, select, suspense: true },
    { ...genQueryOptions({ enabled: undefined, suspense: false }) },
    { ...genQueryOptionsWithSelect({ enabled: undefined, suspense: true }) },
  ] as const,
})

// enabled: true
const [trueEnabled, trueEnabledSelect, trueEnabledQueryOptions, trueEnabledQueryOptionsWithSelect] = useSuspenseQueries(
  {
    queries: [
      { enabled: true, queryKey, queryFn },
      { enabled: true, queryKey, queryFn, select },
      { ...genQueryOptions({ enabled: true }) },
      { ...genQueryOptionsWithSelect({ enabled: true }) },
    ] as const,
  }
)
expectTypeOf(trueEnabled.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(trueEnabledSelect.data).toEqualTypeOf<ReturnType<typeof select>>()
expectTypeOf(trueEnabledQueryOptions.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>>>()
expectTypeOf(trueEnabledQueryOptionsWithSelect.data).toEqualTypeOf<ReturnType<typeof select>>()

expectTypeOf(trueEnabled.isLoading).toEqualTypeOf<false>()
expectTypeOf(trueEnabledSelect.isLoading).toEqualTypeOf<false>()
expectTypeOf(trueEnabledQueryOptions.isLoading).toEqualTypeOf<false>()
expectTypeOf(trueEnabledQueryOptionsWithSelect.isLoading).toEqualTypeOf<false>()

expectTypeOf(trueEnabled.isSuccess).toEqualTypeOf<true>()
expectTypeOf(trueEnabledSelect.isSuccess).toEqualTypeOf<true>()
expectTypeOf(trueEnabledQueryOptions.isSuccess).toEqualTypeOf<true>()
expectTypeOf(trueEnabledQueryOptionsWithSelect.isSuccess).toEqualTypeOf<true>()

expectTypeOf(trueEnabled.status).toEqualTypeOf<'success'>()
expectTypeOf(trueEnabledSelect.status).toEqualTypeOf<'success'>()
expectTypeOf(trueEnabledQueryOptions.status).toEqualTypeOf<'success'>()
expectTypeOf(trueEnabledQueryOptionsWithSelect.status).toEqualTypeOf<'success'>()

// @ts-expect-error no isFetching
trueEnabled.isFetching
// @ts-expect-error no isFetching
trueEnabledSelect.isFetching
// @ts-expect-error no error
trueEnabled.error
// @ts-expect-error no error
trueEnabledSelect.error
// @ts-expect-error no isError
trueEnabled.isError
// @ts-expect-error no isError
trueEnabledSelect.isError
useSuspenseQueries({
  queries: [
    // @ts-expect-error no suspense
    { enabled: true, queryKey, queryFn, suspense: false },
    // @ts-expect-error no suspense
    { enabled: true, queryKey, queryFn, select, suspense: true },
    { ...genQueryOptions({ enabled: true, suspense: false }) },
    { ...genQueryOptionsWithSelect({ enabled: true, suspense: true }) },
  ] as const,
})

// enabled: false
const [falseEnabled, falseEnabledSelect, falseEnabledQueryOptions, falseEnabledQueryOptionsWithSelect] =
  useSuspenseQueries({
    queries: [
      { enabled: false, queryKey, queryFn },
      { enabled: false, queryKey, queryFn, select },
      { ...genQueryOptions({ enabled: false }) },
      { ...genQueryOptionsWithSelect({ enabled: false }) },
    ] as const,
  })
expectTypeOf(falseEnabled.data).toEqualTypeOf<undefined>()
expectTypeOf(falseEnabledSelect.data).toEqualTypeOf<undefined>()
expectTypeOf(falseEnabledQueryOptions.data).toEqualTypeOf<undefined>()
expectTypeOf(falseEnabledQueryOptionsWithSelect.data).toEqualTypeOf<undefined>()

expectTypeOf(falseEnabled.isLoading).toEqualTypeOf<true>()
expectTypeOf(falseEnabledSelect.isLoading).toEqualTypeOf<true>()
expectTypeOf(falseEnabledQueryOptions.isLoading).toEqualTypeOf<true>()
expectTypeOf(falseEnabledQueryOptionsWithSelect.isLoading).toEqualTypeOf<true>()

expectTypeOf(falseEnabled.isSuccess).toEqualTypeOf<false>()
expectTypeOf(falseEnabledSelect.isSuccess).toEqualTypeOf<false>()
expectTypeOf(falseEnabledQueryOptions.isSuccess).toEqualTypeOf<false>()
expectTypeOf(falseEnabledQueryOptionsWithSelect.isSuccess).toEqualTypeOf<false>()

expectTypeOf(falseEnabled.status).toEqualTypeOf<'loading'>()
expectTypeOf(falseEnabledSelect.status).toEqualTypeOf<'loading'>()
expectTypeOf(falseEnabledQueryOptions.status).toEqualTypeOf<'loading'>()
expectTypeOf(falseEnabledQueryOptionsWithSelect.status).toEqualTypeOf<'loading'>()
// @ts-expect-error no isFetching
falseEnabled.isFetching
// @ts-expect-error no isFetching
falseEnabledSelect.isFetching
// @ts-expect-error no error
falseEnabled.error
// @ts-expect-error no error
falseEnabledSelect.error
// @ts-expect-error no isError
falseEnabled.isError
// @ts-expect-error no isError
falseEnabledSelect.isError
useSuspenseQueries({
  queries: [
    // @ts-expect-error no suspense
    { enabled: false, queryKey, queryFn, suspense: false },
    // @ts-expect-error no suspense
    { enabled: false, queryKey, queryFn, select, suspense: true },
    { ...genQueryOptions({ enabled: false, suspense: false }) },
    { ...genQueryOptionsWithSelect({ enabled: false, suspense: true }) },
  ] as const,
})

// enabled: boolean
const [booleanEnabled, booleanEnabledSelect, booleanEnabledQueryOptions, booleanEnabledQueryOptionsWithSelect] =
  useSuspenseQueries({
    queries: [
      { enabled: boolean, queryKey, queryFn },
      { enabled: boolean, queryKey, queryFn, select },
      { ...genQueryOptions({ enabled: boolean }) },
      { ...genQueryOptionsWithSelect({ enabled: boolean }) },
    ],
  })
expectTypeOf(booleanEnabled.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>> | undefined>()
expectTypeOf(booleanEnabledSelect.data).toEqualTypeOf<ReturnType<typeof select> | undefined>()
expectTypeOf(booleanEnabledQueryOptions.data).toEqualTypeOf<Awaited<ReturnType<typeof queryFn>> | undefined>()
expectTypeOf(booleanEnabledQueryOptionsWithSelect.data).toEqualTypeOf<ReturnType<typeof select> | undefined>()

expectTypeOf(booleanEnabled.isLoading).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledSelect.isLoading).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledQueryOptions.isLoading).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledQueryOptionsWithSelect.isLoading).toEqualTypeOf<boolean>()

expectTypeOf(booleanEnabled.isSuccess).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledSelect.isSuccess).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledQueryOptions.isSuccess).toEqualTypeOf<boolean>()
expectTypeOf(booleanEnabledQueryOptionsWithSelect.isSuccess).toEqualTypeOf<boolean>()

expectTypeOf(booleanEnabled.status).toEqualTypeOf<'success' | 'loading'>()
expectTypeOf(booleanEnabledSelect.status).toEqualTypeOf<'success' | 'loading'>()
expectTypeOf(booleanEnabledQueryOptions.status).toEqualTypeOf<'success' | 'loading'>()
expectTypeOf(booleanEnabledQueryOptionsWithSelect.status).toEqualTypeOf<'success' | 'loading'>()

// @ts-expect-error no isFetching
booleanEnabled.isFetching
// @ts-expect-error no isFetching
booleanEnabledSelect.isFetching
// @ts-expect-error no error
booleanEnabled.error
// @ts-expect-error no error
booleanEnabledSelect.error
// @ts-expect-error no isError
booleanEnabled.isError
// @ts-expect-error no isError
booleanEnabledSelect.isError
useSuspenseQueries({
  queries: [
    // @ts-expect-error no suspense
    { enabled: boolean, queryKey, queryFn, suspense: false },
    // @ts-expect-error no suspense
    { enabled: boolean, queryKey, queryFn, select, suspense: true },
    { ...genQueryOptions({ enabled: boolean, suspense: false }) },
    { ...genQueryOptionsWithSelect({ enabled: boolean, suspense: true }) },
  ] as const,
})

// @ts-expect-error noItem
useSuspenseQueries({})
// @ts-expect-error noItem
useSuspenseQueries()
