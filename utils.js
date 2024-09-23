export function createElementWithText(element, text) {
  const title = document.createElement(element)
  const titleText = document.createTextNode(text)
  title.appendChild(titleText)
  title.style.fontSize = "16px"
  title.style.color = "#f88800"
  
  return title
}

export function findColumnIndex(columnName) {
  let columnIndex = 0
  let stopHeadingsLoop = false
  const quantityOfHeadings = tableHeadings.length - 1

  while (!stopHeadingsLoop) {
    if (tableHeadings[columnIndex] !== undefined) {
      if (tableHeadings[columnIndex].innerText === columnName) {
        stopHeadingsLoop = true
        break
      }

      if (columnIndex === quantityOfHeadings && !tableHeadings[columnIndex].innerText === columnName) {
        stopHeadingsLoop = true
        return -1
      }
      else {
        columnIndex++
      }
    }
    else {
      return -1
    }
  }

  return columnIndex
}

export function createSubmitButton(text) {
  const button = createElementWithText("div", text)

  button.style.width = "fit-content"
  button.style.height = "fit-content"
  button.style.transition = "ease 0.24s"
  button.style.padding = "12px"
  button.style.marginBottom = "12px"
  button.style.borderRadius = "8px"
  button.style.textAlign = "center"
  button.style.backgroundColor = "#f88800"
  button.style.fontWeight = "500"
  button.style.color = "white"
  button.style.cursor = "pointer"

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#ffaa1c"
  })

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#f88800"
  })

  return button
}