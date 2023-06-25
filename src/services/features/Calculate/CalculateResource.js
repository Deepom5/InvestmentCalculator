import $http from "../../global/http";

// Source ==> https://dev-testnet.nordl.io/api/product/calculator-for-pool

const CalculateResource = function ($http) {
  function getIntrest(params) {
    var url = `https://dev-testnet.nordl.io/api/product/calculator-for-pool`;

    console.log("getIntrest URL==>", url);
    console.log("getIntrest params==>", params);
    return $http.post(url, params, params?.headers);
  }

  function getAllPoolId(params) {
    var url = `https://dev-testnet.nordl.io/api/product/all-pools`;

    console.log("getAllPoolId URL==>", url);
    console.log("getAllPoolId params==>", params);
    return $http.get(url, params, params?.headers);
  }

  return {
    getIntrest,
    getAllPoolId,
  };
};

export default CalculateResource($http);
