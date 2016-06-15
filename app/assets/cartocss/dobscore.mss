/** dobscore choropleth **/
#samp_plus_sold_regulated_a1_dm_merge_mapputo{
  polygon-fill: #FFFFB2;
  polygon-opacity: 0.7;
  line-color: #FFF;
  line-width: 0;
  line-opacity: 1;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dobscore <= 100] {
   polygon-fill: #BD0026;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dobscore <= 80] {
   polygon-fill: #F03B20;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dobscore <= 60] {
   polygon-fill: #FD8D3C;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dobscore <= 40] {
   polygon-fill: #FECC5C;
}
#samp_plus_sold_regulated_a1_dm_merge_mapputo [ dobscore <= 20] {
   polygon-fill: #FFFFB2;
}