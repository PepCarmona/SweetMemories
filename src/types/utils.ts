import type { ZodOptional, ZodType, ZodObject } from 'zod';

// https://github.com/colinhacks/zod/issues/53
export type TypeToZod<T> = {
  [K in keyof T]-?: T[K] extends
    | Date
    | string
    | number
    | boolean
    | null
    | undefined
    ? undefined extends T[K]
      ? ZodOptional<ZodType<Exclude<T[K], undefined>>>
      : ZodType<T[K]>
    : ZodObject<TypeToZod<T[K]>>;
};

export type PickStringLiteral<A, B extends A> = B;

export type SafeOmit<T, K extends keyof T> = Omit<T, K>;
