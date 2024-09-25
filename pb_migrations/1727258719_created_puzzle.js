/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bxi9ijnnzbrk62n",
    "created": "2024-09-25 10:05:19.325Z",
    "updated": "2024-09-25 10:05:19.325Z",
    "name": "puzzle",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fnyzi4r7",
        "name": "book",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "niiqnz3w",
        "name": "fen",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bxi9ijnnzbrk62n");

  return dao.deleteCollection(collection);
})
