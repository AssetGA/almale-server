const translations = [
  {
    product: 1,
    language: "kz",
    name: "Мыс ыдыс жиынтығы Alma Le 1.0",
    description:
      "Жинаққа сорпа мен кептірілген тағамдарды дайындауға арналған көлемі 6 литр кастрөл, қуыруға және сөндіруге арналған 3,6 литрлік таба, гарнирлер мен жармаларға арналған көлемі 3,5 литрлік кастрөл, сондай-ақ соустар мен құймаларға арналған көлемі 1,8 литрлік ыдыс кіреді",
    diameter: "",
  },
  {
    product: 1,
    language: "ru",
    name: "Медный набор посуды Alma Le 1.0",
    description:
      "Набор включает кастрюлю объемом 6 литров для приготовления супов и тушенных блюд, сковородку на 3,6 литра для жарки и тушения, кастрюлю на 3,5 литра для гарниров и круп, а также сотейник объемом 1,8 литра для соусов и подливок",
    diameter: "",
  },
  {
    product: 1,
    language: "en",
    name: "Copper cookware set Alma Le 1.0",
    description:
      "The set includes a 6-litre pot for making soups and stews, a 3.6-litre pan for frying and stewing, a 3.5-litre pot for sides and cereals, and a 1.8-litre sauté pan for sauces and gravies",
    diameter: "",
  },
  {
    product: 2,
    language: "kz",
    name: "6л кастрөл",
    description:
      "Қауіпсіз материалдардан жасалған. Плиталардың барлық түрлері үшін тамаша",
    diameter: "48 см",
  },
  {
    product: 2,
    language: "ru",
    name: "Кастрюля 6л",
    description:
      "Изготовленна из безопасных материалов. Идеальна для всех типов плит",
    diameter: "48 см",
  },
  {
    product: 2,
    language: "en",
    name: "Pot 6l",
    description: "Made of safe materials. Ideal for all plate types",
    diameter: "48 cm",
  },
  {
    product: 3,
    language: "kz",
    name: "Сотейник 1,8 л",
    description:
      "Қауіпсіз материалдардан жасалған. Плиталардың барлық түрлері үшін тамаша",
    diameter: "24 см",
  },
  {
    product: 3,
    language: "ru",
    name: "Сотейник 1,8 л",
    description:
      "Изготовленна из безопасных материалов. Идеальна для всех типов плит",
    diameter: "24 см",
  },
  {
    product: 3,
    language: "en",
    name: "Saucepan 1.8l",
    description: "Made of safe materials. Ideal for all plate types",
    diameter: "24 cm",
  },
  {
    product: 4,
    language: "kz",
    name: "3,5 л кастрөл",
    description:
      "Қауіпсіз материалдардан жасалған. Плиталардың барлық түрлері үшін тамаша",
    diameter: "24 см",
  },
  {
    product: 4,
    language: "ru",
    name: "Кастрюля 3,5 л",
    description:
      "Изготовленна из безопасных материалов. Идеальна для всех типов плит",
    diameter: "24 см",
  },
  {
    product: 4,
    language: "en",
    name: "Pan 3.5l",
    description: "Made of safe materials. Ideal for all plate types",
    diameter: "24 cm",
  },
  {
    product: 5,
    language: "kz",
    name: "Таба 3,6 л",
    description:
      "Қауіпсіз материалдардан жасалған. Плиталардың барлық түрлері үшін тамаша",
    diameter: "32 см",
  },
  {
    product: 5,
    language: "ru",
    name: "Сковородка 3,6 л",
    description:
      "Изготовленна из безопасных материалов. Идеальна для всех типов плит",
    diameter: "32 см",
  },
  {
    product: 5,
    language: "en",
    name: "Frying pan 3.6 l",
    description: "Made of safe materials. Ideal for all plate types",
    diameter: "32 cm",
  },
];

const getTranslation = (id, ind) => {
  const find = translations
    .filter((elem) => ind + 1 === elem.product)
    .map((elem) => ({ ...elem, product: id })); // Изменяем поле `product` на `id`

  return find;
};

module.exports = { getTranslation };
