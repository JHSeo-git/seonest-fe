import { styled } from '@stitches.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import type { Editor } from '@toast-ui/react-editor';
import { SubmitHandler, useForm } from 'react-hook-form';

import Popup from '../Popup';
import WriteTitle from './WriteTitle';
import WriteButtons from './WriteButtons';
import PublishScreen from './PublishScreen';
import PreviewScreen from './PreviewScreen';
import { TuiEditor } from '../Markdown';

import { Post } from '@/lib/api/posts/types';
import { PostAllContentType } from '@/lib/types/types';
import useSavePost from '@/hooks/useSavePost';
import useWarnIfUnsavedChanges from '@/hooks/useWarnIfUnsavedChanges';

export type WriteProps = {
  slug?: string;
  post?: Post | null;
  lastTempPost?: Post | null;
};

export type WriteInputs = {
  title: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  categories?: string[];
};

const validateTextRequired = (text?: string) => {
  if (text && text.trim().length > 0) return true;
  return false;
};

function Write({ slug, post, lastTempPost }: WriteProps) {
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  // save post hook
  const { savePost, saveTempPost, error } = useSavePost();
  const [useLastTemp, setUseLastTemp] = useState(false);

  // publish prepare
  const { register, handleSubmit, setValue, getValues } = useForm<WriteInputs>({
    defaultValues: {
      title: useLastTemp ? lastTempPost?.title : post?.title,
      shortDescription: useLastTemp
        ? lastTempPost?.short_description ?? undefined
        : post?.short_description ?? undefined,
      thumbnailUrl: useLastTemp
        ? lastTempPost?.thumbnail ?? undefined
        : post?.thumbnail ?? undefined,
      categories: useLastTemp
        ? lastTempPost?.categories?.map((category) => category.name) ??
          undefined
        : post?.categories?.map((category) => category.name) ?? undefined,
    },
  });
  const handleThumbnailUrl = (url: string | undefined) => {
    setValue('thumbnailUrl', url);
  };

  // popup hook
  const [visiblePublishScreen, setVisiblePublishScreen] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(
    !!lastTempPost && !post?.is_temp
  );
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // submit
  const onPublish = async (data: WriteInputs, isTemp = false) => {
    try {
      const { title, shortDescription, thumbnailUrl, categories } = data;
      const markdown = editorRef?.current?.getInstance().getMarkdown();

      if (!validateTextRequired(title)) {
        setAlertMessage('Please type title!');
        setVisibleAlert(true);
        return;
      }
      if (!validateTextRequired(markdown)) {
        setAlertMessage('Please type markdown!');
        setVisibleAlert(true);
        return;
      }

      const publishPost: PostAllContentType = {
        title: title,
        markdown: markdown!,
        shortDescription: shortDescription ?? '',
        thumbnailUrl: thumbnailUrl ?? '',
        categories,
      };

      if (isTemp) {
        await saveTempPost({ slug, post: publishPost });
      } else {
        const newPost = await savePost({ slug, post: publishPost });
        router.replace(`/posts/${newPost.url_slug}`);
      }
      toast.success('👍 Success Save!');
    } catch (e) {}
  };

  // Buttons props
  const onBackClick = () => {
    // TODO: 첫 페이지로 이 페이지를 들어왔을 때, push 기능
    router.back();
  };
  const onPostClick: SubmitHandler<WriteInputs> = (data) => {
    const { title } = data;
    const markdown = editorRef?.current?.getInstance().getMarkdown();

    if (!validateTextRequired(title)) {
      setAlertMessage('Please type title!');
      setVisibleAlert(true);
      return;
    }
    if (!validateTextRequired(markdown)) {
      setAlertMessage('Please type markdown!');
      setVisibleAlert(true);
      return;
    }

    setVisiblePublishScreen(true);
  };

  // preview
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [previewMarkdown, setPreviewMarkdown] = useState('');
  const onPreviewClick = () => {
    const markdown = editorRef?.current?.getInstance().getMarkdown();
    if (!validateTextRequired(markdown)) {
      setAlertMessage('Please type markdown!');
      setVisibleAlert(true);
      return;
    }

    setPreviewMarkdown(markdown!);
    setVisiblePreview(true);
  };

  // alert when exit page with unsavedChanges
  useWarnIfUnsavedChanges(true);

  return (
    <>
      <Box>
        <WriteTitle register={register} placeholder="Please write title" />
        <EditorWrapper>
          <TuiEditor
            ref={editorRef}
            markdown={useLastTemp ? lastTempPost?.body : post?.body}
          />
        </EditorWrapper>
        <WriteButtons
          isEditPost={!!slug && !post?.is_temp}
          onBackClick={onBackClick}
          onTempClick={handleSubmit(
            async (data) => await onPublish(data, true)
          )}
          onPreviewClick={onPreviewClick}
          onPostClick={handleSubmit(onPostClick)}
        />
      </Box>
      <PreviewScreen
        visible={visiblePreview}
        markdown={previewMarkdown}
        onClose={() => setVisiblePreview(false)}
      />
      <PublishScreen
        isEditPost={!!slug && !post?.is_temp}
        visible={visiblePublishScreen}
        getValues={getValues}
        register={register}
        handleThumbnailUrl={handleThumbnailUrl}
        onPublish={handleSubmit(async (data) => await onPublish(data))}
        onClose={() => setVisiblePublishScreen(false)}
      />
      <Popup
        visible={visiblePopup}
        title="Load Temp Post?"
        onCancel={() => setVisiblePopup(false)}
        onOK={() => {
          setUseLastTemp(true);
          setVisiblePopup(false);
        }}
      />
      <Popup
        visible={visibleAlert}
        title="Alert"
        message={alertMessage}
        onOK={() => setVisibleAlert(false)}
      />
    </>
  );
}

const Box = styled('div', {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
});

const EditorWrapper = styled('div', {
  flex: 1,
});

export default Write;
