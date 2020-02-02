$(() => {
   

  })
function onInput(){
    var cars = ["Saab", "Volvo", "BMW"];

    let list = document.getElementById("searchResults")

    let searchField = document.getElementById("searchField")
    if(searchField.value === ""){
        list.innerHTML = "";
        return
    }

    list.innerHTML = "";
    cars.forEach(element => {
        var div = document.createElement("div")
        div.setAttribute("class", "list-group-item")
        var para = document.createElement("a")
        para.setAttribute("class", "item-link")
        para.setAttribute("href", "#")  
        var button = document.createElement("button")
        button.setAttribute("class", "btn btn-dark")
        button.appendChild(document.createTextNode("Download"))
        var node = document.createTextNode(element.valueOf())
        para.appendChild(node)
        div.innerHTML = para.outerHTML + button.outerHTML
        list.appendChild(div)
    });
   
    console.log(searchField.value)
}