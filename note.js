const fs = require('fs');
const chalk = require('chalk');
const getNotes = function () {
    return 'Your notes...'
}

const readNote = (title) =>
{
    const notes = loadNotes();
   const note = notes.find(n => n.title === title);
  debugger 
   note ? console.log(note.body) : console.log("note not found");
}

const listNotes = () => {
    const notes = loadNotes();
    notes.map(n => console.log(n.title));
}
const removeNote = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title)
    if(notes.length > notesToKeep.length)
    {
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found'))

    }
}

const addNote = (title,body) => {
    const notes = loadNotes();
   const duplicateNote = notes.find (
    note => note.title === title)
    if(!duplicateNote) {

    notes.push({
        title: title,
        body: body
    })
  saveNotes(notes);
  console.log('New note added');
    }
    else {
        console.log('Note title taken')
    }
  
}
const loadNotes =  () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const saveNotes = (notes) =>
{
const dataJSON = JSON.stringify(notes);
fs.writeFileSync('notes.json',dataJSON);
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes: listNotes,
    readNote:readNote
}