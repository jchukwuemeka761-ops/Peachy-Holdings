import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Minus, Plus, ShoppingBag, Trash2, Watch, X } from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    discountCode,
    discountPercentage,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
  } = useEnterprise();

  const [promoInput, setPromoInput] = useState('');

  if (!cartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) applyPromoCode(promoInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setCartDrawerOpen(false)}
      />

      <aside className="relative z-10 max-w-md w-full bg-[#111111] border-l border-[#C8A45D]/30 shadow-2xl flex flex-col justify-between text-[#F7F4ED]">
        <div className="p-6 border-b border-[#C8A45D]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#C8A45D]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Shopping Bag</h3>
              <p className="text-xs text-[#F7F4ED]/60 tabular-nums">{cartCount} wristwatch acquisition(s)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close bag"
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#F7F4ED]/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Watch className="w-12 h-12 text-[#C8A45D]/40 mx-auto" />
              <div className="font-serif text-lg">Your bag is currently empty.</div>
              <p className="text-xs text-[#F7F4ED]/60 max-w-xs mx-auto">
                Browse unique wristwatches across Richard Mille, Rolex, Audemars Piguet, Alexander McQueen, G-Shock, and Casio.
              </p>
              <Link
                to="/luxury-watches"
                onClick={() => setCartDrawerOpen(false)}
                className="inline-block px-6 py-2.5 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase tracking-wider hover:bg-[#DFBF7A] transition-colors"
              >
                Explore Watches
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.watch.id}
                className="p-4 rounded-xl bg-[#181818] border border-[#C8A45D]/15 flex gap-4"
              >
                <img
                  src={item.watch.image}
                  alt={item.watch.model}
                  className="w-20 h-20 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#C8A45D] font-bold">
                      {item.watch.brand}
                    </div>
                    <h4 className="text-sm font-semibold truncate text-[#F7F4ED]">{item.watch.model}</h4>
                    <div className="text-[11px] text-[#F7F4ED]/50 truncate">Ref: {item.watch.referenceNumber}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold tabular-nums font-mono text-[#C8A45D]">
                      ₦{(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-white/10 rounded bg-[#0e0e0e]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.watch.id, item.quantity - 1)}
                          className="p-1 hover:bg-white/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.watch.id, item.quantity + 1)}
                          className="p-1 hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.watch.id)}
                        className="text-[#F7F4ED]/40 hover:text-red-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#C8A45D]/20 bg-[#0e0e0e] space-y-4">
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code: EXCELLENCE10"
                className="flex-1 px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D]/10 text-xs font-semibold"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#F7F4ED]/70">
                <span>Subtotal</span>
                <span className="tabular-nums font-mono">₦{cartSubtotal.toLocaleString()}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Privilege Discount ({discountCode})</span>
                  <span className="tabular-nums font-mono">-₦{cartDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#F7F4ED]/70">
                <span>Armored Vault Delivery</span>
                <span className="text-[#C8A45D]">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold">
                <span>Total (NGN)</span>
                <span className="tabular-nums font-mono text-[#C8A45D]">₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-widest transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Naira Checkout</span>
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="w-full py-1.5 text-[11px] text-[#F7F4ED]/45 hover:text-red-400"
              >
                Clear Shopping Bag
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
