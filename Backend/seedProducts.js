require("dotenv").config();

const connectDB = require("./config/database");
const productModel = require("./models/product.model");

const products = [
  // =====================================================
  // MIXED STARTING PRODUCTS
  // =====================================================

  {
    name: "ASUS Vivobook 15",
    description: "Slim laptop for coding, work and everyday use.",
    price: 54999,
    category: "Laptops",
    brand: "ASUS",
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "16GB",
      Storage: "512GB SSD",
      Processor: "Intel Core i5",
      Display: "15.6 inch",
    },
    tags: ["laptop", "coding", "student"],
  },

  {
    name: "Samsung Galaxy Watch 7",
    description:
      "Premium smartwatch with fitness tracking and health monitoring.",
    price: 29999,
    category: "Electronics",
    brand: "Samsung",
    stock: 13,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Display: "AMOLED",
      Battery: "40 hours",
      Connectivity: "Bluetooth",
      WaterResistance: "Yes",
    },
    tags: ["smartwatch", "fitness", "wearable"],
  },

  {
    name: "Sony WH-1000XM5",
    description:
      "Premium wireless headphones with advanced noise cancellation.",
    price: 29999,
    category: "Electronics",
    brand: "Sony",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Battery: "30 hours",
      "Noise Cancellation": "Yes",
      Connectivity: "Bluetooth",
      Type: "Over Ear",
    },
    tags: ["headphones", "wireless", "noise cancellation"],
  },

  {
    name: "Google Pixel 9",
    description:
      "Premium smartphone with an advanced camera and clean Android experience.",
    price: 74999,
    category: "Mobiles",
    brand: "Google",
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "12GB",
      Storage: "256GB",
      Display: "6.3 inch OLED",
      Camera: "50MP",
    },
    tags: ["phone", "smartphone", "camera", "android"],
  },

  {
    name: "Nike Air Max 270",
    description:
      "Comfortable everyday sneakers with a modern sporty design.",
    price: 11999,
    category: "Fashion",
    brand: "Nike",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Type: "Sneakers",
      Material: "Mesh",
      Sole: "Rubber",
      Usage: "Casual",
    },
    tags: ["shoes", "sneakers", "nike", "fashion"],
  },

  // =====================================================
  // LAPTOPS
  // =====================================================

  {
    name: "Lenovo IdeaPad Slim 5",
    description: "Powerful laptop designed for coding and productivity.",
    price: 54999,
    category: "Laptops",
    brand: "Lenovo",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "16GB",
      Storage: "512GB SSD",
      Processor: "Intel Core i5",
      Display: "15.6 inch",
    },
    tags: ["laptop", "coding", "student", "productivity"],
  },

  {
    name: "HP Pavilion 14",
    description:
      "Compact everyday laptop for work, study and entertainment.",
    price: 62999,
    category: "Laptops",
    brand: "HP",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "16GB",
      Storage: "512GB SSD",
      Processor: "Intel Core i5",
      Display: "14 inch",
    },
    tags: ["laptop", "work", "student"],
  },

  {
    name: "MacBook Air M2",
    description:
      "Lightweight Apple laptop with powerful performance and long battery life.",
    price: 89999,
    category: "Laptops",
    brand: "Apple",
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "8GB",
      Storage: "256GB SSD",
      Processor: "Apple M2",
      Display: "13.6 inch",
    },
    tags: ["laptop", "apple", "coding", "premium"],
  },

  {
    name: "Acer Aspire 5",
    description:
      "Affordable performance laptop for students and everyday productivity.",
    price: 47999,
    category: "Laptops",
    brand: "Acer",
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "16GB",
      Storage: "512GB SSD",
      Processor: "Intel Core i5",
      Display: "15.6 inch",
    },
    tags: ["laptop", "student", "budget", "productivity"],
  },

  {
    name: "Dell Inspiron 15",
    description:
      "Reliable everyday laptop for work, study and entertainment.",
    price: 58999,
    category: "Laptops",
    brand: "Dell",
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "16GB",
      Storage: "512GB SSD",
      Processor: "Intel Core i5",
      Display: "15.6 inch",
    },
    tags: ["laptop", "dell", "work", "student"],
  },

  // =====================================================
  // MOBILES
  // =====================================================

  {
    name: "Samsung Galaxy S24",
    description:
      "Flagship Android smartphone with powerful performance and premium display.",
    price: 69999,
    category: "Mobiles",
    brand: "Samsung",
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "8GB",
      Storage: "256GB",
      Display: "6.2 inch AMOLED",
      Camera: "50MP",
    },
    tags: ["phone", "smartphone", "android", "amoled"],
  },

  {
    name: "iPhone 15",
    description:
      "Powerful Apple smartphone with a vibrant display and excellent camera system.",
    price: 69999,
    category: "Mobiles",
    brand: "Apple",
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "6GB",
      Storage: "128GB",
      Display: "6.1 inch OLED",
      Camera: "48MP",
    },
    tags: ["iphone", "phone", "apple", "camera"],
  },

  {
    name: "OnePlus 13",
    description:
      "High-performance Android smartphone built for speed and gaming.",
    price: 64999,
    category: "Mobiles",
    brand: "OnePlus",
    stock: 13,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "12GB",
      Storage: "256GB",
      Display: "6.82 inch AMOLED",
      Processor: "Snapdragon",
    },
    tags: ["phone", "gaming", "android", "performance"],
  },

  {
    name: "Nothing Phone 2",
    description:
      "Modern smartphone with a unique design and smooth everyday performance.",
    price: 39999,
    category: "Mobiles",
    brand: "Nothing",
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "12GB",
      Storage: "256GB",
      Display: "6.7 inch OLED",
      Camera: "50MP",
    },
    tags: ["phone", "nothing", "android", "camera"],
  },

  {
    name: "Xiaomi 14",
    description:
      "Compact flagship smartphone with powerful performance and high-quality cameras.",
    price: 54999,
    category: "Mobiles",
    brand: "Xiaomi",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      RAM: "12GB",
      Storage: "512GB",
      Display: "6.36 inch AMOLED",
      Camera: "50MP",
    },
    tags: ["phone", "xiaomi", "camera", "android"],
  },

  // =====================================================
  // ELECTRONICS
  // =====================================================

  {
    name: "Bose QuietComfort",
    description:
      "Comfortable wireless headphones with powerful noise cancellation.",
    price: 24999,
    category: "Electronics",
    brand: "Bose",
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Battery: "24 hours",
      "Noise Cancellation": "Yes",
      Connectivity: "Bluetooth",
      Type: "Over Ear",
    },
    tags: ["headphones", "wireless", "bose", "travel"],
  },

  {
    name: "JBL Flip 6",
    description:
      "Portable Bluetooth speaker with powerful sound and waterproof design.",
    price: 9999,
    category: "Electronics",
    brand: "JBL",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Battery: "12 hours",
      Connectivity: "Bluetooth",
      WaterResistance: "IP67",
      Output: "30W",
    },
    tags: ["speaker", "bluetooth", "portable", "music"],
  },

  {
    name: "Apple Watch Series 10",
    description:
      "Advanced smartwatch for fitness tracking and everyday health insights.",
    price: 46999,
    category: "Electronics",
    brand: "Apple",
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Display: "OLED",
      Battery: "18 hours",
      Connectivity: "GPS",
      WaterResistance: "Yes",
    },
    tags: ["smartwatch", "apple", "fitness", "wearable"],
  },

  {
    name: "LG UltraGear 27",
    description:
      "High refresh rate gaming monitor with sharp visuals and smooth gameplay.",
    price: 27999,
    category: "Electronics",
    brand: "LG",
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Display: "27 inch",
      Resolution: "1440p",
      RefreshRate: "165Hz",
      Panel: "IPS",
    },
    tags: ["monitor", "gaming", "1440p", "165hz"],
  },

  {
    name: "Canon EOS R50",
    description:
      "Beginner-friendly mirrorless camera for photography and content creation.",
    price: 64999,
    category: "Electronics",
    brand: "Canon",
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Sensor: "24.2MP APS-C",
      Video: "4K",
      Lens: "18-45mm",
      Type: "Mirrorless",
    },
    tags: ["camera", "canon", "photography", "creator"],
  },

  // =====================================================
  // ACCESSORIES
  // =====================================================

  {
    name: "Logitech MX Master 3S",
    description:
      "Advanced wireless mouse designed for developers and productivity users.",
    price: 8999,
    category: "Accessories",
    brand: "Logitech",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Connectivity: "Bluetooth",
      DPI: "8000",
      Buttons: "7",
      Battery: "70 days",
    },
    tags: ["mouse", "coding", "productivity", "wireless"],
  },

  {
    name: "Keychron K2",
    description:
      "Compact wireless mechanical keyboard suitable for coding and productivity.",
    price: 8999,
    category: "Accessories",
    brand: "Keychron",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Type: "Mechanical",
      Connectivity: "Bluetooth",
      Layout: "75%",
      Backlight: "RGB",
    },
    tags: ["keyboard", "mechanical", "coding", "wireless"],
  },

  {
    name: "Razer DeathAdder V3",
    description:
      "Lightweight gaming mouse with precise tracking and ergonomic design.",
    price: 6999,
    category: "Accessories",
    brand: "Razer",
    stock: 17,
    images: [
      "https://images.unsplash.com/photo-1615663245857-acd977736f?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Connectivity: "Wired",
      DPI: "30000",
      Weight: "63g",
      Sensor: "Optical",
    },
    tags: ["mouse", "gaming", "razer", "performance"],
  },

  {
    name: "Anker USB-C Hub",
    description:
      "Multi-port USB-C hub for laptops, tablets and modern devices.",
    price: 3999,
    category: "Accessories",
    brand: "Anker",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Ports: "7",
      Connectivity: "USB-C",
      HDMI: "4K",
      PowerDelivery: "100W",
    },
    tags: ["usb-c", "hub", "laptop", "accessory"],
  },

  {
    name: "Samsung 1TB Portable SSD",
    description:
      "Fast portable SSD for backups, files and everyday storage.",
    price: 9999,
    category: "Accessories",
    brand: "Samsung",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Storage: "1TB",
      Interface: "USB-C",
      Speed: "1050MB/s",
      Type: "Portable SSD",
    },
    tags: ["ssd", "storage", "usb-c", "portable"],
  },

  // =====================================================
  // FASHION
  // =====================================================

  {
    name: "Levi's 511 Slim Jeans",
    description:
      "Classic slim-fit jeans designed for everyday casual wear.",
    price: 2999,
    category: "Fashion",
    brand: "Levi's",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Material: "Denim",
      Fit: "Slim",
      Style: "Casual",
      Gender: "Unisex",
    },
    tags: ["jeans", "denim", "casual", "fashion"],
  },

  {
    name: "Adidas Essentials Hoodie",
    description:
      "Comfortable everyday hoodie with a clean sporty design.",
    price: 3499,
    category: "Fashion",
    brand: "Adidas",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Material: "Cotton Blend",
      Fit: "Regular",
      Style: "Casual",
      Season: "All Season",
    },
    tags: ["hoodie", "adidas", "casual", "clothing"],
  },

  {
    name: "Ray-Ban Classic Sunglasses",
    description:
      "Classic sunglasses with a timeless design suitable for everyday wear.",
    price: 8999,
    category: "Fashion",
    brand: "Ray-Ban",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Frame: "Classic",
      Lens: "UV Protected",
      Style: "Casual",
      Material: "Acetate",
    },
    tags: ["sunglasses", "ray-ban", "fashion", "accessory"],
  },

  {
    name: "Nike Everyday Running Shoes",
    description:
      "Lightweight running shoes designed for comfort and daily workouts.",
    price: 7999,
    category: "Fashion",
    brand: "Nike",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Type: "Running Shoes",
      Material: "Mesh",
      Sole: "Rubber",
      Usage: "Running",
    },
    tags: ["shoes", "running", "nike", "sports"],
  },

  {
    name: "Casio Vintage Digital Watch",
    description:
      "Retro digital watch with a classic everyday design.",
    price: 2499,
    category: "Fashion",
    brand: "Casio",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    ],
    specifications: {
      Display: "Digital",
      Battery: "7 years",
      WaterResistance: "Yes",
      Style: "Vintage",
    },
    tags: ["watch", "casio", "vintage", "fashion"],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Remove existing products so the new catalogue starts fresh.
    await productModel.deleteMany({});

    await productModel.insertMany(products);

    console.log(`${products.length} products seeded successfully.`);

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();