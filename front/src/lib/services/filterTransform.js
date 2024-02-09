export default function filterTransform (filter) {
  let filterQuery = []

  console.log(filter)

  for (const key in filter) {
    let condition = ''
    let value = ''
    
    if (filter[key] !== undefined && Array.isArray(filter[key]) || filter[key].length == 2) {
      condition = `[${filter[key][0]}]`
      value = filter[key][1]
    } else {
      value = filter[key]
    }

    filterQuery.push(`${key}${condition}=${value}`)
  }

  return filterQuery 
    ? '?' + filterQuery.join('&') 
    : ''
}