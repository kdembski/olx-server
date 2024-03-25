import { Request, Response } from "express";
import { CreatableController } from "@/controllers/crud/CreatableController";
import { DeletableController } from "@/controllers/crud/DeletableController";
import { SelectableController } from "@/controllers/crud/SelectableController";
import { OlxAdService } from "@/services/olx/OlxAdService";

export class OlxAdController {
  private service;
  getById;
  create;
  delete;

  constructor(
    service = new OlxAdService(),
    selectable = new SelectableController(service),
    creatable = new CreatableController(service),
    deletable = new DeletableController(service)
  ) {
    this.service = service;
    this.getById = selectable.getById;
    this.create = creatable.create;
    this.delete = deletable.delete;
  }

  async getAll(response: Response) {
    try {
      const results = await this.service.getAll();
      response.json(results);
    } catch (error) {
      response.json(error);
    }
  }
}
