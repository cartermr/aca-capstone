// import database connection
const db = require('../database/DatabaseConnection')
let values
let count

// function to person the search
const search = async (req, res) => {
    let params = req.body
    console.log(params)
    res.json(params)
    // // pull the various search parameters sent by the client
    // let searchParameters = Object.entries(req.body)
    // let sql = ''
    // count = 1
    // values = []

    // // start base sql string
    // if (searchParameters.length == 0) {
    //     sql = 'SELECT * FROM "Registered_People"'
    // } else {
    //     sql = 'SELECT * FROM "Registered_People" WHERE '

    //     // loop through the search parameters sent
    //     searchParameters.forEach( ([key, value], index) => {
    //         // help keep track if at end of the loop
    //         let end = searchParameters.length - 1

    //         // determine if current item is a height request
    //         if (key == 'height') {
    //             // add the ranged height search info to sql string
    //             sql = sql + heightRange(key, value, index, end)
    //             return
    //         }

    //         // determine if current item is a weight request        
    //         if (key == 'weight') {
    //             // add the ranged height search info to sql string            
    //             sql = sql + weightRange(key, value, index, end)
    //             return
    //         }

    //         // determine if the ietm contains a wildcard search request
    //         if (value.includes('%')) {
    //             // add the wildcard search info to sql string
    //             sql = sql + wildCard(key, value, index, end)
    //             return
    //         }

    //         // create search statements for base values, as-is, create statement
    //         // based on end of loop or not
    //         if (index == end) {
    //             values.push(value)
    //             sql = sql + `${key} = \$${count}`
    //             count++
    //             return
    //         } else {
    //             values.push(value)
    //             sql = sql + `${key} = \$${count} AND `
    //             count++
    //             return
    //         }

    //     })
    // }

    // //console.log(sql)
    // //console.log(values)

    // // perform search on database, grab results
    // const results = await db.query(sql, values).then(data => data.rows)

    // //console.log(results)

    // // return search results to client
    // return res.json(results)
}

// take entered height, create a range to search by
const heightRange = (key, value, index, end) => {
    let sqlPart = ''

    // determine the low and high end of the search range
    let lowValue = Number(value) - 0.08
    let highValue = Number(value) + 0.08
    values.push(lowValue)
    values.push(highValue)

    // create search statement based on end of loop or not
    if (index == end) {
        sqlPart = `${key} BETWEEN \$${count} AND \$${count + 1}`
        count += 2
        return sqlPart
    } else {
        sqlPart = `${key} BETWEEN \$${count} AND \$${(count + 1)} AND `
        count += 2
        return sqlPart
    }
}

// take entered weight, create a range to search by
const weightRange = (key, value, index, end) => {
    let sqlPart = ''

    // determine the low and high end of the search range
    let lowValue = Number(value) - 2
    let highValue = Number(value) + 2
    values.push(lowValue)
    values.push(highValue)

    // create search statement based on end of loop or not    
    if (index == end) {
        sqlPart = `${key} BETWEEN \$${count} AND \$${count + 1}`
        count += 2
        return sqlPart
    } else {
        sqlPart = `${key} BETWEEN \$${count} AND \$${count + 1} AND `
        count += 2
        return sqlPart
    }
}

// take entered wildcard search item
const wildCard = (key, value, index, end) => {
    let sqlPart = ''

    values.push(value)

    // create the search statement based on end of loop or not
    if (index == end) {
        sqlPart = `${key} LIKE \$${count}`
        count++
        return sqlPart
    } else {
        sqlPart = `${key} LIKE \$${count} AND `
        count++
        return sqlPart
    }
}

module.exports = {search}