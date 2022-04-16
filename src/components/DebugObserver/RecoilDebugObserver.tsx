import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const RecoilDebugObserver = () => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.group('Recoil Modifed');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
    console.groupEnd();
  }, [snapshot]);

  return null;
};

export default RecoilDebugObserver;
