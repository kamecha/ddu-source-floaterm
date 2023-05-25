import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v2.5.0/types.ts";
import { Denops } from "https://deno.land/x/denops_core@v4.0.0/denops.ts";
import { ActionData } from "../@ddu-kinds/floaterm.ts";
import { ensureArray } from "https://deno.land/x/unknownutil@v2.1.0/ensure.ts";
import {
  isNumber,
  isObject,
} from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import { fn } from "https://deno.land/x/ddu_vim@v2.5.0/deps.ts";

type Param = Record<never, never>;

export class Source extends BaseSource<Param> {
  kind = "floaterm";
  gather(args: {
    denops: Denops;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const floatermBufList = ensureArray(
          await args.denops.call("floaterm#buflist#gather"),
          isNumber,
        );
        const items: Item<ActionData>[] = [];
        for (const bufnr of floatermBufList) {
          const bufInfo = ensureArray(
            await fn.getbufinfo(args.denops, bufnr),
            isObject,
          );
          const bufname = bufInfo[0].bufname as string;
          const title = await fn.getbufvar(args.denops, bufnr, "term_title") as string;
          items.push({
            word: `${bufnr} ${bufname} ${title}`,
            action: {
              bufnr: bufnr,
            },
          });
        }
        controller.enqueue(items);
        controller.close();
      },
    });
  }
  params(): Param {
    return {};
  }
}
