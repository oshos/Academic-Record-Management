const AcademicRecordManagement = artifacts.require("AcademicRecordManagement");

module.exports = function (deployer) {
  deployer.deploy(AcademicRecordManagement);
};
