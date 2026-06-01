const mockMenu = [
  {
    id: "pizza-margherita",
    name: "Margherita",
    description: "Sos de rosii San Marzano, mozzarella fior di latte si busuioc proaspat.",
    price: 9.5,
    category: "Pizza",
    available: true
  },
  {
    id: "pizza-diavola",
    name: "Diavola",
    description: "Salam picant italian, mozzarella si fulgi de chili.",
    price: 12.5,
    category: "Pizza",
    available: true
  },
  {
    id: "pizza-quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmigiano si ricotta cremoasa.",
    price: 13,
    category: "Pizza",
    available: true
  },
  {
    id: "pizza-prosciutto-funghi",
    name: "Prosciutto e Funghi",
    description: "Sunca italiana, ciuperci sotate si mozzarella.",
    price: 12,
    category: "Pizza",
    available: false
  },
  {
    id: "pasta-carbonara",
    name: "Spaghetti Carbonara",
    description: "Reteta clasica cu guanciale, pecorino si galbenus.",
    price: 11.5,
    category: "Pasta",
    available: true
  },
  {
    id: "pasta-arrabbiata",
    name: "Penne Arrabbiata",
    description: "Sos de rosii, usturoi, patrunjel si chili.",
    price: 10,
    category: "Pasta",
    available: true
  },
  {
    id: "pasta-pesto",
    name: "Tagliatelle al Pesto",
    description: "Busuioc, muguri de pin, parmesan si ulei de masline.",
    price: 11,
    category: "Pasta",
    available: true
  },
  {
    id: "pasta-lasagna",
    name: "Lasagna della Casa",
    description: "Straturi fragede cu ragu de vita si sos bechamel.",
    price: 13.5,
    category: "Pasta",
    available: true
  },
  {
    id: "desert-tiramisu",
    name: "Tiramisu",
    description: "Crema fina de mascarpone, cafea espresso si cacao.",
    price: 6.5,
    category: "Dessert",
    available: true
  },
  {
    id: "desert-panna-cotta",
    name: "Panna Cotta",
    description: "Vanilie bourbon cu sos de fructe de padure.",
    price: 6,
    category: "Dessert",
    available: true
  },
  {
    id: "desert-cannoli",
    name: "Cannoli Siciliani",
    description: "Tuburi crocante umplute cu ricotta si portocala confiata.",
    price: 7,
    category: "Dessert",
    available: true
  },
  {
    id: "desert-gelato",
    name: "Gelato Artigianale",
    description: "Selectie de arome artizanale, servita la cupa.",
    price: 5.5,
    category: "Dessert",
    available: false
  },
  {
    id: "drink-espresso",
    name: "Espresso",
    description: "Cafea italiana intensa, servita scurt.",
    price: 2.8,
    category: "Getr\xE4nke",
    available: true
  },
  {
    id: "drink-aperol",
    name: "Aperol Spritz",
    description: "Aperol, prosecco si apa minerala.",
    price: 7.5,
    category: "Getr\xE4nke",
    available: true
  },
  {
    id: "drink-lemonade",
    name: "Limonata della Casa",
    description: "Limonada fresh cu menta si citrice.",
    price: 4.5,
    category: "Getr\xE4nke",
    available: true
  },
  {
    id: "drink-water",
    name: "Apa Minerala",
    description: "Apa plata sau carbogazoasa, 500ml.",
    price: 3,
    category: "Getr\xE4nke",
    available: true
  },
  {
    id: "salat-mista",
    name: "Insalata Mista",
    description: "Gemischter Salat mit Tomaten, Gurken, roten Zwiebeln und Hausdressing.",
    price: 7.5,
    category: "Salate",
    available: true
  },
  {
    id: "salat-caprese",
    name: "Caprese",
    description: "Mozzarella fior di latte, Tomaten, Basilikum und Oliven\xF6l.",
    price: 8.5,
    category: "Salate",
    available: true
  }
];
const menuCategories = ["Pizza", "Pasta", "Salate", "Dessert", "Getr\xE4nke"];
export {
  menuCategories,
  mockMenu
};
