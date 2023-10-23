export function separateSQLAndJSON(input) {
    
    let parts = input.split('json');
    let sqlQuery = '';
    let jsonData = '';
  
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        sqlQuery += parts[i];
      } else {
        jsonData += parts[i];
      }
    }
  
    return { jsonData };
  }