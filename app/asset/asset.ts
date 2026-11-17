import { ProductType } from "@/lib/types/productType";
import hero from "./hero.png";
import hero1 from "./hero1.jpeg";
import hero2 from "./hero2.png";
import logo from "./logo.png";

const products: ProductType[] = [
  {
    "_id": "prod_001",
    "slug": "classic-cotton-tshirt",
    "title": "Classic Cotton T-Shirt",
    "description": "A comfortable, breathable 100% organic cotton everyday t-shirt. This classic crew-neck tee is crafted from premium long-staple organic cotton that feels incredibly soft against the skin while remaining durable wash after wash. The relaxed yet tailored fit makes it perfect for layering or wearing on its own, and the reinforced shoulder seams ensure it keeps its shape through years of regular wear. Whether you're running errands, lounging at home, or heading out with friends, this versatile wardrobe staple delivers all-day comfort and effortless style.",
    "price": 29.99,
    "discountPrice": 24.99,
    "stock": 5,
    "brand": "UrbanBasics",
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800"
    ],
    "category": "Apparel",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["White", "Black", "Navy"],
    "bestSelling": true,
    "rating": 4.8,
    "soldCount": 450
  },
  {
    "_id": "prod_002",
    "slug": "slim-fit-denim-jeans",
    "title": "Slim Fit Denim Jeans",
    "description": "Modern slim-fit jeans made from stretch denim for maximum comfort and mobility. These jeans feature a mid-rise waist and a tapered leg that flatters every body type, while the added elastane gives you the freedom to move without ever feeling restricted. The rich indigo wash is achieved through an eco-friendly dyeing process, and the reinforced belt loops and double-stitched seams ensure long-lasting durability. Perfect for pairing with sneakers or boots, these jeans transition seamlessly from casual Fridays at the office to weekend adventures.",
    "price": 79.99,
    "discountPrice": 64.99,
    "stock": 18,
    "brand": "DenimCo",
    "images": [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
    ],
    "category": "Apparel",
    "sizes": ["28", "30", "32", "34", "36"],
    "colors": ["Indigo", "Black", "Light Blue"],
    "bestSelling": true,
    "rating": 4.6,
    "soldCount": 320
  },
  {
    "_id": "prod_003",
    "slug": "leather-belt",
    "title": "Genuine Leather Belt",
    "description": "Handcrafted full-grain leather belt with a brushed metal buckle that adds a touch of timeless sophistication to any outfit. Each belt is cut from a single piece of premium full-grain leather, meaning it develops a beautiful unique patina over time that only gets better with age. The sturdy buckle is secured with double-riveted construction, and the five-hole adjustment system ensures a perfect fit for years to come. This is the kind of accessory that works equally well with tailored trousers and your favorite pair of jeans, making it a genuine investment piece.",
    "price": 45.0,
    "discountPrice": 38.25,
    "stock": 32,
    "brand": "CraftLeather",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800"
    ],
    "category": "Accessories",
    "sizes": ["S", "M", "L"],
    "colors": ["Brown", "Black"],
    "bestSelling": false,
    "rating": 4.7,
    "soldCount": 210
  },
  {
    "_id": "prod_004",
    "slug": "canvas-backpack",
    "title": "Canvas Everyday Backpack",
    "description": "A durable waxed canvas backpack with a padded laptop sleeve and multiple organizational pockets for daily commutes and weekend trips. The water-resistant waxed canvas exterior shields your belongings from unexpected rain, while the padded back panel and adjustable ergonomic straps keep you comfortable even when the bag is fully loaded. Inside, you'll find a dedicated 15-inch laptop compartment, two mesh pockets, a key clip, and a spacious main compartment that fits a day's worth of gear. The antique brass hardware and leather trim give it a rugged, heritage look that never goes out of style.",
    "price": 89.99,
    "discountPrice": 74.99,
    "stock": 12,
    "brand": "TrailGear",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800"
    ],
    "category": "Accessories",
    "sizes": ["One Size"],
    "colors": ["Olive", "Charcoal", "Tan"],
    "bestSelling": true,
    "rating": 4.9,
    "soldCount": 610
  },
  {
    "_id": "prod_005",
    "slug": "running-sneakers",
    "title": "Lightweight Running Sneakers",
    "description": "Engineered mesh running sneakers with responsive foam cushioning and a breathable upper for maximum performance on every run. The seamless engineered mesh upper delivers targeted ventilation where you need it most, while the responsive midsole foam returns energy with every stride to help you go farther and faster. A durable rubber outsole with a multi-directional tread pattern provides reliable traction on both wet and dry surfaces, and the padded heel collar locks your foot in place for a secure, blister-free fit mile after mile.",
    "price": 119.99,
    "discountPrice": 99.99,
    "stock": 25,
    "brand": "SpeedRun",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
    ],
    "category": "Footwear",
    "sizes": ["7", "8", "9", "10", "11", "12"],
    "colors": ["Black", "White", "Red"],
    "bestSelling": true,
    "rating": 4.5,
    "soldCount": 890
  },
  {
    "_id": "prod_006",
    "slug": "wireless-headphones",
    "title": "Wireless Noise-Cancelling Headphones",
    "description": "Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and plush memory foam ear cushions for immersive listening. The advanced hybrid active noise cancellation technology blocks out up to 95% of ambient noise, letting you focus on your music, podcast, or call even in the noisiest environments. Bluetooth 5.3 delivers a stable connection with low latency, and the built-in multipoint pairing lets you switch seamlessly between your laptop and phone. A quick 10-minute charge gives you 5 hours of playback, and the foldable design makes them easy to pack for travel.",
    "price": 199.99,
    "discountPrice": 169.99,
    "stock": 8,
    "brand": "AudioWave",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"
    ],
    "category": "Electronics",
    "sizes": ["One Size"],
    "colors": ["Black", "Silver", "Midnight Blue"],
    "bestSelling": true,
    "rating": 4.7,
    "soldCount": 1200
  },
  {
    "_id": "prod_007",
    "slug": "smart-watch",
    "title": "Fitness Smart Watch",
    "description": "Advanced fitness smart watch with heart rate monitoring, GPS tracking, sleep analysis, and a bright always-on AMOLED display that stays readable even in direct sunlight. Track more than 100 workout modes, monitor your blood oxygen levels, and receive smart notifications from your phone right on your wrist. The 5ATM water resistance means you can swim, shower, and sweat without worry, while the 14-day battery life keeps you connected without constant charging. Compatible with both iOS and Android, it's the perfect companion for anyone serious about their health and fitness goals.",
    "price": 249.99,
    "discountPrice": 199.99,
    "stock": 15,
    "brand": "TechFit",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
    ],
    "category": "Electronics",
    "sizes": ["40mm", "44mm"],
    "colors": ["Black", "Rose Gold", "Silver"],
    "bestSelling": false,
    "rating": 4.4,
    "soldCount": 540
  },
  {
    "_id": "prod_008",
    "slug": "ceramic-coffee-mug",
    "title": "Handmade Ceramic Coffee Mug",
    "description": "Hand-glazed stoneware coffee mug that keeps your favorite brew warm and adds a rustic artisan touch to your morning routine. Each mug is individually thrown and glazed by skilled artisans, meaning no two pieces are exactly alike and you receive a truly one-of-a-kind item. The thick stoneware walls retain heat far longer than standard mugs, and the ergonomic handle is shaped to fit comfortably in your hand. Microwave and dishwasher safe for everyday convenience, this 12oz mug is the perfect gift for coffee lovers who appreciate craftsmanship.",
    "price": 24.0,
    "discountPrice": 19.2,
    "stock": 40,
    "brand": "EarthWorks",
    "images": [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800"
    ],
    "category": "Home & Kitchen",
    "sizes": ["12oz"],
    "colors": ["Speckled Cream", "Ocean Blue", "Terracotta"],
    "bestSelling": false,
    "rating": 4.8,
    "soldCount": 275
  },
  {
    "_id": "prod_009",
    "slug": "stainless-water-bottle",
    "title": "Insulated Stainless Steel Water Bottle",
    "description": "Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours, made from food-grade 18/8 stainless steel. The leak-proof lid with a silicone gasket ensures your bag stays dry, while the powder-coated exterior provides a secure grip and resists condensation. BPA-free and dishwasher safe, this 32oz bottle is designed to replace hundreds of single-use plastic bottles each year. The wide mouth fits ice cubes easily and accommodates most water filters, making it ideal for the gym, office, hiking, and travel.",
    "price": 34.99,
    "discountPrice": 27.99,
    "stock": 50,
    "brand": "HydroLife",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800"
    ],
    "category": "Sports & Outdoors",
    "sizes": ["24oz", "32oz", "40oz"],
    "colors": ["Matte Black", "Sage Green", "Coral"],
    "bestSelling": true,
    "rating": 4.9,
    "soldCount": 1500
  },
  {
    "_id": "prod_010",
    "slug": "yoga-mat",
    "title": "Non-Slip Yoga Mat",
    "description": "Extra-thick 6mm non-slip yoga mat with alignment lines and a carrying strap for comfortable practice at home or in the studio. The dual-texture surface provides superior grip even during hot yoga sessions, while the 6mm high-density TPE foam cushions your joints and protects your knees and elbows during floor poses. Printed alignment guides help you perfect your form, and the lightweight, eco-friendly material is free from latex and PVC. When you're done, simply roll it up and carry it with the included strap - it's that easy.",
    "price": 49.99,
    "discountPrice": 39.99,
    "stock": 22,
    "brand": "ZenFlow",
    "images": [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800"
    ],
    "category": "Sports & Outdoors",
    "sizes": ["68\" x 24\""],
    "colors": ["Purple", "Teal", "Grey"],
    "bestSelling": false,
    "rating": 4.6,
    "soldCount": 380
  },
  {
    "_id": "prod_011",
    "slug": "polarized-sunglasses",
    "title": "Polarized Aviator Sunglasses",
    "description": "Classic aviator sunglasses with polarized lenses that block 100% of UVA and UVB rays and reduce glare for clearer, more comfortable vision on bright days. The lightweight metal frame is built from corrosion-resistant alloy and features adjustable nose pads for a customized, secure fit on any face shape. Polarized lenses cut through reflective glare from water, snow, and pavement, making them ideal for driving, fishing, and beach days. Each pair comes with a hard protective case, a microfiber cleaning cloth, and a lifetime warranty against frame defects.",
    "price": 59.99,
    "discountPrice": 47.99,
    "stock": 30,
    "brand": "SunVista",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
    ],
    "category": "Accessories",
    "sizes": ["One Size"],
    "colors": ["Gold/Green", "Silver/Blue", "Black/Grey"],
    "bestSelling": false,
    "rating": 4.3,
    "soldCount": 190
  },
  {
    "_id": "prod_012",
    "slug": "scented-candle",
    "title": "Soy Wax Scented Candle",
    "description": "Hand-poured soy wax candle with a natural cotton wick and a relaxing lavender and vanilla scent that burns cleanly for up to 50 hours. Made from 100% natural soy wax, this candle burns slower and cleaner than paraffin alternatives, releasing a subtle, room-filling fragrance without any harsh chemicals or black soot. The reusable amber glass jar with its minimalist label looks beautiful on a nightstand, shelf, or coffee table, and the cotton wick ensures an even, steady flame. Perfect for unwinding after a long day, setting a cozy mood, or gifting to someone special.",
    "price": 22.0,
    "discountPrice": 17.6,
    "stock": 45,
    "brand": "AromaNest",
    "images": [
      "https://images.unsplash.com/photo-1602874801006-8f7f8e3c4a3a?w=800",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800"
    ],
    "category": "Home & Kitchen",
    "sizes": ["8oz"],
    "colors": ["Lavender Vanilla", "Sandalwood", "Citrus Grove"],
    "bestSelling": true,
    "rating": 4.8,
    "soldCount": 720
  },
  {
    "_id": "prod_013",
    "slug": "mechanical-keyboard",
    "title": "Compact Mechanical Keyboard",
    "description": "A 75% hot-swappable mechanical keyboard with tactile brown switches, PBT keycaps, and customizable RGB backlighting for work and gaming. The hot-swap PCB lets you change switches without soldering, so you can customize the feel and sound of every key to your exact preference. Dye-sublimated PBT keycaps resist shine and wear far better than standard ABS, and the gasket-mounted design absorbs typing vibration for a satisfying, cushioned feel. Connect via USB-C, Bluetooth, or the included 2.4GHz wireless dongle, and switch between three paired devices with a single keypress.",
    "price": 129.99,
    "discountPrice": 109.99,
    "stock": 10,
    "brand": "KeyForge",
    "images": [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800"
    ],
    "category": "Electronics",
    "sizes": ["75%"],
    "colors": ["White", "Black", "Navy"],
    "bestSelling": false,
    "rating": 4.7,
    "soldCount": 260
  },
  {
    "_id": "prod_014",
    "slug": "cotton-hoodie",
    "title": "Heavyweight Cotton Hoodie",
    "description": "A cozy heavyweight cotton hoodie with a brushed fleece interior and a relaxed fit that's perfect for chilly mornings and laid-back weekends. Made from a 400gsm cotton-poly blend, this hoodie feels substantial without being bulky, and the brushed fleece lining traps warmth while remaining breathable. The double-lined hood with a flat drawcord, ribbed cuffs, and a kangaroo pocket complete the classic look, and the pre-shrunk fabric means it keeps its size and shape through countless washes. Layer it under a jacket or wear it on its own - either way, it's an instant favorite.",
    "price": 64.99,
    "discountPrice": 54.99,
    "stock": 16,
    "brand": "UrbanBasics",
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800"
    ],
    "category": "Apparel",
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colors": ["Heather Grey", "Black", "Forest Green"],
    "bestSelling": true,
    "rating": 4.6,
    "soldCount": 430
  },
  {
    "_id": "prod_015",
    "slug": "leather-notebook",
    "title": "Refillable Leather Notebook",
    "description": "A refillable full-grain leather notebook with 160 pages of thick, fountain-pen-friendly paper and an elastic closure for journalling on the go. The supple leather cover softens and darkens beautifully with use, developing a personal character that no mass-produced notebook can match. The lay-flat binding makes writing comfortable on both pages, and the 100gsm acid-free paper resists bleed-through and feathering from even the wettest fountain pen inks. A ribbon bookmark, an expandable back pocket, and a pen loop complete this premium journal that's built to be refilled and treasured for decades.",
    "price": 42.0,
    "discountPrice": 35.7,
    "stock": 20,
    "brand": "CraftLeather",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800"
    ],
    "category": "Stationery",
    "sizes": ["A5"],
    "colors": ["Saddle Brown", "Black", "Burgundy"],
    "bestSelling": false,
    "rating": 4.9,
    "soldCount": 340
  }
]

export const asset = { logo, slides: [hero, hero1, hero2], products };
