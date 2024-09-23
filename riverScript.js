(async () => {
  const utilsSrc = browser.runtime.getURL("./utils.js");
  const { createSubmitButton } = await import(utilsSrc)

  const { shipments } = await browser.storage.sync.get("shipments")
  const notPermitedShipments = shipments.filter(shipment => shipment.status === "NOT_PERMITED")
  let allShipmentsWasInserted = false

  const riverContainer = document.querySelector("header")
  const pasteShipmentsButton = createSubmitButton("Paste Shipments")

  riverContainer.appendChild(pasteShipmentsButton)

  function insertValuesIntoInputs() {
    const formControlInputs = document.querySelectorAll("input")

    formControlInputs.forEach((input, index) => {
      if (!index === notPermitedShipments.length) input.value = notPermitedShipments[index]
      else allShipmentsWasInserted = true
    })
  }

  pasteShipmentsButton.addEventListener("click", () => {
    if (!allShipmentsWasInserted) setInterval(insertValuesIntoInputs, 2000)
  })
})()