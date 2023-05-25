import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v2.5.0/types.ts";
import { Denops } from "https://deno.land/x/denops_core@v4.0.0/denops.ts";
import { ActionData } from "../@ddu-kinds/floaterm.ts";
import { ensureArray } from "https://deno.land/x/unknownutil@v2.1.0/ensure.ts";
import { isNumber } from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";

type Param = {};

export class Source extends BaseSource<Param> {
  kind = "floaterm";
  gather(args: {
    denops: Denops;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const floatermBufList = ensureArray(await args.denops.call("floaterm#buflist#gather"), isNumber);
        const items: Item<ActionData>[] = [];
        for (const bufnr of floatermBufList) {
          items.push({
            word: `floaterm#${bufnr}`,
            action: {
              bufnr: bufnr,
            },
          });
        }
        controller.enqueue(items);
        controller.close();
      }
    });
  }
  params(): Param {
    return {};
  }
}
