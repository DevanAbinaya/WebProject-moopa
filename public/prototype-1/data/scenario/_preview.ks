[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[bg  storage="900p.png"  time="10"  ]
[tb_show_message_window] 
[chara_mod  name="Ihsan"  time="10"  cross="true"  storage="chara/1/happy.png"  ]
[chara_mod  name="Devan"  time="10"  cross="true"  storage="chara/2/datar_idle.png"  ]
[chara_show  name="Ihsan"  time="10"  wait="true"  left="1017"  top="154"  width="396"  height="746"  reflect="false"  storage="chara/1/happy.png"  ]
[chara_show  name="Devan"  time="10"  wait="true"  storage="chara/2/angry.png"  width="366"  height="746"  left="199"  top="154"  ]
[mask_off time=10]
[chara_hide_all  time="1000"  wait="true"  ]
[cm  ]
[tb_show_message_window  ]
[bg  time="1000"  method="crossfade"  storage="garden.png"  ]
[tb_start_text mode=1 ]
#
Saat mereka sedang berjalan menuju kantin,[p]
Mereka bertemu dengan Nathan, dan mengajaknya untuk ikut ke kantin bersama.[p]
# Kyle
Eh, ada Nathan tuh.[p]
Ajak ke kantin sekalian gak? [p]
# Charles
Gas[p]
# Kyle
Oi Nath, mau ikut ke kantin gak?[p]
# Nathan
Eh, eh ikut dong, gw juga mau beli cireng.[p]
#
[_tb_end_text]

[tb_hide_message_window  ]
[clickable  storage="scene1.ks"  x="100"  y="100"  width="100"  height="100"  target=""  ]
[cm  ]
[s  ]
