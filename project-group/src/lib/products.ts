
//src/lib/produtcts.ts
export type Product = {
  id: string;
  title: string;
  price: number;
  category: "furniture" | "kitchenware" | "decor";
  image: string;
};

export const mockProducts: Product[] = [
  { id: "p1", category: "furniture",   title: "handmade mug",  price: 35, image: "/products/handmade_mug.png"},
  { id: "p2", category: "kitchenware",  title: "ceramic plate", price: 20, image: "/products/ceramic_plate.png" },
 
  { id: "p3", category: "decor",        title: "wall art",      price: 50, image: "/products/wall_art.png" },
  { id: "p4", category: "kitchenware",  title: "glass jar set", price: 15, image: "/products/glass_jar_set.png" },
  { id: "p5", category: "furniture",    title: "wooden chair",  price: 80, image: "/products/wooden_chair.png" },
  { id: "p6", category: "decor",        title: "vase set",      price: 30, image: "/products/vase_set.png" },
];