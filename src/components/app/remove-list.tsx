"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useDeleteListMutation } from "@lib/hooks/query";
import { usePathname, useRouter } from "next/navigation";
import {
  useState,
  type MouseEventHandler,
  type PropsWithChildren,
} from "react";

type Props = {
  listId: string;
  listName: string;
};

function RemoveList({ children, listId, listName }: PropsWithChildren<Props>) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { mutate: deleteList, isPending: deleteListLoading } =
    useDeleteListMutation();

  const [input, setInput] = useState<string>("");

  const removeDisabled = input.trim() !== listName.trim();

  // TODO: use <form />
  const handleOnRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    deleteList(listId);

    if (pathname === `/app/${listId}`) push("/app");
  };

  return (
    <Dialog
      onOpenChange={() => {
        setInput("");
      }}
    >
      {children}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete list</DialogTitle>
          <DialogDescription>
            To confirm, type &quot;<b>{listName}</b>&quot; in the box below
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder={listName}
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
        />
        <Button
          variant="destructive"
          className="w-full"
          disabled={removeDisabled}
          loading={deleteListLoading}
          onClick={handleOnRemove}
        >
          Delete this list
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveList;
