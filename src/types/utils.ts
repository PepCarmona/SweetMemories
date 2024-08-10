import type { ZodOptional, ZodType, ZodObject } from 'zod';

export type TypeToZod<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | null | undefined
    ? undefined extends T[K]
      ? ZodOptional<ZodType<Exclude<T[K], undefined>>>
      : ZodType<T[K]>
    : ZodObject<TypeToZod<T[K]>>;
};

export type PickStringLiteral<A, B extends A> = B;
