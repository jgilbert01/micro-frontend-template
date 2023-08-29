declare module "*.jpg" {
  export default "" as string;
}
declare module "*.png" {
  export default "" as string;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
