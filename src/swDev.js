const swDev = () => {

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.warn("res", res)
  })
}

export default swDev