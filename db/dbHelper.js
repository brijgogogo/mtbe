module.exports = {
  created_by_column: "created_by",
  created_date_column: "created_date",
  modified_by_column: "modified_by",
  modified_date_column: "modified_date",
  source_column: "source",
  status_column: "status",
  metaColumns: function () {
    let x = [
      this.created_by_column,
      this.created_date_column,
      this.modified_by_column,
      this.modified_date_column,
      this.source_column,
      this.status_column,
    ];
    return x;
  },
  setAddInfo: function (obj, userId, columns) {
    obj[this.created_date_column] = new Date();
    obj[this.created_by_column] = userId;
    obj[this.status_column] = obj[this.status_column] || 1;

    columns.forEach((e) => {
      obj[e] = obj[e] || null;
    });
  },
  setUpdateInfo: function (obj, userId) {
    obj[this.modified_date_column] = new Date();
    obj[this.modified_by_column] = userId;
  },
};
