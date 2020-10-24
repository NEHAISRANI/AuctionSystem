var knex = require('../connection')

let insert_data = (data)=>{
    return knex('auctioner_data').insert(data)
} 

let data_inserted=(data)=>{
    return knex('bidder_table').insert(data)
}

let bidderID=(auctionid)=>{
    return knex.select("*").from('bidder_table').where('auction_id',auctionid)
}

let getdata=(userid)=>{
    return knex.select("*").from('bidder_table').where('auction_id',userid)
}

module.exports={insert_data,data_inserted,bidderID,getdata}

