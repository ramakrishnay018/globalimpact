import React, { useState } from 'react';

const STYLES = `
  :root {
    --bg: #020617;
    --cyan: #06b6d4;
    --fuchsia: #d946ef;
    --success: #10b981;
    --card-bg: rgba(255, 255, 255, 0.03);
    --card-border: rgba(255, 255, 255, 0.1);
  }
  * { box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }
  body { margin: 0; background-color: var(--bg); color: #f8fafc; scroll-behavior: smooth; }
  .app-wrap { min-height: 100vh; display: flex; flex-direction: column; }

  .login-bg { background: radial-gradient(circle at center, #0f172a 0%, #020617 100%); }
  .login-wrapper { display: flex; align-items: center; justify-content: center; flex: 1; padding: 1rem; }
  .glass-box { background: var(--card-bg); backdrop-filter: blur(12px); border: 1px solid var(--card-border); padding: 2.5rem; border-radius: 1.5rem; width: 100%; max-width: 400px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; }
  .icon-large { font-size: 2.5rem; background: rgba(0,0,0,0.5); border: 1px solid var(--card-border); padding: 1rem; border-radius: 50%; display: inline-block; margin-bottom: 1.5rem; }
  .title { color: #ffffff; font-size: 2rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: 1px; }
  
  .text-cyan { color: var(--cyan); }
  .subtitle { color: #94a3b8; margin-bottom: 2rem; font-size: 0.9rem; }
  .input-group { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
  .glass-input { width: 100%; background: rgba(0,0,0,0.4); border: 1px solid var(--card-border); padding: 1rem; border-radius: 0.75rem; color: white; outline: none; transition: 0.3s; font-size: 1rem; }
  .glass-input:focus { border-color: var(--cyan); box-shadow: 0 0 10px rgba(6,182,212,0.3); }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: bold; padding: 0.85rem 1.5rem; border-radius: 0.75rem; cursor: pointer; transition: 0.2s; border: none; font-size: 1rem; }
  .btn-full { width: 100%; }
  .btn-primary { background: var(--cyan); color: #020617; }
  .btn-primary:hover { box-shadow: 0 0 20px rgba(6,182,212,0.5); transform: scale(0.98); }
  .btn-danger { background: #f43f5e; color: white; }
  .btn-danger:hover { box-shadow: 0 0 20px rgba(244,63,94,0.5); transform: scale(0.98); }
  .btn-success { background: var(--success); color: #020617; }
  .btn-success:hover { box-shadow: 0 0 20px rgba(16,185,129,0.5); transform: scale(0.98); }
  .btn-outline { background: transparent; border: 2px solid var(--fuchsia); color: var(--fuchsia); }
  .btn-outline:hover { background: var(--fuchsia); color: white; box-shadow: 0 0 20px rgba(217,70,239,0.5); transform: scale(0.98); }

  .app-header { position: sticky; top: 0; z-index: 40; background: rgba(2,6,23,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--card-border); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
  .header-logo { color: #ffffff; display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 900; margin: 0;}
  .header-actions { display: flex; align-items: center; gap: 1rem; }
  .cart-link { display: flex; align-items: center; gap: 0.5rem; background: rgba(217,70,239,0.1); border: 1px solid rgba(217,70,239,0.3); color: var(--fuchsia); padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; transition: 0.3s; cursor: pointer; }
  .cart-link:hover { background: rgba(217,70,239,0.2); }
  .cart-badge { background: var(--fuchsia); color: white; padding: 0.1rem 0.5rem; border-radius: 1rem; font-size: 0.8rem; }

  .main-container { max-width: 1200px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr; gap: 2rem; width: 100%; }
  @media (min-width: 992px) { .main-container { grid-template-columns: 2fr 1fr; } }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .section-title { font-size: 1.5rem; font-weight: bold; margin: 0; }
  .item-count { color: #94a3b8; font-size: 0.9rem; }

  .grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
  .glass-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 1rem; overflow: hidden; transition: 0.3s; display: flex; flex-direction: column; }
  .item-card:hover { border-color: var(--cyan); box-shadow: 0 0 20px rgba(6,182,212,0.2); }
  .img-container { height: 180px; position: relative; overflow: hidden; background: #000; }
  .item-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; opacity: 0.85; }
  .item-card:hover .item-img { transform: scale(1.1); opacity: 1; }
  .emoji-badge { position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); padding: 0.5rem; border-radius: 0.5rem; border: 1px solid var(--card-border); font-size: 1.25rem; z-index: 10; }
  .card-body { padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1; }
  .item-name { font-size: 1.25rem; font-weight: bold; margin: 0 0 0.5rem 0; }
  .item-desc { color: #94a3b8; font-size: 0.875rem; margin: 0 0 1.5rem 0; flex-grow: 1; line-height: 1.4; }
  .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--card-border); padding-top: 1rem; }
  .item-price { font-size: 1.5rem; font-weight: 900; color: var(--cyan); margin: 0; }

  .sidebar-panel { backdrop-filter: blur(12px); padding: 1.5rem; position: sticky; top: 100px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .cart-empty { text-align: center; padding: 3rem 1rem; border: 2px dashed var(--card-border); border-radius: 1rem; color: #94a3b8; }
  .cart-empty span { display: block; font-size: 3rem; margin-bottom: 1rem; }
  .cart-empty p { margin: 0; }
  .cart-items { max-height: 40vh; overflow-y: auto; padding-right: 0.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .cart-items::-webkit-scrollbar { width: 6px; }
  .cart-items::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
  .cart-item { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 0.75rem; border: 1px solid var(--card-border); }
  .cart-item-left { display: flex; align-items: center; gap: 0.75rem; }
  .cart-item-img { width: 40px; height: 40px; border-radius: 0.5rem; object-fit: cover; }
  .cart-item-name { font-size: 0.9rem; font-weight: bold; margin: 0; }
  .cart-item-price { font-size: 0.8rem; font-weight: bold; color: var(--cyan); margin: 0; }
  .btn-delete { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; transition: 0.2s; padding: 0.25rem; }
  .btn-delete:hover { color: #f43f5e; transform: scale(1.1); }

  .cart-checkout { margin-top: 1.5rem; border-top: 1px solid var(--card-border); padding-top: 1.5rem; }
  .order-type { display: flex; gap: 0.5rem; background: rgba(0,0,0,0.4); padding: 0.25rem; border-radius: 0.75rem; margin-bottom: 1.5rem; border: 1px solid var(--card-border); }
  .type-btn { flex: 1; padding: 0.75rem; border-radius: 0.5rem; border: none; background: transparent; color: #94a3b8; font-weight: bold; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .type-btn.active-cyan { background: var(--cyan); color: #020617; box-shadow: 0 0 10px rgba(6,182,212,0.4); }
  .type-btn.active-fuchsia { background: var(--fuchsia); color: white; box-shadow: 0 0 10px rgba(217,70,239,0.4); }
  .cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .cart-total-label { color: #94a3b8; font-weight: bold; margin: 0; }
  .cart-total-value { font-size: 2rem; font-weight: 900; margin: 0; color: white; }

  .popup-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem; }
  .popup-box { background: #0f172a; border: 1px solid rgba(16,185,129,0.3); border-radius: 1.5rem; padding: 2.5rem; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 0 50px rgba(16,185,129,0.2); animation: popIn 0.4s ease-out; }
  @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  .popup-icon-check { width: 4rem; height: 4rem; background: rgba(16,185,129,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem auto; }
  .popup-title { font-size: 1.5rem; font-weight: 900; margin: 0 0 0.5rem 0; color: white; }
  .popup-msg { color: #94a3b8; margin: 0 0 1.5rem 0; }
  .popup-status { background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--card-border); margin-bottom: 1.5rem; font-weight: bold; font-size: 0.9rem; color: white; }
  .popup-emoji { font-size: 4rem; animation: bounce 1s infinite; margin: 0; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

  @media (max-width: 640px) { 
    .hide-mobile { display: none; } 
    .app-header { padding: 1rem; } 
    .main-container { padding: 1rem; } 
  }
`;

const Button = ({ text, onClick, variant = 'primary', className = '' }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

const CampaignCard = ({ item, onAddPledge }) => {
  const { title, desc, defaultAmount, image } = item;

  return (
    <div className="glass-card item-card">
      <div className="img-container">
        <img src={image} alt={title} className="item-img" />
      </div>
      <div className="card-body">
        <h3 className="item-name">{title}</h3>
        <p className="item-desc">{desc}</p>
        <div className="card-footer">
          <h4 className="item-price">₹{defaultAmount}</h4>
          <Button text="Pledge" onClick={() => onAddPledge(item)} variant="outline" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [basket, setBasket] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [donationType, setDonationType] = useState('one-time');

  const CAMPAIGN_DATA = [
    { id: 1, title: "Cyber-Forest Reforestation", desc: "Planting drone-seeded trees in deforested zones.", defaultAmount: 50, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80" },
    { id: 2, title: "Neon City Food Drive", desc: "Providing futuristic nutrient meals to the homeless.", defaultAmount: 25, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80" },
    { id: 3, title: "Tech For Kids", desc: "Laptops and coding bootcamps for underprivileged youth.", defaultAmount: 100, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80" },
    { id: 4, title: "Clean Ocean Drones", desc: "Funding AI robots that clean plastic from the sea.", defaultAmount: 40, image: "https://images.unsplash.com/photo-1621451537084-482c73073e0f?w=500&q=80" },
    { id: 5, title: "Quantum Medical Research", desc: "Next-gen cures for rare diseases.", defaultAmount: 200, image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&q=80" },
    { id: 6, title: "Solar Grids for All", desc: "Building independent solar panels for remote villages.", defaultAmount: 75, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80" },
    { id: 7, title: "Holo-Education", desc: "VR and AR headsets for immersive classroom learning.", defaultAmount: 150, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80" },
    { id: 8, title: "Stray Animal Sanctuary", desc: "High-tech shelters for rescued street animals.", defaultAmount: 30, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80" },
    { id: 9, title: "Clean Water Filter Hubs", desc: "Installing graphene water filters in dry regions.", defaultAmount: 60, image: "https://images.unsplash.com/photo-1519315901367-f34f11d56d6d?w=500&q=80" },
    { id: 10, title: "Mental Health AI Chatbots", desc: "Free 24/7 therapy access via advanced AI.", defaultAmount: 20, image: "https://images.unsplash.com/photo-1590650046522-796d46051785?w=500&q=80" },
    { id: 11, title: "Urban Vertical Farming", desc: "Building indoor farms to reduce carbon footprints.", defaultAmount: 80, image: "https://images.unsplash.com/photo-1530836369250-ef71a35920ab?w=500&q=80" },
    { id: 12, title: "Space Debris Cleanup", desc: "Funding satellites that capture old space junk.", defaultAmount: 120, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80" },
    { id: 13, title: "Disaster Relief Drones", desc: "Airdropping supplies to natural disaster zones.", defaultAmount: 90, image: "https://images.unsplash.com/photo-1527015848790-252f82ba86df?w=500&q=80" },
    { id: 14, title: "Cybersecurity for NGOs", desc: "Protecting charity databases from cyber attacks.", defaultAmount: 50, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80" },
    { id: 15, title: "Art for the Future", desc: "Funding digital art programs for inner-city teens.", defaultAmount: 35, image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&q=80" }
  ];

  const addPledge = (item) => setBasket([...basket, item]);
  
  const removePledge = (indexToRemove) => {
    setBasket(basket.filter((_, index) => index !== indexToRemove));
  };
  
  const handleCheckout = () => {
    setShowPopup(true);
    setBasket([]);
    setTimeout(() => setShowPopup(false), 3500);
  };

  const totalAmount = basket.reduce((sum, item) => sum + item.defaultAmount, 0);

  if (!isLoggedIn) {
    return (
      <div className="app-wrap login-bg">
        <style>{STYLES}</style>
        <div className="login-wrapper">
          <div className="glass-box">
            <h1 className="title">GLOBAL <span className="text-cyan">IMPACT</span></h1>
            <p className="subtitle">Authenticate to access the donation mainframe.</p>
            <div className="input-group">
              <input type="text" placeholder="Donor ID (Any)" className="glass-input" />
              <input type="password" placeholder="Passcode (Any)" className="glass-input" />
            </div>
            <Button text="Access Portal" onClick={() => setIsLoggedIn(true)} variant="primary" className="btn-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrap">
      <style>{STYLES}</style>
      <header className="app-header">
        <h1 className="header-logo">GLOBAL <span className="text-cyan">IMPACT</span></h1>
        <div className="header-actions">
          <a href="#basket" className="cart-link hide-mobile">
            Pledges <span className="cart-badge">{basket.length}</span>
          </a>
          <Button text="Log Out" onClick={() => setIsLoggedIn(false)} variant="danger" />
        </div>
      </header>

      <main className="main-container">
        <section>
          <div className="section-header">
            <h2 className="section-title">Trending Causes</h2>
            <span className="item-count">{CAMPAIGN_DATA.length} Active Campaigns</span>
          </div>
          
          <div className="grid-layout">
            {CAMPAIGN_DATA.map(item => (
              <CampaignCard key={item.id} item={item} onAddPledge={addPledge} />
            ))}
          </div>
        </section>

        <section id="basket">
          <div className="glass-card sidebar-panel">
            <h2 className="section-title" style={{marginBottom: '1.5rem'}}>Your Impact</h2>
            
            {basket.length === 0 ? (
              <div className="cart-empty">
                <p>No pledges yet. Select a cause to change the world!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {basket.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="cart-item-left">
                        <img src={item.image} alt={item.title} className="cart-item-img" />
                        <div>
                          <p className="cart-item-name">{item.title}</p>
                          <p className="cart-item-price">₹{item.defaultAmount}</p>
                        </div>
                      </div>
                      <button className="btn-delete" onClick={() => removePledge(index)}>✕</button>
                    </div>
                  ))}
                </div>

                <div className="cart-checkout">
                  <div className="order-type">
                    <button 
                      className={`type-btn ${donationType === 'one-time' ? 'active-cyan' : ''}`}
                      onClick={() => setDonationType('one-time')}
                    >
                      One-Time
                    </button>
                    <button 
                      className={`type-btn ${donationType === 'monthly' ? 'active-fuchsia' : ''}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      Monthly
                    </button>
                  </div>

                  <div className="cart-total">
                    <p className="cart-total-label">Total Pledge:</p>
                    <p className="cart-total-value">₹{totalAmount}</p>
                  </div>
                  
                  <Button text="Donate Now" onClick={handleCheckout} variant="success" className="btn-full" />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon-check">✓</div>
            <h2 className="popup-title">Donation Successful!</h2>
            <div className="popup-status">
              {donationType === 'monthly' ? "Subscription Active" : "One-Time Transfer Complete"}
            </div>
            <p className="popup-msg">Thank you! You are making the world a better place.</p>
          </div>
        </div>
      )}
    </div>
  );
}