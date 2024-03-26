import { OlxProductCreateDto } from "@/dtos/olx/OlxProductDtos";
import { Hercai } from "hercai";

export class AiChatService {
  private herc;

  constructor(herc = new Hercai()) {
    this.herc = herc;
  }

  ask(content: string) {
    return this.herc.question({
      model: "v3",
      content,
    });
  }

  async getProductInfo(adName: string) {
    const response = await this.ask(
      `Give the brand and model of the product from "${adName}". Use an object with the keys "brand" and "model" in the response. Exclude Polish words.`
    );

    const info: OlxProductCreateDto = JSON.parse(
      response.reply
        .replace("```json", "")
        .replace("```javascript", "")
        .replace("```", "")
    );

    if (!info.brand || !info.model) return;

    return {
      brand: info.brand.toLocaleLowerCase(),
      model: info.model.toLocaleLowerCase(),
    };
  }
}