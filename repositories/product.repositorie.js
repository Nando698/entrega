
import { productDaoType } from "../config/config.js";
import { ProductosDto } from "../dtos/index.js";
import BaseRepository from "./BaseRepository.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductFactoryDao, productDaoType, ProductosDto);
  }
}

const productRepository = new ProductRepository();

export default productRepository;