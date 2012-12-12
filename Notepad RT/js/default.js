﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509



(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {
            
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                // TODO: This application has been newly launched. Initialize
                // your application here.
                //WinJS.UI.processAll();
                //WinJS.Application.start();


            }
            
            //WinJS.Application.addEventListener('onsettingschanged', );
            //args.setPromise(WinJS.UI.processAll());
            args.setPromise(WinJS.UI.processAll().then(function () {

                /*if (nav.location) {

                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);

                } else {

                    return nav.navigate(Application.navigator.home);

                }*/
                var url = null;

                //if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
                // Navigate to either the first scenario or to the last running scenario
                // before suspension or termination.
                if (WinJS.Application.sessionState.lastUrl) {

                    url = WinJS.Application.sessionState.lastUrl;
                    delete WinJS.Application.sessionState['lastUrl'];

                } else {

                    url = Application.navigator.home;

                }

                return WinJS.Navigation.navigate(url);
                
            }));

            

        }/*else if (args.detail.kind === activation.ActivationKind.shareTarget) {
            
            var arg = {};
            var shareOperation = args.detail.shareOperation;
            
            arg.shareData = args.detail.shareOperation.data;

            args.setPromise(WinJS.UI.processAll().then(function () {

                return nav.navigate(Application.navigator.editor, arg);

            }));
            //if (shareOperation.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.storageItems)) {
            //    shareOperation.data.getStorageItemsAsync().done(function (storageItems) {

            //        if (storageItems.size > 0) {
            //            args.files = storageItems;
            //        }
                    
            //    });
            //} else {
              
            //}
        }*/else if (args.detail.kind === activation.ActivationKind.file) {
            
            var arg = {};
            arg.files = args.detail.files;

            args.setPromise(WinJS.UI.processAll().then(function () {

                return nav.navigate(Application.navigator.editor, arg);

            }));

        }

    };

    function onThemeChanged() {

        // TODO:
        // Code to switch from light-ui.css to dark-ui.css


    }

    app.onsettings = function (e) {
        e.detail.applicationcommands = {
            "defaultsDiv": { href: "/html/DefaultsUI.html", title: "Editor" },
            "feedbackDiv": { href: "/html/FeedbackUI.html", title: "Feedback" },
            "copyrightDiv": { href: "/html/LegalUI.html", title: "Copyright" }
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    
    /*app.onnavigated = function (eventObject) {

        var url = eventObject.detail.location,
            host = document.getElementById("contenthost");
        
        console.log("navigated");

        host.winControl && host.winControl.unload && host.winControl.unload();
        WinJS.Utilities.empty(host);

        eventObject.detail.setPromise(WinJS.UI.Pages.render(url, host, eventObject.detail.state).then(function () {

            WinJS.Application.sessionState.lastUrl = url;

        }));

    };*/

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
        

        WinJS.Application.sessionState.navigationHistory = nav.history.backStack;

        //var host = document.getElementById("contenthost");
        //host.winControl && host.winControl.checkpoint && host.winControl.checkpoint();

    };

    app.start();
})();