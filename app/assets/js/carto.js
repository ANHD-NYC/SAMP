var app = app || {} 

app.cartocss = (function(){ 
  return {"cb":"/**communityboards*/#nycd{polygon-fill:#2dc103;polygon-opacity:0;line-color:#a53ed5;line-width:2;line-opacity:1;}#nycd::labels{text-name:[borocd];text-face-name:'Raleway';text-size:14;text-label-position-tolerance:0;text-fill:#a53ed5;text-halo-fill:#333333;text-halo-radius:1;text-dy:0;text-allow-overlap:true;text-placement:interior;text-placement-type:simple;}","cd":"/*citycouncildistricts*/#nycc{polygon-fill:#FF6600;polygon-opacity:0;line-color:#5CA2D1;line-width:2;line-opacity:1;}#nycc::labels{text-name:[coundist];text-face-name:'Raleway';text-size:14;text-label-position-tolerance:0;text-fill:#5CA2D1;text-halo-fill:#333333;text-halo-radius:1;text-allow-overlap:true;text-placement:interior;text-placement-type:simple;}","dobscore":"/**dobscorechoropleth**/#samp_plus_sold_regulated_a1_dm_merge_mapputo{polygon-fill:#aaaaaa;polygon-opacity:0.4;line-color:#FFF;line-width:0;line-opacity:1;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=100]{polygon-fill:#800026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=88.9]{polygon-fill:#bd0026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=77.8]{polygon-fill:#e31a1c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=66.7]{polygon-fill:#fc4e2a;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=55.5]{polygon-fill:#fd8d3c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=44.4]{polygon-fill:#feb24c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=33.3]{polygon-fill:#fed976;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=22.2]{polygon-fill:#ffeda0;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<=11.1]{polygon-fill:#ffffcc;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dobscore<1]{polygon-fill:#aaaaaa;}","dofscore":"/**dofscorechoropleth**/#samp_plus_sold_regulated_a1_dm_merge_mapputo{polygon-fill:#aaaaaa;polygon-opacity:0.4;line-color:#FFF;line-width:0;line-opacity:1;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=100]{polygon-fill:#800026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=88.9]{polygon-fill:#bd0026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=77.8]{polygon-fill:#e31a1c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=66.7]{polygon-fill:#fc4e2a;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=55.5]{polygon-fill:#fd8d3c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=44.4]{polygon-fill:#feb24c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=33.3]{polygon-fill:#fed976;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=22.2]{polygon-fill:#ffeda0;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<=11.1]{polygon-fill:#ffffcc;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[dofscore<1]{polygon-fill:#aaaaaa;}","rentregscore":"/**rentregscorechoropleth**/#samp_plus_sold_regulated_a1_dm_merge_mapputo{polygon-fill:#aaaaaa;polygon-opacity:0.4;line-color:#FFF;line-width:0;line-opacity:1;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=100]{polygon-fill:#800026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=88.9]{polygon-fill:#bd0026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=77.8]{polygon-fill:#e31a1c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=66.7]{polygon-fill:#fc4e2a;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=55.5]{polygon-fill:#fd8d3c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=44.4]{polygon-fill:#feb24c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=33.3]{polygon-fill:#fed976;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=22.2]{polygon-fill:#ffeda0;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<=11.1]{polygon-fill:#ffffcc;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[rentregscore<1]{polygon-fill:#aaaaaa;polygon-opacity:0.8;}","sampscore":"/**sampscorechoropleth**/#samp_plus_sold_regulated_a1_dm_merge_mapputo{polygon-fill:#aaaaaa;polygon-opacity:0.4;line-color:#FFF;line-width:0;line-opacity:0;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=300]{polygon-fill:#800026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=266.6]{polygon-fill:#bd0026;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=233.3]{polygon-fill:#e31a1c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=200]{polygon-fill:#fc4e2a;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=166.6]{polygon-fill:#fd8d3c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=133.3]{polygon-fill:#feb24c;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=100]{polygon-fill:#fed976;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=66.6]{polygon-fill:#ffeda0;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<=33.3]{polygon-fill:#ffffcc;polygon-opacity:0.8;}#samp_plus_sold_regulated_a1_dm_merge_mapputo[sampscore<1]{polygon-fill:#aaaaaa;polygon-opacity:0.8;}"};
})();