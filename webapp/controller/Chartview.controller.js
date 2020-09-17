sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/BindingMode',
        'sap/ui/model/json/JSONModel',
        'sap/viz/ui5/data/FlattenedDataset',
        'sap/viz/ui5/controls/common/feeds/FeedItem'
], function (Controller, BindingMode, JSONModel, FlattenedDataset, FeedItem) {
	"use strict";

	return Controller.extend("chartapp.ChartApplication.controller.Chartview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf chartapp.ChartApplication.view.Chartview
		 */
		onInit: function () {
			
			/*	var oModel1 = new sap.ui.model.odata.v2.ODataModel("http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-29&sortBy=publishedAt&apiKey=c588577319a74129981c0270d96e599e");
			this.getView().setModel(oModel1);*/
			
			
		/*	var oModel1 = jQuery.sap.includeScript("http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-29&sortBy=publishedAt&apiKey=c588577319a74129981c0270d96e599e");
				this.getView().setModel(oModel1);*/
		/*	var	that = this;
				jQuery.ajax({
					method:"GET",
					url:"https://api.covid19api.com/summary",
					success: function(data){
						debugger;
						var oModel1 = new sap.ui.model.json.JSONModel(data);
						that.getView().setModel(oModel1);	
						console.log(data);
					},
					error: function(error){
						console.log("Message"+status);
					}
				});*/
				
			var oModel= this.getOwnerComponent().getModel("jsonData");
			this.getView().setModel(oModel);
			
		//	var oModel1 = "";
		
		/*	var a = "Working";
			a = "Not working";
			console.log(a);*/
			this.properties();

		},
		
		properties: function(oEvt){
			
			var oVizframe = this.oVizframe = this.getView().byId("idVizframe");
			oVizframe.setVizProperties({
				title: {
					visible: true,
					text: 'Corona Recoverd cases by country'
				},
				plotArea: {
					dataLabel: {
					/*	visible: oEvt.getParameter('state')*/
					}
				}
			});
		},
		
		onChartChanged: function(oEvent){
			
			if (this.oVizFrame){
                var selectedKey = this.chart = parseInt(oEvent.getSource().getSelectedKey());
                var bindValue = this.settingsModel.chartType.values[selectedKey];
                this.oVizFrame.destroyDataset();
                this.oVizFrame.destroyFeeds();
                this.oVizFrame.setVizType(bindValue.vizType);
                var dataModel = new JSONModel(this.dataPath + bindValue.json);
                this.oVizFrame.setModel(dataModel);
                var oDataset = new FlattenedDataset(bindValue.dataset);
                this.oVizFrame.setDataset(oDataset);
                var props = bindValue.vizProperties;
                if (selectedKey !== 8 && props.plotArea) {
                    props.plotArea.dataPointStyle = null;
                }
                this.oVizFrame.setVizProperties(props);
                var feedValueAxis, feedValueAxis2, feedActualValues, feedTargetValues;
                if (selectedKey === 7) {
                    feedValueAxis = new FeedItem({
                        'uid': "valueAxis",
                        'type': "Measure",
                        'values': [bindValue.value[0]]
                    });
                    feedValueAxis2 = new FeedItem({
                        'uid': "valueAxis2",
                        'type': "Measure",
                        'values': [bindValue.value[1]]
                    });
                } else if (selectedKey === 8 || selectedKey === 9) {
                    feedActualValues = new FeedItem({
                        'uid': "actualValues",
                        'type': "Measure",
                        'values': [bindValue.value[0]]
                    });
                    feedTargetValues = new FeedItem({
                        'uid': "targetValues",
                        'type': "Measure",
                        'values': [bindValue.value[1]]
                    });
                } else {
                    feedValueAxis = new FeedItem({
                        'uid': "valueAxis",
                        'type': "Measure",
                        'values': bindValue.value
                    });
                }

                var feedTimeAxis = new FeedItem({
                    'uid': "timeAxis",
                    'type': "Dimension",
                    'values': ["Date"]
                }),
                feedBubbleWidth = new FeedItem({
                    "uid": "bubbleWidth",
                    "type": "Measure",
                    "values": ["Revenue"]
                }),
                feedTimeBulletColor = new FeedItem({
                    "uid":"color",
                    "type":"Dimension",
                    "values":["Country"]
                });
                switch (selectedKey){
                    case 0:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedTimeAxis);
                        this.oVizFrame.addFeed(feedBubbleWidth);
                        break;
                    case 7:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedValueAxis2);
                        this.oVizFrame.addFeed(feedTimeAxis);
                        break;
                    case 9:
                        this.oVizFrame.addFeed(feedTimeBulletColor);
                        // fall through
                    case 8:
                        this.oVizFrame.addFeed(feedActualValues);
                        this.oVizFrame.addFeed(feedTargetValues);
                        this.oVizFrame.addFeed(feedTimeAxis);
                        this.oVizFrame.addFeed(feedValueAxis);
                        break;
                    default:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedTimeAxis);
                        break;
                }
            }
        
    

    /*return Controller;*/
			
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf chartapp.ChartApplication.view.Chartview
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf chartapp.ChartApplication.view.Chartview
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf chartapp.ChartApplication.view.Chartview
		 */
		//	onExit: function() {
		//
		//	}

	});

});