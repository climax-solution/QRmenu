/**
 * Project Status chart
 */
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';



export default class ProjectStatusChart extends Component {
   componentDidMount() {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 0;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
         visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
         data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = [
         {
            "name": "Project 1",
            "points": 35654,
            "color": chart.colors.next(),
            "bullet": require('Assets/img/logo-a.png')
         },
         {
            "name": "Project 2",
            "points": 65456,
            "color": chart.colors.next(),
            "bullet": require('Assets/img/logo-b.png')
         },
         {
            "name": "Project 3",
            "points": 45724,
            "color": chart.colors.next(),
            "bullet": require('Assets/img/logo-c.png')
         },
         {
            "name": "Project 4",
            "points": 13654,
            "color": chart.colors.next(),
            "bullet": require('Assets/img/logo-d.png')
         }
      ];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.inside = true;
      categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
      categoryAxis.renderer.labels.template.fontSize = 20;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeDasharray = "4,4";
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;

      // Do not crop bullets
      chart.maskBullets = false;

      // Remove padding
      chart.paddingBottom = 0;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "points";
      series.dataFields.categoryX = "name";
      series.columns.template.propertyFields.fill = "color";
      series.columns.template.propertyFields.stroke = "color";
      series.columns.template.column.cornerRadiusTopLeft = 15;
      series.columns.template.column.cornerRadiusTopRight = 15;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

      // Add bullets
      let bullet = series.bullets.push(new am4charts.Bullet());
      let image = bullet.createChild(am4core.Image);
      image.horizontalCenter = "middle";
      image.verticalCenter = "bottom";
      image.dy = 20;
      image.y = am4core.percent(100);
      image.propertyFields.href = "bullet";
      image.tooltipText = series.columns.template.tooltipText;
      image.propertyFields.fill = "color";
      image.filters.push(new am4core.DropShadowFilter());
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <RctCardContent>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
         </RctCardContent>
      );
   }
}