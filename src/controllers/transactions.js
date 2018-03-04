const express = require('express')
const model = require('../models/transaction')


const getAll = (req, res) => {
  const data = model.getAll(req.params)
  res.status(200).json({ data })
}

const getOne = (req, res, next) => {
  const data = model.getOne(req.params)
  if(data.errors) {
    return next({ status: 400, message: 'Cannot find transaction', errors: data.errors })
  }
  res.status(200).json({ data })
}

const create = (req, res, next) => {

  
  const data = model.create(req.params, req.body)
  if(data.errors) {
    return next({ status: 400, message: 'Cannot create transaction', errors: data.errors })
  }
  res.status(201).json({ data })
}

const update = (req, res, next) => {
  const data = model.update(req.params, req.body)
  if(data.errors) {
    return next({ status: 400, message: 'Cannot update transaction', errors: data.errors })
  }
  res.status(200).json({ data })
}

const del = (req, res, next) => {
  const data = model.del(req.params)
  if(data.errors) {
    return next({ status: 400, message: 'Cannot delete transaction', errors: data.errors })
  }
  res.status(204).json({ data })
}

module.exports = { getAll, getOne, create, update, del }