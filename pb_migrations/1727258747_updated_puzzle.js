/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxi9ijnnzbrk62n")

  collection.name = "puzzles"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxi9ijnnzbrk62n")

  collection.name = "puzzle"

  return dao.saveCollection(collection)
})
