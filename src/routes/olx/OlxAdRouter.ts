import { OlxAdController } from "@/controllers/olx/OlxAdController";
import { SubRouterI } from "@/interfaces/SubRouterI";
import { CreatableRouter } from "@/routes/crud/CreatableRouter";
import { DeletableRouter } from "@/routes/crud/DeletableRouter";
import { SelectableRouter } from "@/routes/crud/SelectableRouter";
import { Router } from "express";

export class OlxAdRouter implements SubRouterI {
  private controller;
  private selectable;
  private creatable;
  private deletable;
  private _router;
  readonly path = "/olx/ads";

  constructor(
    controller = new OlxAdController(),
    selectable = new SelectableRouter(controller.selectable),
    creatable = new CreatableRouter(controller),
    deletable = new DeletableRouter(controller.deletable),
    router = Router()
  ) {
    this.controller = controller;
    this.selectable = selectable;
    this.creatable = creatable;
    this.deletable = deletable;
    this._router = router;
  }

  build() {
    this.router.get("/", (req, res) => this.controller.getAll(res));
    this.router.use(this.selectable.build().router);
    this.router.use(this.creatable.build().router);
    this.router.use(this.deletable.build().router);

    return this;
  }

  get router() {
    return this._router;
  }
}
