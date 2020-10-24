let appDB = require("../model/auctionDB")
const knex = require("../connection")


module.exports = (app) => {
    app.post("/postapi", (req, res) => {
        data = {
            auction_name: req.body.auction_name,
            price: req.body.price
        }
        appDB.insert_data(data)
            .then((auction_data) => {
                res.send(auction_data)
            }).catch((err) => {
                console.log(err)
            })
    })
    
    app.get('/getData/:id', (req, res) => {
        let id = req.params.id
        // console.log(id)
        let  bidder_price  = req.body.bidder_price
        // console.log(bidder_price)
        knex('auctioner_data').select('*').where('auction_id', id)
            .then((auction_data) => {
                // console.log("auction_data",auction_data)
                let auctionprice = auction_data[0]['price']
                // console.log(auctionprice)
                if  (auctionprice < bidder_price) {
                    knex('bidder_table').select('*').where('auction_id', id)
                        .then((check_Price) => {  
                            if (!check_Price.length) { 
                                req.body['auction_id'] = id
                                knex('bidder_table').insert(req.body)
                                    .then(() => {
                                        res.send('done.... bid')
                                    })
                            } else {
                                knex('bidder_table').where('auction_id', id).max('bidder_price as price')
                                    .then((max_p) => {
                                        console.log(max_p)
                                        console.log(bidder_price)
                                        if (max_p[0]['price'] < bidder_price) {
                                            req.body['auction_id'] = id
                                            knex('bidder_table').insert(req.body)
                                                .then(() => {
                                                    res.send("done ...")
                                                })
                                        } else {
                                            res.send("bidder price is less than auction price ")
                                        }

                                    })
                            }
                        })
                } else {
                    res.send('your bidding price less than auction price')
                }
            })
    })


    app.get('/winner/:id', (req, res) => {
        var id = req.params.id
        knex('bidder_table').where('auction_id', id).max('bidder_price as price')
            .then((maxPrice) => {
                appDB.getdata(id)
                    .then((bidder_data) => {
                        for (i in bidder_data) {
                            if (maxPrice[0]['price'] == bidder_data[i]["bidder_price"]) {
                                sleep(3000);
                                res.send(bidder_data[i])
                            }
                        }

                    }).catch((err) => {
                        res.send(err)

                    })
            })
            .catch((err) => {
                res.send(err)
            })
    })

}