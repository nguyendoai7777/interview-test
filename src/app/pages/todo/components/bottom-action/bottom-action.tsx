import { createPortal } from 'react-dom';
import { FCC } from '../../../../shared/types/component.types';
import styles from './bottom-action.module.scss';

const BottomAction: FCC<{ onDone: () => void; onRemove: () => void }> = ({ onDone, onRemove }) => {
	return createPortal(
		<div className={`${styles.action}`}>
			<div className='container'>
				<div className={styles.box}>
					<div>Bulk Action:</div>
					<button onClick={onDone} className='btn-info' style={{ width: '80px', marginLeft: 'auto' }}>
						Done
					</button>
					<button onClick={onRemove} className='btn-error' style={{ width: '80px', marginLeft: '12px' }}>
						Remove
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};
export default BottomAction;
