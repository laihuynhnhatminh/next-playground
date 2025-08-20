'use client';

import { useCurrentEditor } from '@tiptap/react';
import { type ReactNode, useEffect } from 'react';

import { AISelector } from './ai-selector';
import EditorBubble from './components/editor-bubble';
import { removeAIHighlight } from './extensions/ai-highlight';
import Magic from '../icons/magic';
import { Button } from '../ui/button';

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="flex overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <>
          <Button
            name="ask-ai"
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="default"
          >
            <Magic className="size-5" />
            Ask AI
          </Button>
          {children}
        </>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
