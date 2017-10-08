'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.associate = models => {
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.Student)
  }

  return StudentSubject;
};