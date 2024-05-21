export interface IProductCreate {
    name: string;
    price: number;
    description: string;
    stock: number;
    gender: string;
    image: string[];
    brand: string;
    category: string;
    size: string[];
    color: string[];
}

export interface IProductUpdate {
    name?: string;
    price?: number;
    description?: string;
    stock?: number;
    gender?: string;
    image?: string[];
    brand?: string;
    category?: string;
    size?: string[];
    color?: string[];
}