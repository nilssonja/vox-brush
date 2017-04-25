export function set( path, obj = {}, value ) {
  if(path === undefined) {
    return obj;
  }
  let pathParts = path.split('.');
  if(pathParts.length === 1) {
    obj[pathParts[0]] = value;
    return obj;
  } else {
    obj[pathParts[0]] = set( pathParts.slice(1).join('.'), { ...obj[pathParts[0]] }, value);
    return obj;
  }
}

export function get( path, obj) {
  if(path === undefined || obj === undefined) {
    return undefined;
  }
  let pathParts = path.split('.');
  if(pathParts.length === 1) {
    return obj[pathParts[0]]
  } else if( obj[pathParts[0]] === undefined ) {
    return undefined;
  } else {
    return get(pathParts.slice(1).join('.'), obj[pathParts[0]]);
  }
}

export function remove( path, obj = {}) {
  if(path === undefined) {
    return obj;
  }
  let pathParts = path.split('.');
  if(pathParts.length === 1) {
    delete obj[pathParts[0]];
    return obj;
  } else {
    obj[pathParts[0]] = remove( pathParts.slice(1).join('.'), { ...obj[pathParts[0]] });
    return obj;
  }
}