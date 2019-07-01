export function successHandler(response) {
  if (!response.data || response.data.length === 0) {
    const errorMessage = {
      message: 'no data',
      statusCode: 500
    };
    throw errorMessage;
  }

  return response;
}

export function handler(error) {
  Promise.reject(error);
}