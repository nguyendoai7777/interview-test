import { FCC } from '../../shared/types/component.types';

const FieldError: FCC = ({ children }) => {
	return <div style={{ height: '22px', display: 'flex', alignItems: 'center' }}>{children}</div>;
};
export default FieldError;
