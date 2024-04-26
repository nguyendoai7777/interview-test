import { ReactElement, ReactNode, } from 'react';

export type PropsWithChildren<P> = P & {children?: ReactNode};


export interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
}

export type FCC<P = {}> = FunctionComponent<P>;