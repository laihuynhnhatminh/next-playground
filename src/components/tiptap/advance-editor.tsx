'use client';
import type { Editor, JSONContent } from '@tiptap/core';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { EditorContent } from './components/editor-content';
import { defaultExtensions } from './constants/extensions';
import GenerativeMenuSwitch from './generative-menu-switch';
import { defaultEditorContent } from '@/components/tiptap/constants/content';
import { Separator } from '../ui/separator';

const hljs = require('highlight.js');

const extensions = [...defaultExtensions];

const AdvanceEditor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [charsCount, setCharsCount] = useState();

  const [openAI, setOpenAI] = useState(false);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    doc.querySelectorAll('pre code').forEach((el) => {
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    window.localStorage.setItem(
      'html-content',
      highlightCodeblocks(editor.getHTML()),
    );
    window.localStorage.setItem('novel-content', JSON.stringify(json));
    window.localStorage.setItem(
      'markdown',
      editor.storage.markdown.getMarkdown(),
    );
    setSaveStatus('Saved');
  }, 500);

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content');
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute top-5 right-5 z-10 mb-5 flex gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-muted-foreground text-sm">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? 'rounded-lg bg-accent px-2 py-1 text-muted-foreground text-sm'
              : 'hidden'
          }
        >
          {charsCount} Words
        </div>
      </div>
      <EditorContent
        initialContent={initialContent}
        extensions={extensions}
        className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background p-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
        editorProps={{
          attributes: {
            class:
              'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
          },
        }}
        onUpdate={({ editor }) => {
          debouncedUpdates(editor);
          setSaveStatus('Unsaved');
        }}
      >
        <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
          <Separator orientation="vertical" />
          {/* <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <MathSelector />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
        </GenerativeMenuSwitch>
      </EditorContent>
    </div>
  );
};

export default AdvanceEditor;
