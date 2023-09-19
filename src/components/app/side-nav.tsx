"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import type { ListType } from "@db/schema";
import { queryKeys, useCreateListMutation } from "@lib/hooks/query";
import { PopoverClose } from "@radix-ui/react-popover";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEventHandler } from "react";
import SideNavItem from "./side-nav-item";

type Props = {
  initialLists: ListType[];
};

function SideNav({ initialLists }: Props) {
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  const [name, setName] = useState<string>("");

  const { mutate, isPending } = useCreateListMutation();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    mutate({
      name: name,
    });

    setName("");
  };

  return (
    <nav className="sticky top-[57px] hidden max-h-[calc(100vh-57px)] w-72 flex-col gap-y-3 border-r bg-secondary px-4 py-7 lg:flex">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-sm font-semibold">Projects</h3>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="xxs"
              variant="ghost"
              icon={<IconPlus size={22} />}
              className="text-muted-foreground"
            />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lists</h4>
                <p className="text-sm text-muted-foreground">
                  Set the name for the new list.
                </p>
              </div>
              <div className="grid gap-2">
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-3 items-center gap-4"
                >
                  <Input
                    onChange={(event) => setName(event.currentTarget.value)}
                    placeholder="My projects"
                    className="col-span-2 h-8"
                  />

                  <PopoverClose asChild>
                    <Button
                      size="xs"
                      disabled={name.trim().length === 0}
                      loading={isPending}
                      type="submit"
                    >
                      Save
                    </Button>
                  </PopoverClose>
                </form>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <hr className="my-1 w-full" />

      <div className="flex max-h-[calc(100vh-120px)] w-full flex-col gap-y-3 overflow-y-auto">
        {lists.map(({ id, name }) => (
          <SideNavItem key={id} id={id} name={name} />
        ))}
      </div>
    </nav>
  );
}

export default SideNav;
