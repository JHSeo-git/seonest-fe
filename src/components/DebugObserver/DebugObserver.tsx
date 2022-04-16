import { ReactQueryDevtools } from 'react-query/devtools';
import RecoilDebugObserver from './RecoilDebugObserver';

function DebugObserver() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return (
    <>
      <ReactQueryDevtools containerElement="div" initialIsOpen={false} />
      <RecoilDebugObserver />
    </>
  );
}

export default DebugObserver;
