export function transformDtoQuery(dto: any) {
  if (!dto) return '';

  const query = recursiveQuery(dto);
  const queryHandled = '?' + query.slice(0, query.length - 1);

  return queryHandled;
}

function recursiveQuery(dto: any, path = '') {
  let query = '';

  Object.entries(dto).map(([key, value], i, arr) => {
    if (typeof value == 'object') {
      path += key + '.';
      query += recursiveQuery(value, path);
    } else {
      query += `${path}${key}=${value}&`;
    }
  });

  return query;
}
