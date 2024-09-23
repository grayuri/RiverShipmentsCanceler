(async () => {
  const utilsSrc = browser.runtime.getURL("./utils.js");
  const { createSubmitButton, findColumnIndex } = await import(utilsSrc)

  const shipments = [
    {
      id: "1",
      status: "PENDING",
      products: [
        "1",
        "2",
        "3"
      ]
    },
    {
      id: "2",
      status: "PENDING",
      products: [
        "3",
        "7",
        "4"
      ]
    },
    {
      id: "3",
      status: "PENDING",
      products: [
        "11",
        "2",
        "34"
      ]
    },
    {
      id: "4",
      status: "PENDING",
      products: [
        "11",
        "23",
        "32"
      ]
    },
    {
      id: "5",
      status: "PENDING",
      products: [
        "51",
        "22",
        "32"
      ]
    },
    {
      id: "6",
      status: "PENDING",
      products: [
        "1",
        "23",
        "3"
      ]
    },
  ]

  const tableBody = document.querySelector(".c-navigation-container")

  const getShipmentsButton = createSubmitButton("Get Shipments")

  tableBody.appendChild(getShipmentsButton)

  await browser.storage.sync.set({ shipments })
})()