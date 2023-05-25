import { GetPreviewerArguments } from "https://deno.land/x/ddu_vim@v2.5.0/base/kind.ts";
import {
  ActionFlags,
  Actions,
  BaseKind,
  DduItem,
  Previewer,
} from "https://deno.land/x/ddu_vim@v2.5.0/types.ts";
import { Denops } from "https://deno.land/x/denops_core@v4.0.0/denops.ts";

export interface ActionData {
  bufnr: number;
}

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  actions: Actions<Params> = {
    open: async (args: {
      denops: Denops;
      items: DduItem[];
    }) => {
      for (const item of args.items) {
        if (item.action) {
          const action = item.action as ActionData;
          await args.denops.call(
            "floaterm#terminal#open_existing",
            action.bufnr,
          );
        }
      }
      return ActionFlags.None;
    },
  };
  params(): Params {
    return {};
  }
  async getPreviewer(
    args: GetPreviewerArguments,
  ): Promise<Previewer | undefined> {
    const action = args.item.action as ActionData;
    if (!action) {
      return undefined;
    }
    return {
      kind: "buffer",
      expr: action.bufnr,
    };
  }
}
