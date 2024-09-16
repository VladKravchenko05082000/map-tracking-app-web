import React, { lazy, Suspense } from "react";

interface Opts {
  fallback: NonNullable<React.ReactNode>;
  delay?: number;
}

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: <div>Loading...</div> },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  // Configure desired time with props if u need delay for lazy loading
  const LazyComponent = lazy(
    () =>
      new Promise<{ default: U }>(resolve => {
        setTimeout(() => {
          resolve(lazyFactory());
        }, opts.delay ?? 0);
      }),
  );

  const LazyLoader = (props: React.ComponentProps<U>): JSX.Element => {
    return (
      <Suspense fallback={opts.fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return LazyLoader;
};
