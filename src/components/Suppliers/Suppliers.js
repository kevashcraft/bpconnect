import * as SuppliersModel from './SuppliersModel'

exports.create = async (req) => {
  return SuppliersModel.create(req)
}

exports.delete = async (req) => {
  let fields = { deleted: true }
  await SuppliersModel.update(req.id, fields)

  return true
}

exports.list = async (req) => {
  req.deleted = !!req.deleted
  return SuppliersModel.list(req)
}

exports.search = async (req) => {
  req.queryString = "'%" + req.query.replace(' ', "%', '%") + "%'"
  let results = await SuppliersModel.search(req)

  return {
    success: true,
    results
  }
}

exports.undelete = async (req) => {
  let fields = { deleted: false }
  await SuppliersModel.update(req.id, fields)

  return true
}

exports.update = async (req) => {
  let fields = {
    name: req.name,
    phone: req.phone,
    address: req.address,
    email: req.email,
    fax: req.fax,
    zipcode_id: req.zipcodeId
  }
  await SuppliersModel.update(req.id, fields)

  return true
}
