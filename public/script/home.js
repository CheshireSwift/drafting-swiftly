'use strict'

$(document).ready(function () {
  $('button#create').on('click', () => {
    $('input#userInput').val(ds.getUser())
    return true
  })
})

