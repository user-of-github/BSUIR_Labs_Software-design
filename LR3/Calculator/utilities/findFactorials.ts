import { number } from 'mathjs'


function getIndicesOf(searchStr: string, str: string, caseSensitive: boolean = false) {
  const searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}


const findClosingBracketOfString = (str: string, startFrom: number): number => {
  const balance: Array<string> = ['(']

  for (let index = startFrom + 1; index < str.length; ++index) {
    if (str[index] === '(') balance.push('(')
    else if (str[index] === ')' && balance.length !== 0)
        balance.pop()

    if (balance.length === 0) return index
  }

  return -1
}

export const findFactorials = (source: string): Array<string> => {
  console.log(source)
  const found = getIndicesOf('factorial', source).map(i => i + 9)

  const substrings: Array<string> = found.map(f => source.slice(f, findClosingBracketOfString(source, f) + 1))

  substrings.sort((a, b): number => a.length - b.length)


  return substrings
}
