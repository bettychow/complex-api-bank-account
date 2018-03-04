const fs = require('fs')
const path = require('path')
const accountsPath = path.join(__dirname, 'accounts.json')
const uuid = require ('uuid/v4')



const getAll = () => {
  let accounts = fs.readFileSync(accountsPath, 'utf-8')
  return accounts
}

const getOne = (params) => {
  let errors = []
  let id = params.acctId
  const accounts = fs.readFileSync(accountsPath, 'utf-8')
  const accountsArr = JSON.parse(accounts)
  let response 
  const accountFound = accountsArr.find(account => account.id === id)

  if(accountFound) {
    response = accountFound
  } else {
    errors.push('Account not found')
    response = { errors }
  }

return response
}

const create = (body) => {
  let errors = []
  let name = body.name
  let bankName = body.bankName
  let des = body.description
  let response

  if(name && bankName && des) {
    const account = {}
    account.id = uuid()
    account.name = name
    account.bankName = bankName
    account.description = des
    account.transactions = []

    const accounts = fs.readFileSync(accountsPath, 'utf-8')
    let accountsArr = JSON.parse(accounts)
    accountsArr.push(account)

    const updatedAccounts = JSON.stringify(accountsArr)

    fs.writeFileSync(accountsPath, updatedAccounts) 
    response = account
  } else {
    errors.push('Name, bank name and description are required')
    response = { errors }
  }
  return response
}

const update = (params, body) => {
  const errors = []
  let response
  let id = params.id
  let name = body.name
  let bankName = body.bankName
  let des = body.description
  

  if(id && name && bankName && des) {
    const accounts = fs.readFileSync(accountsPath, 'utf-8')
    let accountsArr = JSON.parse(accounts)
    let accountFound

    accountsArr.forEach(account => {
      if(account.id === id) {
        account.name = name
        account.bankName = bankName
        account.description = des
        accountFound = account
      }
    })

    const updatedAccounts = JSON.stringify(accountsArr)
    fs.writeFileSync(accountsPath, updatedAccounts)
    response = accountFound

  } else {
    errors.push('Name, bankName and description are required')
    response = { errors }
  }
  return response
}

const del = (params) => {
  const errors = []
  let id = params.id
  let accounts = fs.readFileSync(accountsPath, 'utf-8')
  const accountsArr = JSON.parse(accounts)
  const accountFound = accountsArr.find(account => account.id === id)
  let response

  if(accountFound) {
    let index = accountsArr.indexOf(accountFound)
    response = accountFound
    accountsArr.splice(index, 1)
    let updatedAccounts = JSON.stringify(accountsArr)
    fs.writeFileSync(accountsPath, updatedAccounts)
  } else {
    errors.push('Id not found')
    response = { errors }
  }
  return response
}

module.exports = { getAll, getOne, create, update, del }
