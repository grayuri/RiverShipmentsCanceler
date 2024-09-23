function logVisit(route, shipments)  {
  console.log("You have visited " + route)

  if (shipments.length === 0 || !shipments) {
    console.log("But you need to register your shipments. Visit Rodeo to get and check the data.")
  }
  else {
    console.log("The current Shipments are:")
    console.log(shipments)
  }
}

browser.tabs.onActivated.addListener(async (e) => {
  try {
    const frames = await browser.webNavigation.getAllFrames({ tabId: e.tabId })
    const frame = frames.filter(frame => frame.parentFrameId == -1)[0]

    if (!frame.url.startsWith("http")) return
    if (frame.url.includes("youtube")) { // pandash
      const { shipments } = await browser.storage.sync.get("shipments")
      logVisit("Pandash", shipments)
    }
    if (frame.url.includes("tabnews")) { // river
      const { shipments } = await browser.storage.sync.get("shipments")
      logVisit("River", shipments)
    }

    browser.runtime.sendMessage({ type: "TAB_CHANGED" })
  } 
  catch (error) {
    console.log("It was not possible to get the current frame.")
  }
})