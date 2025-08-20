'use client';

import { useCurrentEditor } from '@tiptap/react';
import { useCompletion } from 'ai/react';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { toast } from 'sonner';

import { addAIHighlight } from './extensions/ai-highlight';
import CrazySpinner from '../icons/crazy-spinner';
import Magic from '../icons/magic';
import { Button } from '../ui/button';
import { Command, CommandInput } from '../ui/command';
import { ScrollArea } from '../ui/scroll-area';

//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useCurrentEditor();
  const [inputValue, setInputValue] = useState('');

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/chat',
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.');
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const hasCompletion = completion.length > 0;

  const handleSubmit = () => {
    if (completion)
      return complete(completion, {
        body: { option: 'zap', command: inputValue },
      }).then(() => setInputValue(''));

    const slice = editor?.state.selection.content();
    const text = editor?.storage.markdown.serializer.serialize(slice?.content);

    complete(text, {
      body: { option: 'zap', command: inputValue },
    }).then(() => setInputValue(''));
  };

  if (!editor) return null;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose prose-sm p-2 px-4">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 font-medium text-muted-foreground text-purple-500 text-sm">
          <Magic className="mr-2 h-4 w-4 shrink-0" />
          AI is thinking
          <div className="mt-1 ml-2">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? 'Tell AI what to do next'
                  : 'Ask AI to edit or generate...'
              }
              onFocus={() => addAIHighlight(editor)}
            />
            <Button
              size="icon-normal"
              name="submit"
              className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 rounded-full bg-purple-500 hover:bg-purple-900"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {/* {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands onSelect={(value, option) => complete(value, { body: { option } })} />
          )} */}
        </>
      )}
    </Command>
  );
}
