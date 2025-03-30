let estadoInicial;
let cartas;

let crearUnaCarta = (numeroDeCarta) => {

  let symbol = ["♠", "♣", "♥", "♦"];


  let cartaEscogida = {
    pinta: symbol[(Math.floor(Math.random() * symbol.length))],
    numero: (Math.floor(Math.random() * 12)) + 1
  };

  let cardHead = document.getElementById(`cardHead${numeroDeCarta}`)
  cardHead.innerHTML = cartaEscogida.pinta
  if (cartaEscogida.pinta === "♠" || cartaEscogida.pinta === "♣") {
    cardHead.classList.remove("rojo")
    cardHead.classList.add("negro");
  } else {
    cardHead.classList.remove("negro")
    cardHead.classList.add("rojo");
  }



  let cardNum = document.getElementById(`cardNum${numeroDeCarta}`)
  if (cartaEscogida.numero == 1) {
    cardNum.innerHTML = "A"
  } else if (cartaEscogida.numero == 11) {
    cardNum.innerHTML = "J"
  } else if (cartaEscogida.numero == 12) {
    cardNum.innerHTML = "Q"
  } else if (cartaEscogida.numero == 13) {
    cardNum.innerHTML = "K"
  } else {
    cardNum.innerHTML = cartaEscogida.numero
  }
  cardNum.classList.add("num")



  let cardFoot = document.getElementById(`cardFoot${numeroDeCarta}`)
  cardFoot.innerHTML = cartaEscogida.pinta
  if (cartaEscogida.pinta === "♠" || cartaEscogida.pinta === "♣") {
    cardFoot.classList.remove("rojo")
    cardFoot.classList.add("negro");
  } else {
    cardFoot.classList.remove("negro")
    cardFoot.classList.add("rojo");
  }
}

let crearNcartas = (cantidad) => {
  let listaDeCartasCreadas = []
  for (let i = 0; i < cantidad; i++) {
    if (i == 0) {
      crearUnaCarta(i)
      listaDeCartasCreadas.push({
        "number": document.getElementById("carta0").querySelector(`#cardNum${i}`).innerText,
        "symbol": document.getElementById("carta0").querySelector(`#cardHead${i}`).innerText,
      })
    } else {
      let nuevoDiv = document.createElement("div")
      nuevoDiv.id = `carta${i}`
      nuevoDiv.classList.add("col-2", "m-1")
      nuevoDiv.innerHTML = document.getElementById("carta0").innerHTML
      nuevoDiv.querySelector("#cardHead0").id = `cardHead${i}`;
      nuevoDiv.querySelector("#cardNum0").id = `cardNum${i}`;
      nuevoDiv.querySelector("#cardFoot0").id = `cardFoot${i}`;
      document.getElementById("groupCards0").appendChild(nuevoDiv)
      crearUnaCarta(i)
      listaDeCartasCreadas.push({
        "number": nuevoDiv.querySelector(`#cardNum${i}`).innerText,
        "symbol": nuevoDiv.querySelector(`#cardHead${i}`).innerText,
      })
    }
  }
  return listaDeCartasCreadas
}

let selectSort = (arr) => {
  let listaParaLosLogs = [JSON.parse(JSON.stringify(arr))]
  let arrASoloNumeros = []
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i].number)) {
      arrASoloNumeros.push(arr[i])
    } else {
      if (arr[i].number == "A") {
        arr[i].number = 1
        arrASoloNumeros.push(arr[i])
      } else if (arr[i].number == "J") {
        arr[i].number = 11
        arrASoloNumeros.push(arr[i])
      } if (arr[i].number == "Q") {
        arr[i].number = 12
        arrASoloNumeros.push(arr[i])
      } if (arr[i].number == "K") {
        arr[i].number = 13
        arrASoloNumeros.push(arr[i])
      }
    }

  }

  for (let i = 0; i < arrASoloNumeros.length - 1; i++) { // primer pasada i == 2
    let minIndex = i;                        // primer pasada minIndex = 2
    for (let j = i + 1; j < arrASoloNumeros.length; j++) {
      if (parseInt(arrASoloNumeros[minIndex].number) > parseInt(arrASoloNumeros[j].number)) {
        minIndex = j;                       // reemplazo el min index por el mas chico *2
      }
    }
    if (i !== minIndex) {
      // let temp = arrASoloNumeros[i];
      // arrASoloNumeros[i] = arrASoloNumeros[minIndex];
      // arrASoloNumeros[minIndex] = temp;
      [arrASoloNumeros[i], arrASoloNumeros[minIndex]] = [arrASoloNumeros[minIndex], arrASoloNumeros[i]];
      listaParaLosLogs.push(JSON.parse(JSON.stringify(arrASoloNumeros)));
    }
  }
  return listaParaLosLogs
}

let ordenarCartas = (arr) => {
  let lineaSeparador = document.createElement("hr")
  lineaSeparador.classList.add("hr")
  document.getElementById("fila0").appendChild(lineaSeparador)
  let nuevoDiv = document.createElement("div")
  nuevoDiv.id = "ConsoleLog"
  nuevoDiv.innerHTML = "<h1><strong>ConsoleLog</strong></h1>"
  nuevoDiv.classList.add("row", "m-1")
  document.getElementById("fila0").appendChild(nuevoDiv)
  for (let i = 0; i < arr.length; i++) {
    let lineaSeparador = document.createElement("hr")
    lineaSeparador.classList.add("hr")
    document.getElementById("fila0").appendChild(lineaSeparador)
    let divSeparador = document.createElement("div")
    divSeparador.id = `groupCard${i + 1}`
    divSeparador.classList.add("bckg", "d-flex", "justify-content-start", "row")
    document.getElementById("fila0").appendChild(divSeparador)
    for (let j = 0; j < arr[i].length; j++) {
      let nuevoDiv = document.createElement("div")
      nuevoDiv.id = `carta${i},${j}`
      nuevoDiv.classList.add("col-2", "m-1")
      nuevoDiv.innerHTML = document.getElementById("carta0").innerHTML
      document.getElementById(`groupCard${i + 1}`).appendChild(nuevoDiv);
      nuevoDiv.querySelector("#cardHead0").id = `cardHead${i},${j}`;
      nuevoDiv.querySelector("#cardNum0").id = `cardNum${i},${j}`;
      nuevoDiv.querySelector("#cardFoot0").id = `cardFoot${i},${j}`;

      if (arr[i][j].symbol === "♠" || arr[i][j].symbol === "♣") {
        document.getElementById(`cardHead${i},${j}`).classList.remove("rojo")
        document.getElementById(`cardHead${i},${j}`).classList.add("negro");
      } else {
        document.getElementById(`cardHead${i},${j}`).classList.remove("negro")
        document.getElementById(`cardHead${i},${j}`).classList.add("rojo");
      }
      document.getElementById(`cardHead${i},${j}`).innerHTML = arr[i][j].symbol;

      if (arr[i][j].number == 1) {
        document.getElementById(`cardNum${i},${j}`).innerHTML = "A"
      } else if (arr[i][j].number == 11) {
        document.getElementById(`cardNum${i},${j}`).innerHTML = "J"
      } else if (arr[i][j].number == 12) {
        document.getElementById(`cardNum${i},${j}`).innerHTML = "Q"
      } else if (arr[i][j].number == 13) {
        document.getElementById(`cardNum${i},${j}`).innerHTML = "K"
      } else {
        document.getElementById(`cardNum${i},${j}`).innerHTML = arr[i][j].number;
      }

      if (arr[i][j].symbol === "♠" || arr[i][j].symbol === "♣") {
        document.getElementById(`cardFoot${i},${j}`).classList.remove("rojo")
        document.getElementById(`cardFoot${i},${j}`).classList.add("negro");
      } else {
        document.getElementById(`cardFoot${i},${j}`).classList.remove("negro")
        document.getElementById(`cardFoot${i},${j}`).classList.add("rojo");
      }
      document.getElementById(`cardFoot${i},${j}`).innerHTML = arr[i][j].symbol;
    }

  }

}

window.addEventListener("DOMContentLoaded", () => {
  estadoInicial = document.getElementById("fila0").innerHTML;
});

let limpiar = () => {
  document.getElementById("fila0").innerHTML = estadoInicial;
}

document.getElementById("draw").addEventListener("click", () => {
  limpiar()
  cartas = crearNcartas(parseInt(document.getElementById("cantidad").value))
})

document.getElementById("sort").addEventListener("click", () => {
  ordenarCartas(selectSort(cartas))
})

document.getElementById("clean").addEventListener("click", () => {
  limpiar()
  document.getElementById("cantidad").value = ""
})
