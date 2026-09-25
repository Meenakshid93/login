 const yargs = require('yargs/yargs')(process.argv.slice(2))
const getNotes = require('./notes.js')
 const validator = require('validator')

 yargs.command({
    command: 'add',
    describe: 'Adding Notes !',
    handler: function (){
        console.log('Adding a new note !!!')
    }
 })

 yargs.command({
    command: 'remove',
    describe: 'Removing Notes !',
    handler: function (){
        console.log('Removing a new note !!!')
    }
 })

 yargs.command({
    command: 'list',
    describe: 'Listing Notes !',
    handler: function (){
        console.log('Listing the new note !!!')
    }
 })

 yargs.command({
    command: 'read',
    describe: 'Reading notes !',
    handler: function (){
        console.log('Reading a new note !!!')
    }
 })

 yargs.parse()