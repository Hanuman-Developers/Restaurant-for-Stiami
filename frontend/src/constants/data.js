import images from "./images";

const wines = [
  {
    id: 1,
    title: "Chapel Hill Shiraz",
    price: 56,
    // tags: "AU | Bottle",
    tags: images.salad1,
    amount: 0,
  },
  {
    id: 2,
    title: "Catena Malbee",
    price: 59,
    // tags: "AU | Bottle",
    tags: images.salad2,

    amount: 0,
  },
  {
    id: 3,
    title: "La Vieillw Rose",
    price: 44,
    // tags: "FR | 750 ml",
    tags: images.salad3,

    amount: 0,
  },
  {
    id: 4,
    title: "Rhino Pale Ale",
    price: 31,
    // tags: "CA | 750 ml",
    tags: images.salad4,

    amount: 0,
  },
  {
    id: 5,
    title: "Irish Guinness",
    price: 26,
    // tags: "IE | 750 ml",
    tags: images.salad5,

    amount: 0,
  },
];

const cocktails = [
  {
    id: 6,
    title: "Chapel Hill Shiraz",
    price: "$56",
    tags: "AU | Bottle",
    amount: 0,
  },
  {
    id: 7,
    title: "Catena Malbee",
    price: "$59",
    tags: "AU | Bottle",
    amount: 0,
  },
  {
    id: 8,
    title: "La Vieillw Rose",
    price: "$44",
    tags: "FR | 750 ml",
    amount: 0,
  },
  {
    id: 9,
    title: "Rhino Pale Ale",
    price: "$31",
    tags: "CA | 750 ml",
    amount: 0,
  },
  {
    id: 10,
    title: "Irish Guinness",
    price: "$26",
    tags: "IE | 750 ml",
    amount: 0,
  },
];

const awards = [
  {
    imgUrl: images.award02,
    title: "Bib Gourmond",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award01,
    title: "Rising Star",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award05,
    title: "AA Hospitality",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award03,
    title: "Outstanding Chef",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
];

export default { wines, cocktails, awards };
