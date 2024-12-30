import * as React from "react";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange }) => {
    const { id, name, price, quantity, image } = item;
    const subtotal = price * quantity;
  
    return (
      <Card className="mt-4">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="w-1/5">
            {image ? (
              <img
                src={image}
                alt={name}
                className="object-contain w-16 h-16"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
          </div>
  
          <div className="flex items-center gap-8">
            <span className="text-gray-600">${price.toFixed(2)}</span>
            
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                if (newQuantity > 0) {
                  onQuantityChange(id, newQuantity);
                }
              }}
              className="w-20 text-center"
              min="1"
              aria-label={`Quantity for ${name}`}
            />
            
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    );
  };