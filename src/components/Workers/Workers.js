import * as WorkersModel from './WorkersModel'

exports.list = async (req) => {
  return WorkersModel.list()
}

exports.search = async (req) => {
  req.queryString = "'%" + req.query.replace(' ', "%', '%") + "%'"
  let results = await WorkersModel.search(req)

  if (results.length && results[0].category) {
    let categories = [...new Set(results.map(result => result.category))]
    let newResults = {}

    categories.forEach(category => {
      newResults[category] = {
        name: category,
        results: results.filter(result => result.category === category)
      }
    })
    results = newResults
  }

  return {
    success: true,
    results
  }
}
