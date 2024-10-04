exports.getCart = (req, res) => {
    const cart = req.session.cart || { items: [], totalQty: 0, totalPrice: 0 };
    res.render('cart', { cart: cart });
  };
  
  exports.addToCart = (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
  
    let cart = req.session.cart || { items: [], totalQty: 0, totalPrice: 0 };
  
    Product.findById(productId)
      .then(([products]) => {
        if (products.length === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
  
        const product = products[0];
        const cartItem = cart.items.find(item => item.id === productId);
  
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          cart.items.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
          });
        }
  
        cart.totalQty += quantity;
        cart.totalPrice += product.price * quantity;
  
        req.session.cart = cart;
        res.redirect('/cart');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to add product to cart' });
      });
  };
  
  exports.updateCartItem = (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
  
    let cart = req.session.cart;
  
    if (!cart) {
      return res.status(400).json({ error: 'Cart not found' });
    }
  
    const cartItem = cart.items.find(item => item.id === productId);
  
    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
  
    cart.totalQty += quantity - cartItem.quantity;
    cart.totalPrice += cartItem.price * (quantity - cartItem.quantity);
    cartItem.quantity = quantity;
  
    req.session.cart = cart;
    res.redirect('/cart');
  };
  
  exports.removeFromCart = (req, res) => {
    const productId = req.body.productId;
  
    let cart = req.session.cart;
  
    if (!cart) {
      return res.status(400).json({ error: 'Cart not found' });
    }
  
    const itemIndex = cart.items.findIndex(item => item.id === productId);
  
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
  
    const item = cart.items[itemIndex];
    cart.totalQty -= item.quantity;
    cart.totalPrice -= item.price * item.quantity;
    cart.items.splice(itemIndex, 1);
  
    req.session.cart = cart;
    res.redirect('/cart');
  };