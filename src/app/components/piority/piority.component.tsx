import Renderer from '../renderer/renderer';
import { PIORITY_OPTIONS } from './piority.const';
import { PiorityComponentProps } from './piority.types';

function PioritySelectComponent({ change, className, defaultValue, value }: PiorityComponentProps) {
	return (
		<select className={className ?? ''} onChange={(e) => change(e.target.value)} value={value}>
			<Renderer
				items={PIORITY_OPTIONS}
				render={({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				)}
			/>
		</select>
	);
}
export default PioritySelectComponent;
