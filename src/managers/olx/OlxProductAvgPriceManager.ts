import { OlxProductService } from "@/services/olx/OlxProductService";

export class OlxProductAvgPriceManager {
  service;

  constructor(service = new OlxProductService()) {
    this.service = service;
  }

  async calculateAllAvgPrices() {
    const products = await this.service.getPricesFromLastMonth();

    const updatedProducts = products.map((product) => {
      const avgPrice = this.calculateAvgPrice(product);

      return {
        id: product.id,
        avgPrice,
      };
    });

    for (const product of updatedProducts) {
      await this.service.updatable.update(
        product.id,
        this.service.updateMapper.toUpdateInput(product)
      );
    }
  }

  private calculateAvgPrice(product: { id: number; prices: number[] }) {
    const firstAvg =
      product.prices.reduce((accum, price) => {
        accum += price;
        return accum;
      }, 0) / product.prices.length;

    return (
      product.prices.reduce((accum, price) => {
        if (price < firstAvg * 1.3 || price > firstAvg * 0.7) {
          accum += price;
        }

        return accum;
      }, 0) / product.prices.length
    );
  }
}
