var knex=require("./connection")

//first table
knex.schema.hasTable('auctioner_data').then((exists)=>{
    if (!exists){
    return knex.schema.createTable('auctioner_data',(table)=> {
        table.increments('auction_id');
        table.string('auction_name');
        table.integer('price');
    })
    .catch((err)=>{
        console.log(err,"There is some err while writing the quety")
    })
    }
    return('already created events table');

})





// //second table

knex.schema.hasTable('bidder_table').then((exists)=>{
    if (!exists){
    return knex.schema.createTable('bidder_table',(table)=>{
        table.increments('bidder_id')
        table.string('bidder_name');
        table.integer('bidder_price');
        table.integer('auction_id').unsigned().notNullable();
        table.foreign('auction_id').references('auction_id').inTable('auctioner_data')
        })
    }  
    else{
        console.log("yes")
    } 
})
    
