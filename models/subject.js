'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Subject.associate = models => {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {through: 'StudentSubject'})
    Subject.hasMany(models.StudentSubject)
  }

  return Subject;
};