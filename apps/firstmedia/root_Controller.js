"use strict";

angular.module("MyApp").controller("root_Controller", [
    "$state", "UserData", "Schedule",
    "ErrorHandler", "BusyIndicatorHandler",
    function (
        $state, UserData, Schedule,
        ErrorHandler, BusyIndicatorHandler
    ) {

        var vm = this;

        vm.UserData = UserData;
        vm.ShowDate = moment({ hour: 0 }).toDate();

        vm.ChangeFavorite = ChangeFavorite;
        vm.Refresh = Refresh;
        vm.SwitchView = SwitchView;
        vm.Reset = Reset;

        Initialize();

        function Initialize() {
        };

        function ChangeFavorite() {
            UserData.SaveToStorage();
        };

        function Refresh() {
            var ShowDate = !!vm.ShowDate ? moment(vm.ShowDate).format("YYYY-MM-DD") : null;
            var Channels = UserData.Favorites[UserData.SelectedFavorite].Channels;
            var FakeData = false;

            BusyIndicatorHandler.show();

            return Schedule.Refresh(ShowDate, Channels, FakeData).then(function (response) {
                switchToView(UserData.SelectedView);
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function SwitchView(viewName) {
            switch (viewName) {
                case "ListByTime":
                case "ListByChannel":
                    UserData.SelectedView = viewName;
                    UserData.SaveToStorage();
                    switchToView(viewName);
                    break;
                default:
                    break;
            };
        };

        function switchToView(viewName) {
            switch (viewName) {
                case "ListByTime":
                    $state.go("root.listByTime", null, { reload: true });
                    break;
                case "ListByChannel":
                    $state.go("root.listByChannel", null, { reload: true });
                    break;
                default:
                    break;
            };
        };

        function Reset() {
            UserData.Reset();
            UserData.SaveToStorage();
        };

    }
]);
