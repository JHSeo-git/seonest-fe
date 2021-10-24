import { ToastContainer, ToastContainerProps, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export type ToastProviderProps = {} & ToastContainerProps;

function ToastProvider({ ...rest }: ToastProviderProps) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      pauseOnHover
      pauseOnFocusLoss={false}
      closeButton={false}
      transition={Flip}
      {...rest}
    />
  );
}
export default ToastProvider;
