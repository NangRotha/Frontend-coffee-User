import React, { useState } from 'react';

const TestCart = () => {
  const [items] = useState([
    { id: 1, name: 'Test Coffee', price: 5.00, quantity: 2 }
  ]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Cart Test</h1>
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl mb-4">Cart Items: {items.length}</h2>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="border p-3 rounded">
              <h3 className="font-semibold">{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default TestCart;
