import CalculateResource from "./CalculateResource";

const CalculateManager = function (QuestionsResource) {
  function getIntrest(params, successCallback, errorCallback) {
    QuestionsResource.getIntrest(params).then(
      function (res) {
        successCallback(res);
      },
      function (error) {
        errorCallback(error);
      }
    );
  }
  function getAllPoolId(params, successCallback, errorCallback) {
    QuestionsResource.getAllPoolId(params).then(
      function (res) {
        //console.log("pool id",res);
        successCallback(res);
      },
      function (error) {
        errorCallback(error);
      }
    );
  }

  return {
    getIntrest,
    getAllPoolId,
  };
};

export default CalculateManager(CalculateResource);
