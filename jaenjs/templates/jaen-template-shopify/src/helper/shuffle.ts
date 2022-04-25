export function shuffle<T>(array: Array<T>, seed: number): Array<T> {
  // <-- ADDED ARGUMENT
  var m = array.length,
    t: T,
    i: number

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--) // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
    ++seed // <-- ADDED LINE
  }

  return array
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
