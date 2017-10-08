'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ('Nama depan tidak boleh kosong')
        } 
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ('Nama belakang tidak boleh kosong')
        } 
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ('Email tidak boleh kosong')
        },
        isEmail: {
          msg: ('Format email salah')
        }
      },
      unique: {
        msg: ('Email sudah digunakan')
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.associate = models => {
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
    Student.hasMany(models.StudentSubject)
  }

  Student.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  return Student;
};