export const isTextareaRefObject = (
  r: React.Ref<HTMLTextAreaElement>
): r is React.RefObject<HTMLTextAreaElement> => {
  return r !== undefined;
};
