// https://github.com/velopert/velog-client/blob/e5a60cd539/src/lib/utils.ts#L25
export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const convertSpaceToEncodedString = (text: string) => {
  return text.replace(/ /g, '%20');
};

export const humanizeTime = (time: number) => {
  if (time < 0.5) {
    return 'less than a minute read';
  }
  if (time >= 0.5 && time < 1.5) {
    return '1 minute read';
  }
  return `${Math.ceil(time)} minutes read`;
};
