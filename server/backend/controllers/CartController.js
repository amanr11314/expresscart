exports.getCart = async (req, res) => {
    const cart = await req?.user?.getCart();
    const cartProducts = await cart?.getProducts();

    let totaAmount = 0;
    if (cartProducts) {
        cartProducts.forEach((product) => {
            console.log(JSON.stringify(product))
            totaAmount += +product?.CartItem?.quantity * +product.price
        })
    }

    const resp = {
        cartProducts: cartProducts || [],
        totaAmount
    }

    res.send(resp)
}

exports.addToCart = async (req, res) => {

    const productId = req.body?.productId
    const count = req.body?.count || 1;
    const type = req.body?.type || 'increment';

    let newQuantity;


    let cart = await req?.user?.getCart();

    if (!cart) {
        // creates record in Carts table with userId as req?.user?.userId
        cart = await req?.user.createCart();
    }

    let fetchedCart = cart;

    const cartProducts = await fetchedCart?.getProducts({
        where: { id: productId }
    });


    // product already in cart
    if (cartProducts.length) {
        const cartItem = cartProducts[0]?.CartItem;
        if (type === 'increment') {
            newQuantity = cartItem?.quantity + (parseInt(count) || 1);
        } else {
            newQuantity = (cartItem?.quantity - (parseInt(count) || 1))
            newQuantity = Math.max(newQuantity, 0);
        }

        // update new quantity of existing product
        cartItem
            .update({ quantity: newQuantity })
            .then((data) => {
                const resp = {
                    data,
                    msg: 'Item quantiy updated to ' + newQuantity
                }

                res.send(resp)
            })
    } else {
        // add product in cart
        newQuantity = (parseInt(count) || 1);
        newQuantity = Math.max(newQuantity, 1);

        fetchedCart
            .addProduct(productId, {
                through: {
                    quantity: newQuantity
                }
            })
            .then((data) => {
                const resp = {
                    data,
                    msg: 'Item added to cart'
                }

                res.send(resp)
            })
    }
}

exports.deleteCartItem = async (req, res) => {
    const productId = req.body?.productId;
    const fetchedCart = await req?.user?.getCart();
    const cartProducts = await fetchedCart?.getProducts({
        where: { id: productId }
    });
    if (cartProducts.length) {
        const data = await fetchedCart?.removeProduct(productId)

        const resp = {
            data,
            msg: data + 'Iten removed from cart'
        }

        res.send(resp)
    } else {
        res.send({
            msg: 'Product not found in cart'
        })
    }

}