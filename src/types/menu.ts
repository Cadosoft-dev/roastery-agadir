export type MenuCategory =
  | "petit-dejeuner"
  | "brunch"
  | "entrees"
  | "plats"
  | "desserts"
  | "cafe-the"
  | "cocktails";

export type MenuItem = {
  id: string;
  nameFR: string;
  nameEN: string;
  nameAR: string;
  descriptionFR: string;
  descriptionEN: string;
  descriptionAR: string;
  price: number;
  currency: "MAD";
  category: MenuCategory;
  photo?: string;
  isSignature?: boolean;
  tags?: ("vegetarian" | "seafood" | "meat" | "dessert" | "popular")[];
};
