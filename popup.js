let tabChanged = true

const resultsQuantity = document.querySelector(".results-quantity")
const shipmentsStatusValues = document.querySelectorAll(".status>span>.value")
const cleanButton = document.querySelector(".clean-button")
const message = document.querySelector(".message")

let pendingShipments = shipmentsStatusValues[0]
let permitedShipments = shipmentsStatusValues[1]
let notPermitedShipments = shipmentsStatusValues[2]

const messageIfItsEmpty = "You don't registered any shipment yet. Please, visit the Rodeo Scanned Work Pool to register all the shipments."
const messageIfItsPending = "All the registered shipments are pending. Check in Pandash which shipments have incorrect products classifications."
const messageIfItsVeryfied = "That's all! Now you need to send these not permited shipments to Amazon River."

cleanButton.addEventListener("click", async () => {
  await browser.storage.sync.set({ shipments: {} })

  message.innerText = messageIfItsEmpty
  pendingShipments.innerText = "0"
  permitedShipments.innerText = "0"
  notPermitedShipments.innerText = "0"
}) 

async function getAllShipments() {
  const { shipments } = await browser.storage.sync.get("shipments")

  let pendingShipmentsQuantity = 0
  let permitedShipmentsQuantity = 0
  let notPermitedShipmentsQuantity = 0

  shipments.forEach(shipment => {
    if (shipment.status === "PENDING") pendingShipmentsQuantity++
    if (shipment.status === "PERMITED") permitedShipmentsQuantity++
    if (shipment.status === "NOT_PERMITED") notPermitedShipmentsQuantity++
  })

  resultsQuantity.innerText = String(shipments.length) + " results"
  pendingShipments.innerText = String(pendingShipmentsQuantity)
  permitedShipments.innerText = String(permitedShipmentsQuantity)
  notPermitedShipments.innerText = String(notPermitedShipmentsQuantity)

  if (shipments.length === pendingShipmentsQuantity) message.innerText = messageIfItsPending
  if (pendingShipmentsQuantity === 0) message.innerText = messageIfItsVeryfied

  tabChanged = false
}

browser.runtime.onMessage.addListener((req) => {
  if (req && req.type && req.type === "TAB_CHANGED") tabChanged = true
})

if (tabChanged) getAllShipments()
