/** dofscore choropleth **/
#samp_plus_sold_regulated_a1_dm_merge_mapputo{
  polygon-fill: #aaaaaa;
  polygon-opacity: 0.4;
  line-color: #FFF;
  line-width: 0;
  line-opacity: 1;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 100] {
  polygon-fill: #800026;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 88.9] {
  polygon-fill: #bd0026;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 77.8] {
  polygon-fill: #e31a1c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 66.7] {
  polygon-fill: #fc4e2a;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 55.5] {
  polygon-fill: #fd8d3c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 44.4] {
  polygon-fill: #feb24c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 33.3] {
  polygon-fill: #fed976;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 22.2] {
  polygon-fill: #ffeda0;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore <= 11.1] {
  polygon-fill: #ffffcc;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dofscore < 1] {
  polygon-fill: #aaaaaa;
  polygon-opacity: 0.4;

}