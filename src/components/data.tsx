import serums from "../assets/serums.jpg";
import lotions from "../assets/lotions.jpg";
import shampoos from "../assets/shampoos.jpg";
import soaps from "../assets/soaps.jpeg";
import creams from "../assets/creams.jpg";

export const productsData = {
  Serums: [
    {
      productId: 1,
      category: "Serums",
      image:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dml0YW1pbiUyMGMlMjBzZXJ1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Vitamin C serum (orange-toned bottle)
      name: "Glow Boost Vitamin C Serum",
      rating: "A",
      description:
        "Brightening serum with 20% vitamin C, hyaluronic acid, and ferulic acid for radiant skin.",
      rating_explanation:
        "Highly effective for brightening and reducing dark spots with minimal irritation.",
      category_notes:
        "Serums are concentrated treatments targeting specific concerns like aging, hydration, or pigmentation.",
    },
    {
      productId: 2,
      category: "Serums",
      image:
        "https://images.pexels.com/photos/4202924/pexels-photo-4202924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Hyaluronic serum (clear bottle with dropper)
      name: "Hyaluronic Hydration Serum",
      rating: "A",
      description:
        "Ultra-lightweight serum with 3 molecular weights of hyaluronic acid for deep hydration.",
      rating_explanation:
        "Instant plumping effect with long-lasting moisture retention.",
      category_notes:
        "Hydration serums often contain humectants like hyaluronic acid or glycerin.",
    },
    {
      productId: 3,
      category: "Serums",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV0aW5vbCUyMHNlcnVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60", // Retinol serum (dark bottle)
      name: "Retinol Renewal Night Serum",
      rating: "B",
      description:
        "Encapsulated retinol serum (0.5%) with soothing niacinamide for anti-aging benefits.",
      rating_explanation:
        "Effective but may cause mild peeling during adjustment period.",
      category_notes:
        "Retinol serums should be introduced gradually to avoid irritation.",
    },
    {
      productId: 4,
      category: "Serums",
      image:
        "https://images.unsplash.com/photo-1746676697445-d1de866cb3f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNlcnVtfGVufDB8MHwwfHx8MA%3D%3D",
      name: "Green Tea Antioxidant Serum",
      rating: "B",
      description:
        "Antioxidant-rich serum with green tea extract, vitamin E, and panthenol for stressed skin.",
      rating_explanation:
        "Great for calming redness but lighter texture may not suit very dry skin.",
      category_notes:
        "Antioxidant serums help protect against environmental damage.",
    },
    {
      productId: 5,
      category: "Serums",
      image:
        "https://images.unsplash.com/photo-1671492247311-df094daedc5d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Pore Refining Niacinamide Serum",
      rating: "A",
      description:
        "10% niacinamide serum with zinc PCA to regulate sebum and minimize pores.",
      rating_explanation:
        "Shows visible results in pore appearance within 4 weeks.",
      category_notes:
        "Niacinamide serums often target oil control and barrier repair.",
    },
    {
      productId: 0,
      category: "Serums",
      image:
        "https://images.unsplash.com/photo-1619167316217-c1c8f8ac1dff?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "CBD Calming Serum",
      rating: "C",
      description:
        "Full-spectrum CBD serum with chamomile and oat extract for sensitive skin.",
      rating_explanation:
        "Soothing but limited evidence for CBD's topical benefits at this concentration.",
      category_notes:
        "Specialty serums may contain novel ingredients with varying research support.",
    },
  ],
  Lotions: [
    {
      productId: 1,
      category: "Lotions",
      image:
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg", // Lightweight facial lotion
      name: "Daily Moisture Light Lotion",
      rating: "B",
      description:
        "Oil-free moisturizing lotion with squalane and ceramides for normal to oily skin.",
      rating_explanation:
        "Reliable basic moisturizer but lacks advanced ingredients.",
      category_notes:
        "Lotions are lighter than creams, ideal for daytime or warmer climates.",
    },
    {
      productId: 2,
      category: "Lotions",
      image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137", // Rich shea butter lotion
      name: "Shea Butter Body Lotion",
      rating: "A",
      description:
        "Rich emollient lotion with 10% shea butter and coconut oil for dry skin.",
      rating_explanation:
        "Highly effective for very dry skin without greasy residue.",
      category_notes:
        "Body lotions focus on larger surface area coverage with simpler formulations.",
    },
    {
      productId: 3,
      category: "Lotions",
      image:
        "https://images.pexels.com/photos/4202924/pexels-photo-4202924.jpeg", // SPF lotion with dropper
      name: "SPF 30 Facial Lotion",
      rating: "B",
      description:
        "Mineral sunscreen lotion with zinc oxide and antioxidant blend.",
      rating_explanation: "Good UV protection but can leave slight white cast.",
      category_notes:
        "Sunscreen lotions combine moisturization with UV protection.",
    },
    {
      productId: 4,
      category: "Lotions",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b", // Aloe vera after-sun lotion
      name: "After Sun Cooling Lotion",
      rating: "A",
      description:
        "Aloe vera and menthol infused lotion for post-sun exposure relief.",
      rating_explanation:
        "Immediate cooling sensation with effective hydration.",
      category_notes:
        "Specialty lotions address specific temporary skin conditions.",
    },
    {
      productId: 0,
      category: "Lotions",
      image:
        "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg", // Minimalist fragrance-free lotion
      name: "Fragrance-Free Sensitive Skin Lotion",
      rating: "A",
      description:
        "Hypoallergenic lotion with colloidal oatmeal and allantoin.",
      rating_explanation:
        "Clinically tested for eczema-prone skin with excellent tolerance.",
      category_notes:
        "Sensitive skin lotions avoid common irritants like fragrance or dyes.",
    },
  ],
  Shampoos: [
    {
      productId: 1,
      category: "Shampoos",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883", // Volumizing shampoo bottle
      name: "Volume Boost Shampoo",
      rating: "B",
      description:
        "Sulfate-free shampoo with biotin and rice proteins for fine hair.",
      rating_explanation:
        "Provides good lift but may require clarifying wash occasionally.",
      category_notes:
        "Volumizing shampoos often contain proteins to thicken hair strands.",
    },
    {
      productId: 2,
      category: "Shampoos",
      image:
        "https://images.unsplash.com/photo-1686121544103-f1bc403bd6da?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hydrating shampoo with oils
      name: "Moisture Repair Shampoo",
      rating: "A",
      description:
        "Creamy shampoo with shea butter and argan oil for dry, damaged hair.",
      rating_explanation: "Effectively moisturizes without weighing hair down.",
      category_notes:
        "Hydrating shampoos typically contain oils and humectants.",
    },
    {
      productId: 3,
      category: "Shampoos",
      image:
        "https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg", // Medicated shampoo for scalp
      name: "Scalp Balance Shampoo",
      rating: "A",
      description:
        "Medicated shampoo with 1% pyrithione zinc for dandruff control.",
      rating_explanation: "Clinically proven to reduce flaking and itching.",
      category_notes:
        "Anti-dandruff shampoos contain active ingredients to treat scalp conditions.",
    },
    {
      productId: 4,
      category: "Shampoos",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1", // Charcoal detox shampoo
      name: "Purifying Charcoal Shampoo",
      rating: "B",
      description:
        "Detox shampoo with activated charcoal and tea tree oil for buildup removal.",
      rating_explanation:
        "Effective cleanser but may be drying for some hair types.",
      category_notes:
        "Clarifying shampoos deeply cleanse but shouldn't be used daily.",
    },
    {
      productId: 5,
      category: "Shampoos",
      image:
        "https://images.unsplash.com/photo-1669281392832-9181a2b484af?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Color-protect shampoo
      name: "Color Protect Shampoo",
      rating: "B",
      description:
        "Sulfate-free formula with UV filters to maintain hair color vibrancy.",
      rating_explanation:
        "Gentle cleansing but color protection benefits are subtle.",
      category_notes:
        "Color-safe shampoos avoid harsh detergents that strip dye.",
    },
    {
      productId: 0,
      category: "Shampoos",
      image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e", // Baby shampoo (gentle formula)
      name: "Baby Gentle Wash Shampoo",
      rating: "A",
      description: "Tear-free formula with chamomile and provitamin B5.",
      rating_explanation: "Extremely mild with pleasant natural fragrance.",
      category_notes:
        "Baby shampoos have extra mild formulations for delicate scalps.",
    },
  ],
  Soaps: [
    {
      productId: 1,
      category: "Soaps",
      image:
        "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29hcHN8ZW58MHwwfDB8fHww", // Castile soap bar
      name: "Olive Oil Castile Soap",
      rating: "A",
      description:
        "Plant-based soap made with saponified olive oil, gentle for sensitive skin.",
      rating_explanation: "Non-drying formula suitable for face and body.",
      category_notes:
        "Castile soaps are vegetable oil-based rather than animal fat-based.",
    },
    {
      productId: 2,
      category: "Soaps",
      image:
        "https://plus.unsplash.com/premium_photo-1684471006681-969fce3ae6a0?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Antibacterial soap
      name: "Antibacterial Bar Soap",
      rating: "C",
      description: "Deodorizing soap with 1% triclosan for germ protection.",
      rating_explanation:
        "Effective but may disrupt skin microbiome with prolonged use.",
      category_notes:
        "Antibacterial soaps are controversial for routine home use.",
    },
    {
      productId: 3,
      category: "Soaps",
      image:
        "https://images.unsplash.com/photo-1603533627544-4b256401b1ee?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Charcoal soap bar
      name: "Exfoliating Charcoal Soap",
      rating: "B",
      description:
        "Activated charcoal soap with ground walnut shells for physical exfoliation.",
      rating_explanation:
        "Good for oily skin but abrasive for sensitive types.",
      category_notes:
        "Exfoliating soaps may contain physical or chemical exfoliants.",
    },
    {
      productId: 4,
      category: "Soaps",
      image:
        "https://plus.unsplash.com/premium_photo-1664544673656-b7c0be49c533?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Goat milk soap
      name: "Goat Milk Moisturizing Soap",
      rating: "A",
      description:
        "Handcrafted soap with goat milk, honey, and oatmeal for dry skin.",
      rating_explanation:
        "Exceptionally creamy lather that doesn't strip skin.",
      category_notes:
        "Milk soaps contain natural fats that boost moisturization.",
    },
    {
      productId: 5,
      category: "Soaps",
      image:
        "https://images.unsplash.com/photo-1652607779025-55e89f9fcfe0?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Glycerin transparent soap
      name: "Transparent Glycerin Soap",
      rating: "B",
      description:
        "Clear soap with vegetable glycerin and essential oil blends.",
      rating_explanation: "Gentle cleanser but may leave slight residue.",
      category_notes:
        "Glycerin soaps attract moisture to the skin during cleansing.",
    },
    {
      productId: 0,
      category: "Soaps",
      image:
        "https://images.unsplash.com/photo-1676897367862-5388eba07de9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Ayurvedic neem soap
      name: "Neem & Turmeric Ayurvedic Soap",
      rating: "B",
      description:
        "Traditional formula with antibacterial neem and brightening turmeric.",
      rating_explanation:
        "Distinct medicinal aroma but beneficial for problem skin.",
      category_notes:
        "Ayurvedic soaps incorporate traditional Indian medicinal herbs.",
    },
  ],
  Creams: [
    {
      productId: 1,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1629732097571-b042b35aa3ed?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Night cream jar
      name: "Intensive Repair Night Cream",
      rating: "A",
      description:
        "Rich cream with peptides, ceramides, and 5% urea for overnight recovery.",
      rating_explanation:
        "Significantly improves skin texture and hydration by morning.",
      category_notes:
        "Night creams are typically richer than day creams with reparative ingredients.",
    },
    {
      productId: 2,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1630398776959-6ff31b49df55?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // BB cream tube
      name: "BB Cream with SPF 40",
      rating: "B",
      description:
        "Tinted moisturizing cream with mineral sunscreen and light coverage.",
      rating_explanation: "Convenient 3-in-1 product but limited shade range.",
      category_notes:
        "BB creams combine skincare, sun protection, and light makeup.",
    },
    {
      productId: 3,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1629732047847-50219e9c5aef?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Arnica muscle cream
      name: "Arnica Relief Cream",
      rating: "B",
      description:
        "Muscle soothing cream with arnica montana and menthol for soreness.",
      rating_explanation:
        "Provides temporary relief but effects are short-lived.",
      category_notes: "Medicated creams target specific physical discomforts.",
    },
    {
      productId: 4,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1583334758673-713113e70d1c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Anti-aging collagen cream
      name: "Collagen Boosting Face Cream",
      rating: "C",
      description:
        "Anti-aging cream with retinol alternative and vitamin C derivatives.",
      rating_explanation:
        "Pleasant texture but collagen stimulation claims are unverified.",
      category_notes:
        "Many anti-aging creams make structural protein claims that are difficult to substantiate.",
    },
    {
      productId: 5,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Eczema therapy cream
      name: "Eczema Therapy Cream",
      rating: "A",
      description:
        "Steroid-free cream with colloidal oatmeal and ceramide complex.",
      rating_explanation: "Clinically shown to reduce itching and flare-ups.",
      category_notes:
        "Therapeutic creams for skin conditions often undergo medical testing.",
    },
    {
      productId: 6,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1693004926638-d2e47d705229?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Brightening cream
      name: "Whitening Brightening Cream",
      rating: "B",
      description:
        "Dark spot corrector with niacinamide, licorice root, and alpha-arbutin.",
      rating_explanation:
        "Gradual brightening effect over 8-12 weeks of consistent use.",
      category_notes:
        "Skin brightening creams inhibit melanin production through various mechanisms.",
    },
    {
      productId: 0,
      category: "Creams",
      image:
        "https://images.unsplash.com/photo-1646562010957-485ba89c5fc0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Cold cream jar
      name: "Cold Cream Cleanser",
      rating: "A",
      description: "Traditional emulsion of oils and waxes for makeup removal.",
      rating_explanation: "Exceptionally thorough yet gentle cleansing method.",
      category_notes:
        "Cold creams follow ancient formulations still effective today.",
    },
  ],
};

export const categories = [
  {
    name: "Serums",
    icon: serums,
  },
  {
    name: "Lotions",
    icon: lotions,
  },
  {
    name: "Shampoos",
    icon: shampoos,
  },
  {
    name: "Soaps",
    icon: soaps,
  },
  {
    name: "Creams",
    icon: creams,
  },
];
