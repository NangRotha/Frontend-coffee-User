import React from 'react';
import { getImageUrl } from '../services/api';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-coffee-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-br from-coffee-200 to-coffee-300 rounded-lg flex items-center justify-center flex-shrink-0">
          {item.image_url ? (
            <img 
              src={getImageUrl(item.image_url)} 
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div className={`text-3xl ${item.image_url ? 'hidden' : ''}`}>☕</div>
        </div>
        
        <div className="flex-grow">
          <h4 className="font-semibold text-coffee-800 text-lg">{item.name}</h4>
          <p className="text-coffee-600 text-sm mb-2">
            {item.description || 'Premium coffee selection'}
          </p>
          <p className="text-coffee-700 font-medium">${item.price}</p>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecreaseQuantity}
              className="w-8 h-8 rounded-full bg-coffee-200 hover:bg-coffee-300 text-coffee-800 flex items-center justify-center transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-12 text-center font-medium text-coffee-800">
              {item.quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="w-8 h-8 rounded-full bg-coffee-200 hover:bg-coffee-300 text-coffee-800 flex items-center justify-center transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-semibold text-coffee-800 text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800 text-sm transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
