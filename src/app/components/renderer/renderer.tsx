import { ReactNode, useState } from 'react';

type Obj = Record<string, any>;

function Renderer<TProps, TInfer = TProps extends Obj ? Obj : TProps extends infer RX ? RX : never>({
	items,
	render,
}: {
	items: TInfer[];
	render: (items: TInfer, index: number) => ReactNode;
}) {
  const [l, setL] = useState(items);
	return l.map(render);
}
export default Renderer;
