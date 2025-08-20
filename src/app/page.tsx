'use client';

import { BookOpen, GithubIcon } from 'lucide-react';
import Link from 'next/link';

import Menu from '@/components/menu';
import AdvanceEditor from '@/components/tiptap/advance-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <div className="mb-4 flex w-full max-w-screen-lg items-center gap-2 px-4">
        <Button name="github" size="icon-normal" variant="outline">
          <a
            href="https://github.com/steven-tey/novel"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button name="usage" className="ml gap-2">
              <BookOpen className="h-4 w-4" />
              Usage in dialog
            </Button>
          </DialogTrigger>
          <DialogContent className="flex h-[calc(100vh-24px)] max-w-3xl">
            <ScrollArea className="max-h-screen">
              <AdvanceEditor />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Link href="/docs" className="ml-auto">
          <Button name="documentation" variant="ghost">
            Documentation
          </Button>
        </Link>
        <Menu />
      </div>

      <AdvanceEditor />
    </div>
  );
}
