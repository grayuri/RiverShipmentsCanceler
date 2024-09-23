(async () => {
  const utilsSrc = browser.runtime.getURL("./utils.js");
  const { createSubmitButton, findColumnIndex } = await import(utilsSrc)

  const filterButtonContainer = document.querySelector("#masthead-container")
  const verifyShipmentsButton = createSubmitButton("Verify Shipments")

  filterButtonContainer.appendChild(verifyShipmentsButton)

  let notPermitedProducts = ["1", "2", "3"]
  const { shipments } = await browser.storage.sync.get("shipments")

  shipments.forEach(shipment => {
    let i = 0

    shipment.products.forEach(product => {
      while (i < notPermitedProducts.length) {
        if (notPermitedProducts[i] === product) {
          shipment.status = "NOT_PERMITED"
          i = notPermitedProducts.length
        }
        else {
          shipment.status = "PERMITED"
          i++
        }
      }
    })
  })

  await browser.storage.sync.set({ shipments })
})()