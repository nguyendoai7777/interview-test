import { createPortal } from 'react-dom';
import styles from './dialog.module.scss';
import { FCC } from '../../shared/types/component.types';
const Dialog: FCC<{ openWhen: boolean; onClose: () => void }> = ({ children, openWhen, onClose }) => {
	return openWhen ? (
		createPortal(
			<>
				<div
					className={styles.dialogOverlay}
					onClick={(e) => {
						onClose();
						e.stopPropagation();
					}}
				></div>
				<div className={styles.dialogRoot}>{children}</div>
			</>,
			document.body
		)
	) : (
		<></>
	);
};
export default Dialog;
