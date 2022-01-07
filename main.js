import fs from 'fs'

function UserException(message) {
    this.message = message
    this.name = 'UserException'
}

let changes, txt
try {
    changes = fs.readFileSync('./AdamTempleChanges', 'utf8')
} catch (e) {
    throw new UserException ("Brakuje pliku tekstowego './AdamTempleChanges'")
}
try {
    txt = fs.readFileSync('./AdamTempleTxt', 'utf8')
} catch (e) {
    throw new UserException ("Brakuje pliku tekstowego './AdamTempleTxt'")
}

let changesLines = changes.split("\n")
let keyArray = []
let iterator = changesLines.keys()
for (let key of iterator) {
    keyArray.push(key)
}
keyArray = keyArray.slice(2)
let find
const setFind = (changePair) => {
    if (changePair.length > 1) {
        find = changePair.shift()
    } else {
        throw new UserException('At least one "find" not specified in "AdamTempleChanges" file');
    }
}
const handleChangePair = () => { //todo
    setFind(changePair)
    let firstNewStringLine = changePair.shift();
    let newString = [firstNewStringLine.slice(4)].concat(changePair).join("\n")
    txt = txt.replaceAll(find, newString)
}
let last = ''
let changePair
let decreasedTestedKeyArray = keyArray.filter(x => /^    /.test(changesLines[x])).map(x => x - 1)
decreasedTestedKeyArray.forEach(x => {
    changePair = changesLines.slice(last, x)
    handleChangePair()
    last = x
})
changePair = changesLines.slice(last)
handleChangePair(changePair)
// console.log(AdamTempleTxt)
const adamTemple = txt

export {adamTemple}