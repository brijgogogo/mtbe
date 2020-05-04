const utils = require("../utils");

module.exports = {
  dataTypes: {
    number: "number",
    numberOptional: "number?",
    string: "string",
    stringOptional: "string?",
    bool: "boolean",
    boolOptional: "boolean?",
    date: "date",
    dateOptional: "date?",
  },
  fullCountColumn: "_full_count",
  createdByColumn: "created_by",
  createdDateColumn: "created_date",
  modifiedByColumn: "modified_by",
  modifiedDateColumn: "modified_date",
  sourceColumn: "source",
  statusColumn: "status",
  metaColumns: function () {
    return [
      this.createdByColumn,
      this.createdDateColumn,
      this.modifiedByColumn,
      this.modifiedDateColumn,
      this.sourceColumn,
      this.statusColumn,
    ];
  },
  insertMetaColumns: function () {
    return [
      this.createdByColumn,
      this.createdDateColumn,
      this.sourceColumn,
      this.statusColumn,
    ];
  },
  updateMetaColumns: function () {
    return [this.modifiedByColumn, this.modifiedDateColumn, this.statusColumn];
  },
  metaColumnsSchema: function () {
    let t = this;

    return {
      [t.createdByColumn]: t.dataTypes.numberOptional,
      [t.createdDateColumn]: t.dataTypes.dateOptional,
      [t.modifiedByColumn]: t.dataTypes.numberOptional,
      [t.modifiedDateColumn]: t.dataTypes.dateOptional,
      [t.sourceColumn]: t.dataTypes.stringOptional,
      [t.statusColumn]: t.dataTypes.numberOptional,
    };
  },
  insertMetaColumnsSchema: function () {
    let t = this;
    return utils.keepKeys(this.metaColumnsSchema(), [
      t.createdByColumn,
      t.createdDateColumn,
      t.sourceColumn,
      t.statusColumn,
    ]);
  },
  metaColumnsSchemaDefaults: function () {
    let t = this;

    return {
      [t.statusColumn]: true,
    };
  },
  insertMetaColumnsSchemaDefaults: function () {
    let t = this;
    return utils.keepKeys(this.metaColumnsSchemaDefaults(), [t.statusColumn]);
  },
  setAddInfo: function (obj, userId) {
    obj[this.createdDateColumn] = new Date();
    obj[this.createdByColumn] = userId;
    obj[this.statusColumn] = obj[this.statusColumn] || 1;

    /*
    columns.forEach((e) => {
      obj[e] = obj[e] || null;
    });
    */
  },
  setUpdateInfo: function (obj, userId) {
    obj[this.modifiedDateColumn] = new Date();
    obj[this.modifiedByColumn] = userId;
  },
  toValidationError: function (error) {
    const validationError = {
      item: error.branch[0], // object validated
      errors: {},
    };

    error.failures.forEach((e) => {
      const key = e.path[0];
      const value = e.value;
      const type = e.type;

      if (value === undefined) {
        validationError.errors[key] = "required";
      } else if (type === undefined) {
        validationError.errors[key] = "unknown attribute";
      } else {
        validationError.errors[key] = "invalid";
      }
    });

    return validationError;
  },
};
