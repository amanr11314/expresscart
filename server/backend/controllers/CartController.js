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

exports.addBulkToCart = async (req, res) => {

    const productIds = req.body?.productIds || []
    console.log('productsids = ', productIds);

    let cart = await req?.user?.getCart();
    let cartProducts = []

    if (!cart) {
        // creates record in Carts table with userId as req?.user?.userId
        cart = await req?.user.createCart();
    } else {
        cartProducts = await cart?.getProducts();
    }

    let fetchedCart = cart;

    // filter productIds whose product does not exist in cartProducts
    const productsToAdd = productIds.filter((productId) => {
        // Check if the productId is not present in any of the cartProducts' ids
        return !cartProducts.some((cartProduct) => cartProduct.id === productId);
    })

    // console.log('remove products= ', fetchedCart.removeProducts);

    if (productsToAdd.length > 0) {

        const resp = await fetchedCart.addProducts(productsToAdd, {
            through: { quantity: 1 }
        })

        const updatedCartProducts = await cart?.getProducts();

        res.send({
            status: 'Added ' + productsToAdd.length + ' items to cart',
            count: productsToAdd.length,
            updatedCartProducts
        })
    } else {
        res.send({
            status: 'Items already in cart'
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