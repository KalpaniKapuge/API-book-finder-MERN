
export async function createOrder(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "Please login and try again"
        })
        return
    }

    const orderInfo = req.body

    if(orderInfo == null){
        orderInfo.name = req.user.firstName + " " + req.user.lastName
    }

    //CBC00001
    let orderId = "CBC00001"

    const lastOrderId = await Order.find().sort({date : -1}).limit(1)

    if(lastOrderId.length > 0){
        const lastOrderId = lastOrderId[0].orderId

        const lastOrderNumberString = lastOrderId.replace("CBC"," ")
        const lastOrderNumber = parseInt(lastOrderNumberString)
        const newOrderNumber = lastOrderNumber + 1
        const newOrderNumberString = String(newOrderNumber).padStart(5, '0')
        orderId = "CBC" +newOrderNumberString
    }
    try{
        const order = new Order({
            orderId : orderId,
            email : req.user.email,
            name : orderInfo.name,
            address : orderInfo.address,
            total : 0,
            phone : orderInfo.phone,
            products : products,
            labelledTotal : labelledTotal,
            total : total
        })
        const createOrder = await order.save()
        res.json({
            message : "Order created succesfully",
            order : createOrder
        })
    }catch(err){
        res.status(403).json({
            message : "Failed to create order",
            error : err
        })
    }
}