import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // ===== Plant Categories and Products =====
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          id: 1,
          name: "Snake Plant",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_plant_Dracaena_trifasciata.jpg/440px-Snake_plant_Dracaena_trifasciata.jpg",
          description: "A hardy plant that purifies the air and thrives in low light conditions.",
          cost: "$15",
        },
        {
          id: 2,
          name: "Spider Plant",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Chlorophytum_comosum_-_Spider_Plant.jpg/440px-Chlorophytum_comosum_-_Spider_Plant.jpg",
          description: "An easy-to-care-for plant known for removing toxins from the air.",
          cost: "$12",
        },
        {
          id: 3,
          name: "Peace Lily",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/440px-Spathiphyllum_cochlearispathum_RTBG.jpg",
          description: "Elegant white flowers with powerful air-purifying properties.",
          cost: "$18",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          id: 4,
          name: "Lavender",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bee_landing_on_lavender.jpg/440px-Bee_landing_on_lavender.jpg",
          description: "Famous for its calming fragrance, perfect for bedrooms and relaxation.",
          cost: "$20",
        },
        {
          id: 5,
          name: "Jasmine",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/White_Jasmine_Flowers.jpg/440px-White_Jasmine_Flowers.jpg",
          description: "Sweet-scented flowers that brighten up any indoor or outdoor space.",
          cost: "$22",
        },
        {
          id: 6,
          name: "Rosemary",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rosemary_bush.jpg/440px-Rosemary_bush.jpg",
          description: "A fragrant herb great for cooking and adding a pleasant scent indoors.",
          cost: "$10",
        },
      ],
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        {
          id: 7,
          name: "Citronella",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Citronella_plant.jpg/440px-Citronella_plant.jpg",
          description: "Naturally repels mosquitoes while adding a fresh citrus scent.",
          cost: "$16",
        },
        {
          id: 8,
          name: "Basil",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Basil-Basilico-Ocimum_basilicum-albahaca.jpg/440px-Basil-Basilico-Ocimum_basilicum-albahaca.jpg",
          description: "A versatile herb that repels flies and mosquitoes naturally.",
          cost: "$8",
        },
        {
          id: 9,
          name: "Mint",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spearmint_Mentha_spicata_Flowers.jpg/440px-Spearmint_Mentha_spicata_Flowers.jpg",
          description: "Refreshing plant that deters insects and is great for teas.",
          cost: "$7",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          id: 10,
          name: "Aloe Vera",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/440px-Aloe_vera_flower_inset.png",
          description: "A powerful medicinal plant used for skin care and healing burns.",
          cost: "$14",
        },
        {
          id: 11,
          name: "Echinacea",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Echinacea_purpurea.jpg/440px-Echinacea_purpurea.jpg",
          description: "Boosts immunity and is widely used in herbal medicine.",
          cost: "$19",
        },
        {
          id: 12,
          name: "Peppermint",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Minze.jpg/440px-Minze.jpg",
          description: "Soothes headaches, aids digestion, and smells amazing.",
          cost: "$11",
        },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          id: 13,
          name: "ZZ Plant",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ZZ_plant.jpg/440px-ZZ_plant.jpg",
          description: "Nearly indestructible, thrives in low light with minimal watering.",
          cost: "$25",
        },
        {
          id: 14,
          name: "Pothos",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Epipremnum_aureum_31082012.jpg/440px-Epipremnum_aureum_31082012.jpg",
          description: "Fast-growing trailing plant perfect for shelves and hanging baskets.",
          cost: "$10",
        },
        {
          id: 15,
          name: "Cactus",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cactus_family.jpg/440px-Cactus_family.jpg",
          description: "Requires minimal care and water, ideal for busy plant lovers.",
          cost: "$9",
        },
      ],
    },
  ];

  // ===== Calculate Total Cart Quantity =====
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  // ===== Handle Add to Cart =====
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.id]: true }));
  };

  // ===== Handle Continue Shopping =====
  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <h2>🌿 Paradise Nursery</h2>
        <div className="navbar-right">
          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart
            {totalCartQuantity > 0 && (
              <span className="cart-count">{totalCartQuantity}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ===== Cart Page ===== */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-list-container">
          <h1 className="product-list-title">🌱 Our Plant Collection</h1>
          <p className="product-list-subtitle">
            Browse our wide variety of plants and bring nature into your home!
          </p>

          {/* ===== Plant Categories ===== */}
          {plantsArray.map((category) => (
            <div key={category.category} className="category-section">
              <h2 className="category-title">{category.category}</h2>

              <div className="plants-grid">
                {category.plants.map((plant) => (
                  <div key={plant.id} className="plant-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-image"
                    />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${
                        addedToCart[plant.id] ? 'added' : ''
                      }`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.id]}
                    >
                      {addedToCart[plant.id] ? '✅ Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
