const vowelCount = term => {
  const matches = term.match(/[aeiou]/gi)
  return matches ? matches.length : 0
}

console.log(vowelCount('why'))

const letterCount = term => {
  const letters = {}
  const stringTerm = term.toUpperCase();
  for(let char of stringTerm){
    // if(/[A-Z]/.test(char))
    letters[char] = (letters[char] || 0) + 1
  }
  return Object.fromEntries(Object.entries(letters).sort())
}
 console.log(letterCount('DiViBhavVarma2134334'))