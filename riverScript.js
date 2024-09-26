(async () => {
  const utilsSrc = browser.runtime.getURL("./utils.js");
  const { createSubmitButton, createElementWithText } = await import(utilsSrc)

  const { shipments } = await browser.storage.sync.get("shipments")
  const notPermitedShipments = shipments.filter(shipment => shipment.status === "NOT_PERMITED")

  const riverContainer = document.querySelector("header")
  const pasteShipmentsButton = createSubmitButton("Paste Shipments")
  const message = createElementWithText("p", "")

  riverContainer.appendChild(pasteShipmentsButton)
  riverContainer.appendChild(message)
  
  function insertValuesIntoInputs() {
    let totalOfShipmentsInserted = 0
    const formControlInputs = document.querySelectorAll(".form-control")
    
    formControlInputs.forEach((input, index) => {
      if (totalOfShipmentsInserted === notPermitedShipments.length) {
        message.innerText = "All shipments were inserted."
      }
      else {
        if (!(input.value === notPermitedShipments[index].id)) input.value = notPermitedShipments[index].id
        
        totalOfShipmentsInserted++

        let shipmentsRemaining = notPermitedShipments.length - totalOfShipmentsInserted
        message.innerText = "There's " + shipmentsRemaining + " shipments remaining."
      }
    })
  }

  pasteShipmentsButton.addEventListener("click", () => {
    insertValuesIntoInputs()
  })
})()