"use strict";

angular.module("MyApp").factory("API", [
    "$http",
    function ($http) {
        var endpoints = {};

        endpoints.Schedules = Schedules;
        endpoints.Channels = Channels;
        endpoints.ClearCache = ClearCache;

        var rootUrl = "https://uspcahharhjy5eb4.apphb.com";
        // var rootUrl = "http://localhost:55429";

        return endpoints;

        function Schedules(params) {
            var cmd = $http({
                method: "POST",
                url: rootUrl + "/firstmedia/schedule",
                data: params
            });
            return cmd;
        };

        function Channels(params) {
            var cmd = $http({
                method: "GET",
                url: rootUrl + "/firstmedia/channel",
                params: params
            });
            return cmd;
        };

        function ClearCache(params) {
            var cmd = $http({
                method: "DELETE",
                url: rootUrl + "/firstmedia/schedule/cache",
                params: params
            });
            return cmd;
        };

    }
]);
