/** SAMP jobcount choropleth */
#samp_select_mapluto_jc{
  polygon-fill: #FFFFB2;
  polygon-opacity: 0.8;
  line-color: #FFF;
  line-width: 0;
  line-opacity: 0;
}
#samp_select_mapluto_jc [ jobcount <= 113] {
   polygon-fill: #BD0026;
}
#samp_select_mapluto_jc [ jobcount <= 46] {
   polygon-fill: #F03B20;
}
#samp_select_mapluto_jc [ jobcount <= 34] {
   polygon-fill: #FD8D3C;
}
#samp_select_mapluto_jc [ jobcount <= 22] {
   polygon-fill: #FECC5C;
}
#samp_select_mapluto_jc [ jobcount <= 11] {
   polygon-fill: #FFFFB2;
}