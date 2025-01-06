import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import product0 from '../../../public/product-page-0.jpg';
import product1 from '../../../public/product-page-1.jpg';
import product2 from '../../../public/product-page-2.jpg';

import relatedProduct0 from "../../../public/product-related-0.jpg";

export const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
    },
    {
      id: "men",
      name: "Men",
    },
    {
      id: "company",
      name: "Company",
    },
    {
      id: "stores",
      name: "Stores",
    },
  ],
};
export const product = {
  name: "Basic Tee",
  price: "35 €",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      id: 1,
      imageSrc: product0,
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc: product1,
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc: product2,
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  sizes: [
    { name: "option 111111111", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
};
export const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 days",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];
export const reviews = {
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
      author: "Risako M",
      date: "May 16, 2021",
      datetime: "2021-01-06",
    },
    {
      id: 2,
      title: "Great quality and fast shipping",
      rating: 4,
      content: `
        <p>I love the quality of the fabric and the color. The shipping was fast, and everything came as expected. I'll definitely shop here again!</p>
        <p>One minor issue: the size was a bit larger than I anticipated, but nothing that can't be adjusted.</p>
      `,
      author: "John D",
      date: "June 1, 2021",
      datetime: "2021-06-01",
    },
    {
      id: 3,
      title: "Not what I expected",
      rating: 2,
      content: `
        <p>The product arrived late and was not as described. The material felt cheap, and the color wasn't the same as in the pictures. I'm not sure if I'll order again.</p>
        <p>Customer service was responsive, but the experience left a lot to be desired.</p>
      `,
      author: "Laura B",
      date: "June 10, 2021",
      datetime: "2021-06-10",
    },
    {
      id: 4,
      title: "Perfect fit and beautiful design",
      rating: 5,
      content: `
        <p>The dress fit perfectly, and the design was just stunning. I received so many compliments when I wore it. I highly recommend this store for anyone looking for stylish and comfortable clothing.</p>
      `,
      author: "Samantha W",
      date: "July 2, 2021",
      datetime: "2021-07-02",
    },
    {
      id: 5,
      title: "Good value for money",
      rating: 4,
      content: `
        <p>Great product for the price. It looks good, feels comfortable, and is made of quality materials. I'm happy with my purchase, and it's a good deal for the money.</p>
      `,
      author: "David P",
      date: "July 10, 2021",
      datetime: "2021-07-10",
    },
  ],
};

export const relatedProducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Front of men's Basic Tee in white.",
    price: "35 €",
    color: "Aspen White",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Slim Fit Jeans in Dark Blue.",
    price: "60 €",
    color: "Dark Blue",
  },
  {
    id: 3,
    name: "Leather Jacket",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Leather Jacket in Black.",
    price: "150 €",
    color: "Black",
  },
  {
    id: 4,
    name: "Casual Sneakers",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "White Casual Sneakers for men.",
    price: "45 €",
    color: "White",
  },
  {
    id: 5,
    name: "Graphic Hoodie",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Graphic Hoodie in Charcoal Grey.",
    price: "70 €",
    color: "Charcoal Grey",
  },
  {
    id: 6,
    name: "Sports Watch",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Sports Watch with Silver Strap.",
    price: "120 €",
    color: "Silver",
  },
  {
    id: 7,
    name: "Sports Watch",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Sports Watch with Silver Strap.",
    price: "120 NDT",
    color: "Silver",
  },
  {
    id: 8,
    name: "Sports Watch",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Sports Watch with Silver Strap.",
    price: "120 $",
    color: "Silver",
  },
  {
    id: 9,
    name: "Sports Watch",
    href: "#",
    imageSrc: relatedProduct0,
    imageAlt: "Men's Sports Watch with Silver Strap.",
    price: "120 VND",
    color: "Silver",
  }
];



export const footerNavigation = {
  products: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  customerService: [
    { name: "Contact", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "Secure Payments", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
  ],
};
