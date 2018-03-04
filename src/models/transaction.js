const fs = require('fs')
const path = require('path')
const accountsPath = path.join(__dirname, 'accounts.json')
const uuid = require ('uuid/v4')



const getAll = (params) => {
  //console.log('ppppp', params)
  let acctId = params.acctId
  //const transactions = []
  let accounts = fs.readFileSync(accountsPath, 'utf-8')
  const accountsArr = JSON.parse(accounts)

  const accountFound = accountsArr.find(account => account.id === acctId )

  return accountFound.transactions

}

const getOne = (params) => {
  
  let errors = []
  let acctId = params.acctId
  let transId = params.transId
  const accounts = fs.readFileSync(accountsPath, 'utf-8')
  const accountsArr = JSON.parse(accounts)
  let response 
  const accountFound = accountsArr.find(account => account.id === acctId)

  if(accountFound) {
    const transactions = accountFound.transactions
    const transFound = transactions.find(transaction => transaction.id === transId)

    if(transFound) {
      response = transFound
    } else {
      errors.push('Transaction id not found')
      response = { errors }
    }
  } else {
    errors.push('Account not found')
    response = { errors }
  }

return response
}

const create = (params, body) => {
  let errors = []
  let id = params.acctId
  let title = body.title
  let amount= body.amount
  let response

  if(title && amount) {
    const trans = {}
    trans.id = uuid()
    trans.title = title
    trans.amount = amount
    trans.pending = true

    const accounts = fs.readFileSync(accountsPath, 'utf-8')
    let accountsArr = JSON.parse(accounts)

    accountsArr.forEach(account => {
      if(account.id === id) {
        account.transactions.push(trans)
        response = account
      }
    })
    
    const updatedAccounts = JSON.stringify(accountsArr)

    fs.writeFileSync(accountsPath, updatedAccounts) 
    
  } else {
    errors.push('Title and amount are required')
    response = { errors }
  }
  return response
}

const update = (params, body) => {
  
  const errors = []
  let response
  let acctId = params.acctId
  let transId = params.transId
  let title = body.title
  let amount = body.amount
  let pending = body.pending
  

  if(title && amount && pending) {
    const accounts = fs.readFileSync(accountsPath, 'utf-8')
    const accountsArr = JSON.parse(accounts)
    const accountFound = accountsArr.find(account => account.id === acctId)
    const transactions = accountFound.transactions
    let transUpdated

    transactions.forEach(transaction => {
      if(transaction.id === transId) {
        transaction.title = title
        transaction.amount = amount
        transaction.pending = pending
        transUpdated = transaction
      }
    })

    const updatedAccounts = JSON.stringify(accountsArr)
    fs.writeFileSync(accountsPath, updatedAccounts)
    response = transUpdated

  } else {
    errors.push('title, amount and pending are required')
    response = { errors }
  }
  return response
}

const del = (params) => {
  const errors = []
  let acctId = params.acctId
  let transId = params.transId
  let accounts = fs.readFileSync(accountsPath, 'utf-8')
  const accountsArr = JSON.parse(accounts)
  const accountFound = accountsArr.find(account => account.id === acctId)
  const transactions = accountFound.transactions
  let response

  const transFound = transactions.find(transaction => transaction.id === transId)

  if(transFound) {
    let index = transactions.indexOf(transFound)
    response = transFound
    transactions.splice(index, 1)
    const updatedAccounts = JSON.stringify(accountsArr)
    fs.writeFileSync(accountsPath, updatedAccounts)
  } else {
    errors.push('Transaction id not found')
    response = { errors }
  }
  return response
}

module.exports = { getAll, getOne, create, update, del }