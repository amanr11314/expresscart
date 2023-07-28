exports.getCart = async (req, res) => {
    const cart = await req?.user?.getCart();
    try {
        const cartProducts = await cart?.getProducts();

        let totaAmount = 0;
        if (cartProducts) {
            cartProducts.forEach((product) => {
                console.log(JSON.stringify(product));
                totaAmount += +product?.CartItem?.quantity * +product.price;
            });
        }

        const resp = {
            cartProducts: cartProducts || [],
            totaAmount,
        };

        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500,
        });
    }
};

exports.addToCart = async (req, res) => {
    const productId = req.body?.productId;
    const count = req.body?.count || 1;
    const type = req.body?.type || "increment";

    let newQuantity;

    try {
        let cart = await req?.user?.getCart();

        if (!cart) {
            // creates record in Carts table with userId as req?.user?.userId
            cart = await req?.user.createCart();
        }

        let fetchedCart = cart;

        const cartProducts = await fetchedCart?.getProducts({
            where: { id: productId },
        });

        // product already in cart
        if (cartProducts.length) {
            const cartItem = cartProducts[0]?.CartItem;
            if (type === "increment") {
                newQuantity = cartItem?.quantity + (parseInt(count) || 1);
            } else {
                newQuantity = cartItem?.quantity - (parseInt(count) || 1);
                newQuantity = Math.max(newQuantity, 0);
            }

            // update new quantity of existing product
            cartItem.update({ quantity: newQuantity }).then((data) => {
                const resp = {
                    data,
                    msg: "Item quantiy updated to " + newQuantity,
                };

                res.status(200).json(resp);
            });
        } else {
            // add product in cart
            newQuantity = parseInt(count) || 1;
            newQuantity = Math.max(newQuantity, 1);

            fetchedCart
                .addProduct(productId, {
                    through: {
                        quantity: newQuantity,
                    },
                })
                .then((data) => {
                    const resp = {
                        data,
                        msg: "Item added to cart",
                    };

                    res.status(200).json(resp);
                });
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500,
        });
    }
};

exports.addBulkToCart = async (req, res) => {
    const productIds = req.body?.productIds || [];
    console.log("productsids = ", productIds);

    try {

        let cart = await req?.user?.getCart();
        let cartProducts = [];

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
        });

        // console.log('remove products= ', fetchedCart.removeProducts);

        if (productsToAdd.length > 0) {
            const resp = await fetchedCart.addProducts(productsToAdd, {
                through: { quantity: 1 },
            });

            const updatedCartProducts = await cart?.getProducts();

            res.status(200).json({
                status: "Added " + productsToAdd.length + " items to cart",
                count: productsToAdd.length,
                updatedCartProducts,
            });
        } else {
            res.status(200).json({
                status: "Items already in cart",
                count: 0,
                updatedCartProducts: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }
};

exports.deleteCartItem = async (req, res) => {
    const productId = req.body?.productId;
    try {
        const fetchedCart = await req?.user?.getCart();
        const cartProducts = await fetchedCart?.getProducts({
            where: { id: productId },
        });
        if (cartProducts.length) {
            const data = await fetchedCart?.removeProduct(productId);

            const resp = {
                data,
                msg: data + "Iten removed from cart",
            };

            res.status(200).json(resp);
        } else {
            res.status(404).json({
                message: "Product not found in cart",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }
};
