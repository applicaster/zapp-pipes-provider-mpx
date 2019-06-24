export function successHandler(response) {
  if (!response.data || response.data.length === 0) {
    throw {
      message: 'no data',
      statusCode: 500
    };
  }

  return response;
}

export function handler(error) {
  console.log(error.message);
  Promise.reject(error);
}