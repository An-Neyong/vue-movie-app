exports.handler = async function(event,context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'csy',
      age: 20,
      email: 'cotjdud1010@gmail.com'
    })
  }
}