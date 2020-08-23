export interface ProductCategory {
  id: string;
  name: string;
}

export interface ResourceCategory {
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
