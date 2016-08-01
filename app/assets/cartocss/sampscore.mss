/** sampscore choropleth **/
#samp_plus_sold_regulated_a1_dm_merge_mapputo{
  polygon-fill: #aaaaaa;
  polygon-opacity: 0.4;
  line-color: #FFF;
  line-width: 0;
  line-opacity: 0;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 300] {
  polygon-fill: #800026;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 266.6] {
  polygon-fill: #bd0026;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 233.3] {
  polygon-fill: #e31a1c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 200] {
  polygon-fill: #fc4e2a;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 166.6] {
  polygon-fill: #fd8d3c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 133.3] {
  polygon-fill: #feb24c;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 100] {
  polygon-fill: #fed976;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 66.6] {
  polygon-fill: #ffeda0;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 33.3] {
  polygon-fill: #ffffcc;
  polygon-opacity: 0.8;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore < 1] {
  polygon-fill: #aaaaaa;
  polygon-opacity: 0.4;
}