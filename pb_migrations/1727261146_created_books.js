/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "06scsvxy2withtj",
    "created": "2024-09-25 10:45:46.714Z",
    "updated": "2024-09-25 10:45:46.714Z",
    "name": "books",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ebehulsb",
        "name": "name",
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
  const collection = dao.findCollectionByNameOrId("06scsvxy2withtj");

  return dao.deleteCollection(collection);
})
