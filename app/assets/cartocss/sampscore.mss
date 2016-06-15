/** sampscore choropleth **/
#samp_plus_sold_regulated_a1_dm_merge_mapputo{
  polygon-fill: #FFFFB2;
  polygon-opacity: 0.7;
  line-color: #FFF;
  line-width: 0;
  line-opacity: 1;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 300] {
   polygon-fill: #BD0026;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 240] {
   polygon-fill: #F03B20;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 180] {
   polygon-fill: #FD8D3C;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 120] {
   polygon-fill: #FECC5C;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ sampscore <= 60] {
   polygon-fill: #FFFFB2;
}