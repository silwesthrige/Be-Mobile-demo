// Sample catalog data. Replace names, prices and photos with real stock.
const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=700&q=75&auto=format&fit=crop`;

const CATEGORIES = [
  { id: "phones", label: "Smartphones" },
  { id: "speakers", label: "Speakers" },
  { id: "audio", label: "Earbuds & Headphones" },
  { id: "watches", label: "Smart Watches" },
  { id: "power", label: "Power Banks" },
  { id: "chargers", label: "Chargers & Cables" },
  { id: "covers", label: "Covers" },
];

const PRODUCTS = [
  // Smartphones
  { id: "p01", cat: "phones", brand: "Samsung", name: "Galaxy A55 5G 8GB/256GB", price: 134900, oldPrice: 144900, rating: 4.8, badge: "Sale", featured: true, img: IMG("1592899677977-9c10ca588bbd"), specs: ["6.6\" Super AMOLED 120Hz", "50MP OIS main camera", "5000mAh battery", "1 year company warranty"] },
  { id: "p02", cat: "phones", brand: "Apple", name: "iPhone 11 64GB", price: 104900, rating: 4.7, badge: "UK Version", img: IMG("1571380401583-72ca84994796"), specs: ["6.1\" Liquid Retina", "Dual 12MP cameras", "A13 Bionic chip", "UK version, fully checked"] },
  { id: "p03", cat: "phones", brand: "Xiaomi", name: "Redmi Note 13 8GB/256GB", price: 64900, rating: 4.6, badge: "New", featured: true, img: IMG("1583291023438-41cef6453b1f"), specs: ["6.67\" AMOLED 120Hz", "108MP camera", "33W fast charging", "5000mAh battery"] },
  { id: "p04", cat: "phones", brand: "Samsung", name: "Galaxy S23 FE 8GB/256GB", price: 159900, oldPrice: 172000, rating: 4.8, badge: "Sale", img: IMG("1640936343842-268f9d87e764"), specs: ["6.4\" Dynamic AMOLED 2X", "50MP triple camera", "IP68 water resistant", "Wireless charging"] },
  { id: "p05", cat: "phones", brand: "Vivo", name: "Y28 8GB/128GB", price: 46500, rating: 4.4, img: IMG("1480694313141-fce5e697ee25"), specs: ["6.68\" 90Hz display", "50MP camera", "6000mAh battery", "44W FlashCharge"] },
  { id: "p06", cat: "phones", brand: "Tecno", name: "Spark 20 Pro 8GB/256GB", price: 42900, rating: 4.3, img: IMG("1511707171634-5f897ff02aa9"), specs: ["6.78\" 120Hz display", "108MP camera", "33W charging", "Dual speakers"] },

  // Speakers
  { id: "s01", cat: "speakers", brand: "JBL", name: "Charge 5 Portable Speaker", price: 52500, rating: 4.9, badge: "Best Seller", featured: true, img: IMG("1588131153911-a4ea5189fe19"), specs: ["20 hours playtime", "IP67 waterproof", "Built-in power bank", "PartyBoost pairing"] },
  { id: "s02", cat: "speakers", brand: "JBL", name: "Flip 6 Portable Speaker", price: 38900, rating: 4.8, featured: true, img: IMG("1608043152269-423dbba4e7e1"), specs: ["12 hours playtime", "IP67 waterproof", "Racetrack woofer + tweeter", "PartyBoost pairing"] },
  { id: "s03", cat: "speakers", brand: "Be Bass", name: "Dual-Ring RGB Party Box + 2 Mics", price: 39500, oldPrice: 45000, rating: 4.7, badge: "6M Warranty", featured: true, img: IMG("1589256469067-ea99122bbdc4"), specs: ["Dual 8\" woofers", "2 wireless karaoke mics", "RGB light rings", "Bluetooth · USB · FM · AUX"] },
  { id: "s04", cat: "speakers", brand: "JBL", name: "Go 3 Mini Speaker", price: 12900, rating: 4.6, img: IMG("1549638767-0ccf6cb1281b"), specs: ["5 hours playtime", "IP67 waterproof", "Built-in strap", "Pocket size"] },
  { id: "s05", cat: "speakers", brand: "JBL", name: "Flip 5 (Red)", price: 29900, oldPrice: 33500, rating: 4.7, badge: "Sale", img: IMG("1558537348-c0f8e733989d"), specs: ["12 hours playtime", "IPX7 waterproof", "USB-C charging", "PartyBoost pairing"] },
  { id: "s06", cat: "speakers", brand: "JBL", name: "Flip Essential 2 (White)", price: 27500, rating: 4.5, badge: "UK Version", img: IMG("1561930661-20c9650e3e25"), specs: ["10 hours playtime", "IPX7 waterproof", "Rugged fabric finish", "Bluetooth 5.1"] },
  { id: "s07", cat: "speakers", brand: "Be Bass", name: "Mini Bass Bluetooth Speaker", price: 6900, rating: 4.2, img: IMG("1589003077984-894e133dabab"), specs: ["8 hours playtime", "TF card & USB", "Hands-free calls", "Compact metal grille"] },

  // Audio
  { id: "a01", cat: "audio", brand: "Apple", name: "AirPods Pro (2nd Gen)", price: 64900, rating: 4.9, badge: "New", featured: true, img: IMG("1572569511254-d8f925fe2cbb"), specs: ["Active noise cancellation", "Adaptive transparency", "USB-C MagSafe case", "Up to 30 hours with case"] },
  { id: "a02", cat: "audio", brand: "JBL", name: "Tune 720BT Headphones", price: 22900, rating: 4.7, img: IMG("1622473776277-c57c423daf63"), specs: ["76 hours playtime", "JBL Pure Bass", "Multipoint connection", "Foldable design"] },
  { id: "a03", cat: "audio", brand: "JBL", name: "Tune 520BT Headphones", price: 16900, oldPrice: 18900, rating: 4.6, badge: "Sale", img: IMG("1590658268037-6bf12165a8df"), specs: ["57 hours playtime", "JBL Pure Bass", "Speed charge", "Lightweight"] },
  { id: "a04", cat: "audio", brand: "JBL", name: "Wave Buds True Wireless", price: 12500, rating: 4.5, img: IMG("1606220588913-b3aacb4d2f46"), specs: ["32 hours with case", "Deep Bass sound", "IP54 splash proof", "Smart Ambient"] },
  { id: "a05", cat: "audio", brand: "Xiaomi", name: "Redmi Buds 5", price: 8900, rating: 4.4, img: IMG("1578319439584-104c94d37305"), specs: ["46dB noise cancellation", "40 hours with case", "Dual-device connection", "Fast charge"] },

  // Watches
  { id: "w01", cat: "watches", brand: "Apple", name: "Apple Watch SE (2nd Gen) 44mm", price: 79900, rating: 4.8, img: IMG("1546868871-7041f2a55e12"), specs: ["Retina display", "Crash & fall detection", "Heart rate alerts", "Water resistant 50m"] },
  { id: "w02", cat: "watches", brand: "Amazfit", name: "Bip 5 Smart Watch", price: 24900, rating: 4.5, badge: "New", featured: true, img: IMG("1579586337278-3befd40fd17a"), specs: ["1.91\" large display", "Bluetooth calls", "10 day battery", "GPS built in"] },
  { id: "w03", cat: "watches", brand: "Xiaomi", name: "Redmi Watch 4", price: 27900, rating: 4.6, img: IMG("1624096104992-9b4fa3a279dd"), specs: ["1.97\" AMOLED", "20 day battery", "Bluetooth calls", "150+ sport modes"] },
  { id: "w04", cat: "watches", brand: "Generic", name: "G208 Smart Watch", price: 5900, rating: 4.1, badge: "Budget Pick", img: IMG("1551816230-ef5deaed4a26"), specs: ["Heart rate monitor", "Call & message alerts", "Step tracker", "7 day battery"] },

  // Power banks
  { id: "b01", cat: "power", brand: "Anker", name: "PowerCore 20000mAh", price: 11500, rating: 4.8, badge: "Best Seller", img: IMG("1566554738544-d962991c3fee"), specs: ["20000mAh capacity", "Dual USB output", "PowerIQ fast charging", "Charges a phone 4-5 times"] },
  { id: "b02", cat: "power", brand: "Baseus", name: "Bipow 10000mAh 22.5W", price: 6900, rating: 4.5, img: IMG("1760708825913-65a50b3dc39b"), specs: ["10000mAh capacity", "22.5W fast charge", "USB-C in/out", "Digital display"] },

  // Chargers & cables
  { id: "c01", cat: "chargers", brand: "Apple", name: "20W USB-C Power Adapter", price: 7500, rating: 4.8, badge: "Original", img: IMG("1583863788434-e58a36330cf0"), specs: ["20W fast charging", "USB-C port", "For iPhone & iPad", "Original Apple product"] },
  { id: "c02", cat: "chargers", brand: "Samsung", name: "25W Super Fast Charger", price: 4900, rating: 4.7, img: IMG("1770417999831-1c070eb628e6"), specs: ["25W Super Fast Charging", "USB-C port", "Compact design", "Galaxy compatible"] },
  { id: "c03", cat: "chargers", brand: "Baseus", name: "USB-C to USB-C Cable 1m", price: 1200, rating: 4.4, img: IMG("1603539444875-76e7684265f6"), specs: ["60W power delivery", "Braided nylon", "1 metre length", "Data sync"] },

  // Covers
  { id: "v01", cat: "covers", brand: "Be Mobile", name: "Silicone Case (All iPhone Models)", price: 1500, rating: 4.5, img: IMG("1535157412991-2ef801c1748b"), specs: ["Soft-touch silicone", "Microfibre lining", "Many colours", "All iPhone models"] },
  { id: "v02", cat: "covers", brand: "Be Mobile", name: "Leather Flip Cover", price: 2200, rating: 4.3, img: IMG("1594843665794-446ce915d840"), specs: ["PU leather", "Card slots", "Magnetic closure", "Most Samsung & Redmi models"] },
];
